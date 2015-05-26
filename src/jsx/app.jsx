import React from 'react';
import Sky from './components/sky.jsx'
import Water from './components/water.jsx'
import Ground from './components/ground.jsx'
import Boat from './components/boat.jsx'


class App extends React.Component {
  render() {
    return (
      <div id="game-container" className="container-fluid">
        <Sky />
        <Boat />
        <Water />
        <Ground />
      </div>
    );
  }
}

React.render(
  <App />,
  document.body
);
