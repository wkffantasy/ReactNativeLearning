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
  ScrollView,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import RadarView from './SVGChildViews/RadarView';

const { width:ScreenW, height:ScreenH } = Dimensions.get('window');

export default class SVGViews extends Component {

  render() {
    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems:'center' }}
      >
        <RadarView
          titleArray={['红尘客栈','床边故事','白色气球','前世情人']}
          valuesArray={[30,20,24,30]}
          style={{ marginTop:100 }}
        />
        <Text style={{ marginTop:20,marginBottom:20,color:'#333333',fontSize:17,marginLeft:15,marginRight:15 }}>
          {'因为文字是按着path走的，所以当文字多或者少的时候弧线就不对了。待优化'}
        </Text>
      </ScrollView>
    );
  }
}
