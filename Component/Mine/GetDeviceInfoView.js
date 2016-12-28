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
} from 'react-native';

import { Actions } from 'react-native-router-flux';

const ds = new ListView.DataSource({
  rowHasChanged :(r1,r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});
const { width:ScreenW, height:ScreenH } = Dimensions.get('window');

export default class DeviceInfoView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource : ds.cloneWithRows(this.dataArray),
    };
    this.dataArray = [];
  }
  componentWillMount() {

  }
  _renderRow(rowData,sectionId,rowId) {
    console.log('rowData ==',rowData);
    return (
      <TouchableWithoutFeedback onPress={() => { rowData.onPress && rowData.onPress(); }}>
        <View style={{ height:40,justifyContent:'center' }}>
          <Text style={{ color:'#666666',fontSize:16,marginLeft:15,marginRight:15 }}>{`${rowData.title}`}</Text>
        </View>
      </TouchableWithoutFeedback>

    );
  }
  render() {
    return (
      <View style={{ flex:1,backgroundColor:'red' }} />
    );
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
