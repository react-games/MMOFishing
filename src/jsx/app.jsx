import React from 'react';
import Sky from './components/sky.jsx';
import Water from './components/water.jsx';
import Ground from './components/ground.jsx';
import Boat from './components/boat.jsx';

var App = React.createClass({
  getInitialState: function() {
    return {
      boat: {
        left: 400
      },
      boatDirection: '',
      line: {
        height: 149
      },
      hook: {
        top: 94
      }
    };
  },

  moveBoat: function(whichWay, howFar) {
    if (howFar === 0) { return; }

    if (whichWay === "LEFT" && this.state.boat.left > 0) {
      this.setState({boat: {left: this.state.boat.left - howFar}});
    } else if (whichWay === "RIGHT") {
      this.setState({boat: {left: this.state.boat.left + howFar}});
    }

    howFar = howFar > 0 ? howFar -= 1 : howFar += 1;

    setTimeout(function() { this.moveBoat(whichWay, howFar); }.bind(this), 60);
  },

  moveLine: function(whichWay, howFar) {
    if (howFar === 0) { return; }

    if (whichWay === "UP" && this.state.line.height > 9) {
      this.setState({line: {height: this.state.line.height - howFar}});
      this.setState({hook: {top: this.state.hook.top - howFar}});
    } else if (whichWay === "DOWN") {
      this.setState({line: {height: this.state.line.height + howFar}});
      this.setState({hook: {top: this.state.hook.top + howFar}});
    }

    howFar = howFar > 0 ? howFar -= 1 : howFar += 1;

    setTimeout(function() { this.moveLine(whichWay, howFar); }.bind(this), 60);
  },

  handleKeyDown: function(e) {
      if (e.keyCode === 37 && this.state.boat.left > 0) {
        this.moveBoat('LEFT', 10);
        this.setState({boatDirection: ''});
      }
      else if (e.keyCode === 39) {
        this.moveBoat('RIGHT', 10);
        this.setState({boatDirection: 'flip'});
      }
      else if (e.keyCode === 40 ) {
        this.moveLine("DOWN", 9);
      }
      else if (e.keyCode === 38 && this.state.line.height > 9) {
        this.moveLine("UP", 9);
      }
  },

  componentDidMount: function() {
    document.addEventListener("keydown", this.handleKeyDown);
  },

  render: function() {
    return (
      <div id="game-container" className="container-fluid">
        <Sky />
        <Boat
          boatPosition={this.state.boat.left}
          linePosition={this.state.line.height}
          hookPosition={this.state.hook.top}
          boatDirection={this.state.boatDirection}
        />
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
