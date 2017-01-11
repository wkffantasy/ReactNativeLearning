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

export default class downloadDemoView extends Component {

  render() {
    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems:'center' }}
      >
        <Text style={{ marginTop:20,marginBottom:20,color:'#333333',fontSize:17,marginLeft:15,marginRight:15 }}>
          {'下载的demo'}
        </Text>
      </ScrollView>
    );
  }
}
