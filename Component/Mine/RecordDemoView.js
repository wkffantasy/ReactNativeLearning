/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  InteractionManager,
  Dimensions,
  Text,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

const { width:ScreenW, height:ScreenH } = Dimensions.get('window');

export default class RecordDemoView extends Component {

  componentWillMount() {
  }

  render() {
    return (
      <View style={{ flex: 1,backgroundColor:'blue' }}  />
    );
  }
}
