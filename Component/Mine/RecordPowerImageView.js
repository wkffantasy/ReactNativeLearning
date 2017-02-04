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
  TouchableWithoutFeedback,

} from 'react-native';


import CoverView from '../../Common/Component/CoverView';


const { width:ScreenW, height:ScreenH } = Dimensions.get('window');

export default class RecordPowerImageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillMount() {
    console.log('RecordPowerImageView componentWillMount');
  }

  render() {
    return (
      <CoverView style={{ flex: 1,marginTop:64,alignItems:'center',justifyContent:'center' }}>
        <Text>{'sadasda'}</Text>
      </CoverView>
    );
  }
}
