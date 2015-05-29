import React from 'react';

class Boat extends React.Component {
  render() {
    return (
      <div className={'boat ' + this.props.boatDirection} style={{left: this.props.boatPosition}}>
        <div className="boat-body">
          <div className="boat-body-front"></div>
          <div className="boat-body-middle"></div>
        </div>
        <div className="boat-windshield"></div>
        <div className="boat-chair"></div>
        <div className="boat-fisherman">
          <div className="boat-fisherman-hat"></div>
          <div className="boat-fisherman-head"></div>
          <div className="boat-fisherman-body"></div>
        </div>
        <div className="boat-fishing-rod">
          <div className="boat-fishing-rod-pole"></div>
          <div className="boat-fishing-rod-line" style={{height: this.props.linePosition}}></div>
          <div className="boat-fishing-rod-hook" style={{top: this.props.hookPosition}}></div>
        </div>
        <div className="boat-engine">
          <div className="boat-engine-box"></div>
          <div className="boat-propeller">
            <div className="boat-propeller-shaft"></div>
            <div className="boat-propeller-blade-1"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Boat;
