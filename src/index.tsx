import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Widget from './Widget';

export * as Widget from './Widget';

export default (element: HTMLElement) => {
  const shadowRoot = element.attachShadow({ mode: 'open' });

  ReactDOM.render(<Widget />, shadowRoot);
};
