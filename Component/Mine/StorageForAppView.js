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

// import { Actions } from 'react-native-router-flux';
import Storage from 'react-native-storage';

// const { width:ScreenW, height:ScreenH } = Dimensions.get('window');
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
    this.state = {};
  }
  componentWillMount() {
    console.log('StorageForAppView componentWillMount');
    this._toSave();
    InteractionManager.runAfterInteractions(() => {
      this._toRead();
    });
  }
  componentDidMount() {
    this.timer = setTimeout(
      () => {
        this._toDelete();
        this.timer && clearTimeout(this.timer);
      },
      2000,
    );
  }
  componentWillUmmount() {
    this.timer && clearTimeout(this.timer);
  }
  _toDelete() {
    // 清除某个key下的所有数据
    // storage.clearMapForKey('user');
    // 删除单个数据
    storage.remove({
      key: 'loginState'
    });
    storage.remove({
      key: 'user',
      id: '1002',
    });
    InteractionManager.runAfterInteractions(() => {
      this._toRead();
    });
  }
  _toRead() {
    // 读
    storage.load({
      key: 'loginState',
    }).then((response) => {
      console.log('load loginState success response ==',response);
    }).catch((err) => {
      console.warn('load loginState failed err==',err);
      switch (err.name) {
      case 'NotFoundError':
        break;
      case 'ExpiredError':
        break;
      }
    });
    storage.load({
      key: 'user',
      id:'1001',
    }).then((response) => {
      console.log('load user id==1001 success response ==',response);
    }).catch((err) => {
      console.warn('load user id==1001 failed err==',err);
    });

    // 获取某个key下的所有id
    storage.getIdsForKey('user').then((ids) => {
      console.log('getIdsForKey ids ==',ids);
    });

    // 获取某个key下的所有数据
    storage.getAllDataForKey('user').then((users) => {
      console.log('getAllDataForKey users ==',users);
    });
  }
  _toSave() {
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
    storage.save({
      key:'user',
      id:'1001',
      rawData:{
        name:'依然fantasy',
        age:12,
      }
    });
    storage.save({
      key:'user',
      id:'1002',
      rawData:{
        name:'fantasy',
        age:13,
      }
    });
  }
  render() {
    return (
      <ScrollView
        style={{ flex: 1,marginTop:64 }}
        contentContainerStyle={{ alignItems:'center' }}
      >
        <Text>{`
          关于更多的信息，请看github地址。
          https://github.com/sunnylqm/react-native-storage/blob/master/README-CHN.md
          `}
        </Text>
      </ScrollView>
    );
  }
}
