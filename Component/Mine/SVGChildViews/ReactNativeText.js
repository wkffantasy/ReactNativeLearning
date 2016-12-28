

import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
} from 'react-native';

export default class ReactNativeText extends Component {
  static propTypes = {
    text:PropTypes.string,
    style:View.propTypes.style,
  };
  render() {
    return (
      <Text style={[{ fontSize:18,color:'#999999' },this.props.style]}>{`${this.props.text}`}</Text>
    );
  }
}
