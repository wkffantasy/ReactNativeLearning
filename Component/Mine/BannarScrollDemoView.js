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

import  MarqueeTextView from '../Reusable/MarqueeText';

const { width:ScreenW, height:ScreenH } = Dimensions.get('window');

export default class MarqueeTextDemoView extends Component {

  _renderTitleView() {
    return (
      <MarqueeTextView
        title={'海天连线的地方是那夕阳，木造的甲板一整遍是那金黄，你背光的轮廓就像剪影一样'}
        titleStyle={{ color:'red',fontSize:10 }}
        style={{ marginLeft:40,marginRight:40,height:14 }}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }} >
        <MarqueeTextView
          title={'你发如雪凄美了离别，我焚香感动了谁，邀明月让回忆皎洁，爱在月光下完美'}
          titleStyle={{ color:'red',fontSize:10 }}
          style={{ marginTop:100,marginLeft:40,marginRight:40,backgroundColor:'yellow' }}
        />
        <MarqueeTextView
          title={'谁在用琵琶弹奏一曲东风破'}
          titleStyle={{ color:'red',fontSize:18 }}
          style={{ marginTop:100,marginLeft:40,marginRight:40 }}
        />
        <MarqueeTextView
          title={'为你弹奏肖邦的夜曲，纪念我死去的爱情，而我为你隐姓埋名'}
          style={{ marginTop:100,marginLeft:40,marginRight:40,backgroundColor:'yellow' }}
        />
      </View>
    );
  }
}
