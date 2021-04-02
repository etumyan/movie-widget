import * as React from 'react';

import ShadowRoot from '../ShadowRoot';
import { Container, Title, Filter, InfiniteList } from '../components';
import { Movie, Person } from '../models';
import { WidgetOptions } from '../WidgetOptions';
import MoviesService from './MoviesService';

export default (props: WidgetOptions) => {
  const service = new MoviesService(props.apiKey);

  const person: Person = { id: 'john-smith', name: 'John Smith' };

  return (
    <ShadowRoot>
      <Container>
        <Title>{person ? `${person.name}\`s Filmography` : 'Movies'}</Title>
        <Filter type="text" placeholder="Search for a movie&hellip;" disabled />
        <InfiniteList<Movie>
          itemRenderer={itemData => itemData.title}
          loadMore={(startIndex, stopIndex) => service.getPopularByIndexRange(startIndex, stopIndex)}
        />
      </Container>
    </ShadowRoot>
  );
};
