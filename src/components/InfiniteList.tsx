import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { InfiniteLoader, List, Index, IndexRange, ListRowProps } from 'react-virtualized';

interface Props {
  itemRenderer: (itemData: any) => string;
  loadMore: (startIndex: number, stopIndex: number) => Promise<any[]>;
}

const Container = styled.div`
  height: 100%;
`;

const Item = styled.div`
  white-space: nowrap;
`;

export const InfiniteList = (props: Props) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  // #TODO get a real value
  const remoteItemCount = 10000;

  const isItemLoaded = ({ index }: Index) => {
    return !!items[index];
  }

  const loadMoreItems = async ({ stopIndex }: IndexRange) => {
    if (isLoading || items.length >= stopIndex) return Promise.resolve();

    setIsLoading(true);

    const response = await props.loadMore(items.length, stopIndex);

    setItems([...items, ...response]);

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
            rowHeight={20}
            rowRenderer={itemRenderer}
            onRowsRendered={onRowsRendered}
          />
        )}
      </InfiniteLoader>
    </Container>
  );
};
