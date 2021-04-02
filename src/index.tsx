import * as React from 'react';
import * as ReactDOM from 'react-dom';

import _MoviesWidget from './MoviesWidget/MoviesWidget';
import _PeopleWidget from './PeopleWidget/PeopleWidget';
import { WidgetOptions } from './WidgetOptions';

export const MoviesWidget = (element: HTMLElement, options: WidgetOptions) => {
  ReactDOM.render(<_MoviesWidget {...options} />, element);
};

export const PeopleWidget = (element: HTMLElement, options: WidgetOptions) => {
  ReactDOM.render(<_PeopleWidget {...options} />, element);
};
