/** @jsx jsx */
import React from 'react';
import ReactDOM from 'react-dom';
import { jsx, css } from '@emotion/core';

const style = css`
  color: hotpink;
`;

const App = () => (
  <div className="App" css={style}>
    <h1>Hi there!!!</h1>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
