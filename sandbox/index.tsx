import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MovieWidget } from '../dist';

const App = () => {
  return (
    <div>
      <MovieWidget />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
