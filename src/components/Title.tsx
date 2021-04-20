import styled, { CSSObject } from 'styled-components';

interface Props {
  styles?: CSSObject;
}

export const Title = styled.div<Props>`
  margin-bottom: 24px;
  font-weight: 300;
  font-size: 24px;

  ${props => props.styles}
`;
