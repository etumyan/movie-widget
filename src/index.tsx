import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { worker } from './mocks/browser';

import _MoviesWidget, { MoviesWidgetOptions } from './MoviesWidget';
import _PeopleWidget, { PeopleWidgetOptions } from './PeopleWidget';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

export const MoviesWidget = (element: HTMLElement, options: MoviesWidgetOptions) => {
  ReactDOM.render(<_MoviesWidget {...options} />, element);
};

export const PeopleWidget = (element: HTMLElement, options: PeopleWidgetOptions) => {
  ReactDOM.render(<_PeopleWidget {...options} />, element);
};
