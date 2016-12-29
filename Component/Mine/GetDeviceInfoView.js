/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Text,
  ListView,
  TouchableWithoutFeedback,
  InteractionManager,
  NativeModules,
  AppState,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

const DeviceInfoManager = NativeModules.DeviceInfoManager;
const ds = new ListView.DataSource({
  rowHasChanged :(r1,r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});
const { width:ScreenW, height:ScreenH } = Dimensions.get('window');

export default class DeviceInfoView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource : ds.cloneWithRows([]),
    };
    this.dataArray = [];
  }
  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this._addListener();
      this._getDeviceId();
      this._getDeviceInfo();
      // this._getAppNotificationStatus();
    });
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this.appStateChangeHandler);
  }
  _addListener() {
    this.appStateChangeHandler = (state) => {
      if (state === 'active') {
        // this._getAppNotificationStatus();
        console.log('app enter foreground');
      } else {
        console.log('app enter background');
      }
    };
    AppState.addEventListener('change', this.appStateChangeHandler);
  }

  _getDeviceCarrier() {
    DeviceInfoManager.getDeviceCarrier((carrierName,netType) => {
      console.log('getDeviceCarrier carrierName ==',carrierName);
      console.log('getDeviceCarrier netType==',netType);
    });
  }
  _getDeviceScreenResolution() {
    DeviceInfoManager.getDeviceScreenResolution((width,height) => {
      console.log('getDeviceScreenResolution width ==',width);
      console.log('getDeviceScreenResolution height==',height);
    });
  }
  _getDeviceInfo() {
    DeviceInfoManager.getDeviceInfo((name,model,localizedModel,systemName,systemVersion) => {
      console.log('getDeviceInfo name==',name);
      console.log('getDeviceInfo model==',model);
      console.log('getDeviceInfo localizedModel==',localizedModel);
      console.log('getDeviceInfo systemName==',systemName);
      console.log('getDeviceInfo systemVersion==',systemVersion);
      this.dataArray.push(
        {
          text:`设备的名字==${name}`,
          key:'deviceName',
        },
        {
          text:`设备是iPhone还是iPod touch 等等，这个设备是==${model}`,
          key:'deviceModel',
        },
        {
          text:`the localizedModel of this device is==${localizedModel}`,
          key:'deviceLocalizedModel',
        },
        {
          text:`设备的系统==${systemName}`,
          key:'deviceSystemName',
        },
        {
          text:`设备当前的版本号==${systemVersion}`,
          key:'deviceSystemVersion',
        },
    );
      this.setState({
        ...this.state,
        dataSource : ds.cloneWithRows(this.dataArray),
      });
    });
  }
  _getDeviceId() {
    DeviceInfoManager.getDeviceId((status,responseText) => {
      console.log('getDeviceId status==',status);
      console.log('getDeviceId responseText==',responseText);
      const getStatus = status === 'true' ? '成功' : '失败';
      const text = `获取DeviceId~~~~~${getStatus}\n${responseText}`;
      this.dataArray.push({
        text,
        key:'GetDeviceId',
      });
      this.setState({
        ...this.state,
        dataSource : ds.cloneWithRows(this.dataArray),
      });
    });
  }
  _getAppNotificationStatus() {
    DeviceInfoManager.getAppNotificationStatus((responseText) => {
      console.log('_getAppNotificationStatus responseText==',responseText);
      const status = responseText === true ? '开' : '关';
      const text = `本地通知的状态~~~~${status}`;
      const key = 'AppNotificationStatus';
      let thisItem;
      for (let i = 0; i < this.dataArray.length; i++) {
        const item = this.dataArray[i];
        if (item.key === key) {
          thisItem = item;
          break;
        }
      }
      if (thisItem === undefined) {
        this.dataArray.push({
          text,
          key,
          onPress:() => { this._clickToAppNotificationStatus(); },
        });
      } else {
        thisItem.text = text;
      }
      this.setState({
        ...this.state,
        dataSource : ds.cloneWithRows(this.dataArray),
      });
    });
  }
  _clickToAppNotificationStatus() {
    DeviceInfoManager.openAppSettingNotification();
  }
  _renderRow(rowData,sectionId,rowId) {
    console.log('rowData ==',rowData);
    return (
      <TouchableWithoutFeedback onPress={() => { rowData.onPress && rowData.onPress(); }}>
        <View style={{  }}>
          <Text style={{ color:'#666666',fontSize:16,marginLeft:15,marginRight:15,marginTop:20,marginBottom:20 }}>{`${rowData.text}`}</Text>
          <View style={{ backgroundColor:'#999999',height:1,marginLeft:15 }} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
  render() {
    return (
      <ListView
        style={{ backgroundColor:'white',flex:1,marginTop:64 }}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        enableEmptySections={true}
      />
    );
  }

}
