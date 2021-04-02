import * as React from 'react';
import * as ReactDOM from 'react-dom';

import _MoviesWidget from './MoviesWidget/MoviesWidget';
import _PeopleWidget from './PeopleWidget/PeopleWidget';

export const MoviesWidget = (element: HTMLElement) => {
  ReactDOM.render(<_MoviesWidget />, element);
};

export const PeopleWidget = (element: HTMLElement) => {
  ReactDOM.render(<_PeopleWidget />, element);
};
