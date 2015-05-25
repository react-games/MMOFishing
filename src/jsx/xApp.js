'use esnext';

import React from 'react';
import Header from './components/header';

class App extends React.Component {
  render() {
    return (
      <Header name="Danny"/>
    );
  }
}

React.render(
  <App />,
  document.body
);
