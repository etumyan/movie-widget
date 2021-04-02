import styled from 'styled-components';

export const Container = styled.div`
  --main-text-color: #424242;
  --main-font-set: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica,
                   Arial, 'Lucida Grande', sans-serif;
  --accent-color: #00adff;

  display: grid;
  grid-template-rows: min-content min-content minmax(0, 1fr);
  box-sizing: border-box;
  padding: 24px;
  width: 480px;
  height: 420px;
  color: #424242;
  font: 300 16px/1.4 var(--main-font-set);
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, .1);
`;
