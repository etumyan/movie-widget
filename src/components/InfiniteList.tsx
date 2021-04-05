import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { InfiniteLoader, List, Index, IndexRange, ListRowProps } from 'react-virtualized';

const Container = styled.div`
  height: 100%;

  .ReactVirtualized__List:focus {
    outline: none;
  }
`;

const Item = styled.div`
  padding-right: 16px;
  padding-left: 16px;
  overflow: hidden;
  line-height: 52px;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: default;

  &:hover {
    background-color: #f9f9f9;
  }
`;

interface Props<T> {
  itemRenderer: (itemData: T) => string;
  loadMore: (startIndex: number, stopIndex: number) => Promise<T[]>;
}

export const InfiniteList = <T,>(props: Props<T>) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<T[]>([]);

  // #TODO get a real value
  const remoteItemCount = 10000;

  const isItemLoaded = ({ index }: Index) => {
    return !!items[index];
  }

  const loadMoreItems = async ({ stopIndex }: IndexRange) => {
    if (isLoading || items.length >= stopIndex) return Promise.resolve();

    setIsLoading(true);

    const newItems = await props.loadMore(items.length, stopIndex);

    setItems([...items, ...newItems]);

    setIsLoading(false);

    return Promise.resolve();
  }

  const itemRenderer = ({ key, index, style}: ListRowProps) => {
    return (
      <Item key={key} style={style}>
        {items[index] && props.itemRenderer(items[index])}
      </Item>
    );
  }

  const updateDemensions = (el: HTMLElement | null) => {
    if (!el) return;

    const rect = el.getBoundingClientRect();
    setWidth(rect.width || 0);
    setHeight(rect.height || 0);
  }

  return (
    <Container ref={updateDemensions}>
      <InfiniteLoader
        rowCount={remoteItemCount}
        isRowLoaded={isItemLoaded}
        loadMoreRows={loadMoreItems}
      >
        {({onRowsRendered, registerChild}) => (
          <List
            ref={registerChild}
            width={width}
            height={height}
            rowCount={remoteItemCount}
            rowHeight={52}
            rowRenderer={itemRenderer}
            onRowsRendered={onRowsRendered}
          />
        )}
      </InfiniteLoader>
    </Container>
  );
};
