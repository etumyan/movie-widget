import * as React from 'react';
import styled from 'styled-components';

const Container = styled.input`
  display: block;
  box-sizing: border-box;
  margin-bottom: 24px;
  padding: 16px;
  width: 100%;
  color: var(--main-text-color);
  font: 300 16px/1.4 var(--main-font-set);
  border: 1px solid #e6e6e6;
  border-radius: 4px;

  &:focus {
    border-color: var(--accent-color);
    box-shadow: inset 0 0 0 1px var(--accent-color);
    outline: 0 none;
  }
`;

export const Filter = (props: any) => {
  return <Container type="text" {...props} />;
};
