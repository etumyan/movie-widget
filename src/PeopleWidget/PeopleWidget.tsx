import * as React from 'react';

import ShadowRoot from '../ShadowRoot';
import { Container, Title, Filter, InfiniteList } from '../components';
import { Person, Movie } from '../models';
import { WidgetOptions } from '../WidgetOptions';
import PeopleService from './PeopleService';

export default (props: WidgetOptions) => {
  const service = new PeopleService(props.apiKey);

  const movie: Movie = { id: 'super-movie', title: 'Super Movie' };

  return (
    <ShadowRoot>
      <Container>
        <Title>{movie ? `${movie.title} Cast` : 'Actors'}</Title>
        <Filter type="text" placeholder="Search for a person&hellip;" disabled />
        <InfiniteList<Person>
          itemRenderer={itemData => itemData.name}
          loadMore={(startIndex, stopIndex) => service.getPopularByIndexRange(startIndex, stopIndex)}
        />
      </Container>
    </ShadowRoot>
  );
};
