import React from 'react';
import Fish from './fish.jsx';

class Water extends React.Component {
  render() {
    return (
      <div id="water" className="row-fluid">
        <Fish />
      </div>
    )
  }
}

export default Water;
