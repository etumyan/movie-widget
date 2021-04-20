import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import styled, { CSSObject } from 'styled-components';
import { InfiniteLoader, List, Index, IndexRange, ListRowProps } from 'react-virtualized';
import composeRefs from '@seznam/compose-react-refs';

interface Props<T> {
  itemRenderer: (itemData: T) => string;
  loadMore: (startIndex: number, stopIndex: number) => Promise<T[]>;
  styles?: CSSObject;
  itemStyles?: CSSObject;
}

interface ContainerProps {
  styles?: Props<any>['styles'];
}

interface ItemProps {
  styles?: Props<any>['itemStyles'];
}

const Container = styled.div<ContainerProps>`
  height: 100%;

  .ReactVirtualized__List:focus {
    outline: none;
  }

  ${props => props.styles}
`;

const Item = styled.div<ItemProps>`
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

  ${props => props.styles}
`;

export const InfiniteList = <T,>(props: Props<T>) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<T[]>([]);
  const infinityLoaderRef = useRef<InfiniteLoader>(null);
  const listRef = useRef<List>(null);

  useEffect(() => {
    setItems([]);
    listRef.current?.scrollToPosition(0);
  }, [props]);

  useEffect(() => {
    items.length < 1 && infinityLoaderRef.current?.resetLoadMoreRowsCache(true);
  }, [items]);

  // #TODO get a real value
  const [remoteItemCount] = useState(10000);

  const isItemLoaded = ({ index }: Index) => {
    return !!items[index];
  };

  const loadMoreItems = async ({ stopIndex }: IndexRange) => {
    if (isLoading || items.length >= stopIndex) return Promise.resolve();

    setIsLoading(true);

    const newItems = await props.loadMore(items.length, stopIndex);

    setItems([...items, ...newItems]);

    setIsLoading(false);

    return Promise.resolve();
  };

  const itemRenderer = ({ key, index, style }: ListRowProps, styles?: CSSObject) => (
    <Item key={key} style={style} styles={styles}>
      {items[index] && props.itemRenderer(items[index])}
    </Item>
  );

  const updateDemensions = (el: HTMLElement | null) => {
    if (!el) return;

    const rect = el.getBoundingClientRect();
    setWidth(rect.width || 0);
    setHeight(rect.height || 0);
  };

  return (
    <Container ref={updateDemensions}>
      <InfiniteLoader
        ref={infinityLoaderRef}
        rowCount={remoteItemCount}
        isRowLoaded={isItemLoaded}
        loadMoreRows={loadMoreItems}
      >
        {({onRowsRendered, registerChild}) => (
          <List
            ref={composeRefs(registerChild, listRef)}
            width={width}
            height={height}
            rowCount={remoteItemCount}
            rowHeight={52}
            rowRenderer={listRowProps => itemRenderer(listRowProps, props.itemStyles)}
            onRowsRendered={onRowsRendered}
          />
        )}
      </InfiniteLoader>
    </Container>
  );
};
