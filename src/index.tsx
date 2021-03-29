import { h, render } from 'preact';

import Widget from './Widget';

export * as Widget from './Widget';

export default (element: HTMLElement) => {
  const shadowRoot = element.attachShadow({ mode: 'open' });

  render(<Widget />, shadowRoot);
};
