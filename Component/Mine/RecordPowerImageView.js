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
      isShow:false,
    };
  }
  componentWillMount() {
    console.log('RecordPowerImageView componentWillMount');
  }
  show() {
    console.log('RecordPowerImageView show');
    this.setState({
      ...this.state,
      isShow:true,
    });
  }
  hide() {
    console.log('RecordPowerImageView hide');
    this.setState({
      ...this.state,
      isShow:false,
    });
  }

  render() {
    if (this.state.isShow === true) {
      return (
        <CoverView style={{ flex: 1,marginTop:64,alignItems:'center',justifyContent:'center' }}>
          <Text>{'sadasda'}</Text>
        </CoverView>
      );
    }
    return null;
  }
}
