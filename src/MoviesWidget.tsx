import * as React from 'react';
import { useMemo, useState, useEffect } from 'react';

import ShadowRoot from './ShadowRoot';
import { Container, Title, Filter, InfiniteList } from './components';
import { Movie, Person } from './models';
import { BaseWidgetOptions } from './BaseWidgetOptions';
import { MoviesService, PeopleService } from './services';

export interface MoviesWidgetOptions extends BaseWidgetOptions {
  personId?: number;
};

export default (props: MoviesWidgetOptions) => {
  const moviesService = useMemo(() => new MoviesService(props.apiKey), [props.apiKey]);
  const peopleService = useMemo(() => new PeopleService(props.apiKey), [props.apiKey]);

  const [person, setPerson] = useState<Person>();

  useEffect(() => {
    if (props.personId !== undefined) {
      peopleService.getOne(props.personId).then(setPerson);
    }
  }, [props.personId, peopleService]);

  const [filterQuery, setFilterQuery] = useState('');

  const filterChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterQuery(e.currentTarget.value);
  };

  const loadMore = (startIndex: number, stopIndex: number) => (
    moviesService.getAll(startIndex, stopIndex, filterQuery)
  );

  return (
    <ShadowRoot>
      <Container styles={props.styles?.container}>
        <Title styles={props.styles?.title}>
          {person ? `${person.name}\`s Filmography` : 'Movies'}
        </Title>
        <Filter
          placeholder="Search for a movie&hellip;"
          styles={props.styles?.filter}
          onChange={filterChangeHandler}
        />
        <InfiniteList<Movie>
          itemRenderer={itemData => itemData.title}
          loadMore={loadMore}
          styles={props.styles?.list}
          itemStyles={props.styles?.listItem}
        />
      </Container>
    </ShadowRoot>
  );
};
