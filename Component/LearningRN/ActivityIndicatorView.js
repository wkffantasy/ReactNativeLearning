/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

export default class ActivityIndicatorView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnmating:false,
    };
  }
  _clickText() {
    console.log('_clickText');
    this.setState({
      ...this.state,
      isAnmating:!this.state.isAnmating,
    });
  }
  _clickToWeb() {
    console.log('_clickToWeb');
    Actions.WebTipView({
      webString:'https://facebook.github.io/react-native/docs/activityindicator.html',
    });
  }
  render() {
    return (
      <ScrollView
        style={{ flex: 1,marginTop:64 }}
        contentContainerStyle={{ alignItems:'center' }}
      >
        <TouchableWithoutFeedback onPress={() => { this._clickText(); }}>
          <View style={{ width:160,height:40,backgroundColor:'blue',alignItems:'center',justifyContent:'center' }}>
            <Text style={{ color:'white',fontSize:17 }}>{this.state.isAnmating ? '点击转圈' : '点击停止转圈'}</Text>
          </View>
        </TouchableWithoutFeedback>
        <Text onPress={() => { this._clickToWeb(); }} style={{ fontSize:30,color:'#333333' }}>
          {'点击我进入ActivityIndicator的官网介绍'}
        </Text>
        <Text style={{ marginTop:20,marginBottom:20,color:'#333333',fontSize:17,marginLeft:15,marginRight:15 }}>
          {`
            ActivityIndicator的demo
            hidesWhenStopped只支持iOS，而且必须animating属性为false才能起作用
            size是枚举，iOS只有small和large。安卓的话可以传一个number来控制他的大小
            `}
        </Text>
        <ActivityIndicator
          style={{ marginTop:10 }}
          animating={true}
          color={'red'}
          size={'small'}
        />
        <ActivityIndicator
          style={{ marginTop:10,height:80,width:80,backgroundColor:'green' }}
          animating={true}
          color={'red'}
          size={'small'}
        />
        <ActivityIndicator
          style={{ marginTop:10,backgroundColor:'red' }}
          animating={false}
          color={'black'}
          size={'small'}
        />
        <ActivityIndicator
          style={{ marginTop:10,backgroundColor:'green' }}
          animating={true}
          color={'red'}
          size={'large'}
        />
        <ActivityIndicator
          style={{ marginTop:10,backgroundColor:'green' }}
          animating={!this.state.isAnmating}
          color={'red'}
          size={'large'}
        />
        <ActivityIndicator
          style={{ marginTop:10,backgroundColor:'green' }}
          animating={false}
          color={'red'}
          size={'large'}
          hidesWhenStopped={this.state.isAnmating}
        />
        <ActivityIndicator
          style={{ marginTop:10,backgroundColor:'green' }}
          animating={true}
          color={'red'}
          size={'large'}
          hidesWhenStopped={this.state.isAnmating}
        />

      </ScrollView>
    );
  }
}
