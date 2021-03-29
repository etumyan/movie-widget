import * as React from 'react';
import * as ReactDOM from 'react-dom';

export const Widget = () => {
  return <div>MovieWidget's content</div>;
};

export const MovieWidget = () => {
  return <Widget />;
};

export default (element: HTMLElement) => {
  ReactDOM.render(<Widget />, element);
};
