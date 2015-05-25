/*jshint esnext: true */

import React from 'react';
 
export default class Header extends React.Component {
  render() {
    return <div className='page-header'>Hello {this.props.name}</div>;
  }
};
