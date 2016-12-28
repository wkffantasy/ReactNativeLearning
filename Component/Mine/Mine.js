import React, { Component } from 'react';
import {
  View,
  ListView,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import IntroduceCell from '../Reusable/IntroduceCell';

const dataArray = [
  {
    title:'跑马灯',
    introduce:'主要是每一个view的导航条title文字过长时，可以滑动来看全文字。',
    key:'MarqueeTextDemoView',
  },
  {
    title:'播放图片数组的view',
    introduce:'播放多张图片，连起来像一个gif图似的。比如下载的时候下载的动画，播放语音播放的动画等。',
    key:'AnimateImagesDemoView',
  },
];
const ds = new ListView.DataSource({
  rowHasChanged :(r1,r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

export default class Mine extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource : ds.cloneWithRows(dataArray),
    };
  }
  _clickCell(rowData) {
    console.log('_clickCell rowData==',rowData);
    console.log('rowData.key ==',rowData.key);
    if (rowData.key.length !== 0) {
      Actions[rowData.key]();
    }
  }
  _renderRow(rowData,sectionId,rowId) {
    console.log('rowData ==',rowData);
    return (
      <IntroduceCell
        rowData={rowData}
        onPress={() => { this._clickCell(rowData); }}
      />
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
