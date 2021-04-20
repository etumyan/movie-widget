import { CSSObject } from 'styled-components';

export interface BaseWidgetOptions {
  apiKey: string;
  styles?: {
    container?: CSSObject;
    title?: CSSObject;
    filter?: CSSObject;
    list?: CSSObject;
    listItem?: CSSObject;
  };
};
