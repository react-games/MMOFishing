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

  moveBoat: undefined,

  boatMovements: function() {
    var howFar = 0;
    var howFast = 60; // This is milliseconds for setInterval. The lower the faster.
    var interval;

    const moveBoat = () => {
      if (howFar < 0 && this.state.boat.left <= 0) {
        howFar = 0;
        return;
      }

      if (howFar > 0) {
        this.setState({boat: {left: this.state.boat.left + howFar > 0 ? this.state.boat.left + howFar : 0 }});
        howFar -= 1;
      } else if (howFar < 0) {
        this.setState({boat: {left: this.state.boat.left + howFar > 0 ? this.state.boat.left + howFar : 0 }});
        howFar += 1;
      }
    };

    moveBoat.addRightDistance = function() {
      howFar = howFar < 50 ? howFar + 10 : 50;
    };

    moveBoat.addLeftDistance = function() {
      howFar = howFar > -50 ? howFar - 10 : -50;
    };

    moveBoat.decideWhatToDo = function(e) {
      if (e.keyCode === 37) {
        moveBoat.addLeftDistance();
        this.setState({boatDirection: ''});
      }
      else if (e.keyCode === 39) {
        moveBoat.addRightDistance();
        this.setState({boatDirection: 'flipped'});
      }
      else if (e.keyCode === 40 ) {
        this.moveLine("DOWN", 9);
      }
      else if (e.keyCode === 38 && this.state.line.height > 9) {
        this.moveLine("UP", 9);
      }
    }.bind(this);

    interval = setInterval(function() { moveBoat.call(this); }.bind(this), howFast);

    return moveBoat;
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

  handleKeyDown: undefined,

  handleKeyUp: function() {
    return;
  },

  componentWillMount: function() {
    this.moveBoat = this.boatMovements();
    this.handleKeyDown = this.moveBoat.decideWhatToDo;
  },

  componentDidMount: function() {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
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
