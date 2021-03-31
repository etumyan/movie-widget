import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Widget from './Widget';

export * as Widget from './Widget';

export default (element: HTMLElement) => {
  ReactDOM.render(<Widget />, element);
};
