import { h, render } from 'preact';

export const Widget = () => {
  return <div>MovieWidget's content</div>;
};

export const MovieWidget = () => {
  return <Widget />;
};

export default (element: HTMLElement) => {
  render(<Widget />, element);
};
