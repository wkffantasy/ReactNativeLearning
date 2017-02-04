

import React, { Component, PropTypes } from 'react';
import {
  requireNativeComponent
 } from 'react-native';

const CoverView = requireNativeComponent('CoverView',null);

export default class Cover extends Component {

  render() {
    return (
      <CoverView {...this.props} />
    );
  }
}
