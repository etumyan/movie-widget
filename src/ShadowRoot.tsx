import * as React from 'react';
import root from 'react-shadow/styled-components';

interface Props {
  children: React.ReactNode;
}

export default ({ children }: Props) => {
  return (
    // host element should be a plain HTML tag
    <root.div style={{ width: '100%', height: '100%' }}>
      {children}
    </root.div>
  );
};
