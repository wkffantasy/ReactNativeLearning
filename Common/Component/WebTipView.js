/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component,PropTypes } from 'react';
import {
  WebView,
} from 'react-native';

export default class WebTipView extends Component {
  static propTypes = {
    webString:PropTypes.string.isRequired,
  };

  render() {
    return (
      <WebView
        style={{ flex: 1,marginTop:64 }}
        source={{ uri:this.props.webString }}
        onLoadStart={() => { console.log('onLoadStart'); }}
        onLoadEnd={() => { console.log('onLoadEnd'); }}
        onLoad={() => { console.log('onLoad'); }}
        onError={() => { console.log('onError'); }}
      />
    );
  }
}
