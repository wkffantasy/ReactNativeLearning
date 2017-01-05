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
  AsyncStorage,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Storage from 'react-native-storage';

const { width:ScreenW, height:ScreenH } = Dimensions.get('window');
const storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,
  storageBackend: AsyncStorage,

  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
});

export default class StorageForAppView  extends Component {

  constructor(props) {
    super(props);
    // 存
    storage.save({
      key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
      rawData: {
        from: 'some other site',
        userid: 'some userid',
        token: 'some token'
      },
    // 如果不指定过期时间，则会使用defaultExpires参数
    // 如果设为null，则永不过期
      expires: 1000 * 3600
    });
  }
  componentWillMount() {
    console.log('StorageForAppView componentWillMount');
    // 读
    storage.load({
      key: 'loginState',
    }).then((response) => {
      console.log('load success response ==',response);
    }).catch((err) => {
      console.warn('load failed err==',err);
      switch (err.name) {
      case 'NotFoundError':
            // TODO;
        break;
      case 'ExpiredError':
            // TODO
        break;
      }
    });
  }
  render() {
    return (
      <ScrollView
        style={{ flex: 1,marginTop:64 }}
        contentContainerStyle={{ alignItems:'center' }}
      >
        <Text>{'sadasd'}</Text>
      </ScrollView>
    );
  }
}
