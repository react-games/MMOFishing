import React  from 'react';
import Sky    from './components/sky.jsx'
import Water  from './components/water.jsx'
import Ground from './components/ground.jsx'
import Boat   from './components/boat.jsx'

var App = React.createClass ({
  getInitialState: function() {
    return {
      boat: {
        left: 10
      }
    };
  },

  handleKeyDown: function(e) {
      if (e.keyCode === 37) {
        this.setState({boat: {left: this.state.boat.left - 10}});
      }
      else if (e.keyCode === 39) {
        this.setState({boat: {left: this.state.boat.left + 10}});
      }
  },

  componentDidMount: function() {
    document.addEventListener("keydown", this.handleKeyDown);
  },

  render: function() {
    return (
      <div id="game-container" className="container-fluid">
        <Sky />
        <Boat left={this.state.boat.left} />
        <Water />
        <Ground />
      </div>
    );
  }
});

React.render(
  <App />,
  document.body
);
