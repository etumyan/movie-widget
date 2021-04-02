import * as React from 'react';

import ShadowRoot from '../ShadowRoot';
import { Container, Title, Filter, InfiniteList } from '../components';
import { Movie } from '../models';

export default () => {
  const movie: Movie = { id: 'super-movie', title: 'Super Movie' };

  return (
    <ShadowRoot>
      <Container>
        <Title>{movie ? `${movie.title} Cast` : 'Actors'}</Title>
        <Filter type="text" placeholder="Search for a person&hellip;" disabled />
        <InfiniteList itemRenderer={() => ''} loadMore={() => Promise.resolve([])}/>
      </Container>
    </ShadowRoot>
  );
};
