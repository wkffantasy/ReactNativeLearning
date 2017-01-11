/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  ScrollView,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import RadarView from './SVGChildViews/RadarView';

export default class SVGViews extends Component {

  _clickToWeb() {
    console.log('_clickToWeb');
    Actions.WebTipView({
      webString:'https://github.com/react-native-community/react-native-svg',
    });
  }
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
        <Text onPress={() => { this._clickToWeb(); }} style={{ marginTop:40,fontSize:30,color:'#333333' }}>
          {'点击我进入react-native-svg的详细介绍'}
        </Text>
      </ScrollView>
    );
  }
}
