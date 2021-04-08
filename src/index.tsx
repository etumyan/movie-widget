import * as React from 'react';
import * as ReactDOM from 'react-dom';

import _MoviesWidget, { MoviesWidgetOptions } from './MoviesWidget';
import _PeopleWidget, { PeopleWidgetOptions } from './PeopleWidget';

export const MoviesWidget = (element: HTMLElement, options: MoviesWidgetOptions) => {
  ReactDOM.render(<_MoviesWidget {...options} />, element);
};

export const PeopleWidget = (element: HTMLElement, options: PeopleWidgetOptions) => {
  ReactDOM.render(<_PeopleWidget {...options} />, element);
};
