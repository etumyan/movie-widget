import * as React from 'react';
import { useMemo, useState, useEffect } from 'react';

import ShadowRoot from './ShadowRoot';
import { Container, Title, Filter, InfiniteList } from './components';
import { Person, Movie } from './models';
import { BaseWidgetOptions } from './BaseWidgetOptions';
import { PeopleService, MoviesService } from './services';

export interface PeopleWidgetOptions extends BaseWidgetOptions {
  movieId?: number;
};

export default (props: PeopleWidgetOptions) => {
  const peopleService = useMemo(() => new PeopleService(props.apiKey), [props.apiKey]);
  const moviesService = useMemo(() => new MoviesService(props.apiKey), [props.apiKey]);

  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    if (props.movieId !== undefined) {
      moviesService.getOne(props.movieId).then(setMovie);
    }
  }, [props.movieId, moviesService]);

  const [filterQuery, setFilterQuery] = useState('');

  const filterChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterQuery(e.currentTarget.value);
  };

  const loadMore = (startIndex: number, stopIndex: number) => (
    peopleService.getAll(startIndex, stopIndex, filterQuery)
  );

  return (
    <ShadowRoot>
      <Container styles={props.styles?.container}>
        <Title styles={props.styles?.title}>
          {movie ? `${movie.title} Cast` : 'Actors'}
        </Title>
        <Filter
          placeholder="Search for a person&hellip;"
          styles={props.styles?.filter}
          onChange={filterChangeHandler}
        />
        <InfiniteList<Person>
          itemRenderer={itemData => itemData.name}
          loadMore={loadMore}
          styles={props.styles?.list}
          itemStyles={props.styles?.listItem}
        />
      </Container>
    </ShadowRoot>
  );
};
