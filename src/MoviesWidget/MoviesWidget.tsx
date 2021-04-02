import * as React from 'react';

import ShadowRoot from '../ShadowRoot';
import { Container, Title, Filter, InfiniteList } from '../components';
import { Person } from '../models';

export default () => {
  const person: Person = { id: 'john-smith', name: 'John Smith' };

  return (
    <ShadowRoot>
      <Container>
        <Title>{person ? `${person.name}\`s Filmography` : 'Movies'}</Title>
        <Filter type="text" placeholder="Search for a movie&hellip;" disabled />
        <InfiniteList itemRenderer={() => ''} loadMore={() => Promise.resolve([])}/>
      </Container>
    </ShadowRoot>
  );
};
