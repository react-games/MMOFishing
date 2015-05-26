import React  from 'react';
import Sky    from './components/sky.jsx'
import Water  from './components/water.jsx'
import Ground from './components/ground.jsx'
import Boat   from './components/boat.jsx'

var App = React.createClass ({
  getInitialState: function() {
    return {
      boat: {
        left: 400
      },
      line: {
        height: 149
      },
      hook: {
        top: 94
      }
    };
  },

  handleKeyDown: function(e) {
      if (e.keyCode === 37 && this.state.boat.left > 0) {
        this.setState({boat: {left: this.state.boat.left - 10}});
      }
      else if (e.keyCode === 39) {
        this.setState({boat: {left: this.state.boat.left + 10}});
      }
      else if (e.keyCode === 40 ) {
        this.setState({line: {height: this.state.line.height + 10}});
        this.setState({hook: {top: this.state.hook.top + 10}});
      }
      else if (e.keyCode === 38 && this.state.line.height > 9) {
        this.setState({line: {height: this.state.line.height - 10}});
        this.setState({hook: {top: this.state.hook.top - 10}});
      }
  },

  componentDidMount: function() {
    document.addEventListener("keydown", this.handleKeyDown);
  },

  render: function() {
    return (
      <div id="game-container" className="container-fluid">
        <Sky />
        <Boat gameState={this.state} />
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
