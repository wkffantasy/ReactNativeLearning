/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

export default class ActivityIndicatorView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _clickToWeb() {
    console.log('_clickToWeb');
    Actions.WebTipView({
      webString:'https://facebook.github.io/react-native/docs/image.html',
    });
  }
  render() {
    return (
      <ScrollView
        style={{ flex: 1,marginTop:64 }}
        contentContainerStyle={{ alignItems:'center' }}
      >
        <Text onPress={() => { this._clickToWeb(); }} style={{ fontSize:30,color:'#333333' }}>
          {'点击我进入RN Image的官网介绍'}
        </Text>
      </ScrollView>
    );
  }
}
