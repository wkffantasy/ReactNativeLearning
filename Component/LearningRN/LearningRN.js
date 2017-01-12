import React, { Component } from 'react';
import {
  ListView,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import IntroduceCell from '../Reusable/IntroduceCell';

const dataArray = [
  {
    title:'RN组件学习~~ActivityIndicator',
    introduce:'ActivityIndicator的属性',
    key:'ActivityIndicatorView',
  },
  {
    title:'RN组件学习~~Image',
    introduce:'Image',
    key:'ImageLearningView',
  },
];
const ds = new ListView.DataSource({
  rowHasChanged :(r1,r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

export default class LearningRN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource : ds.cloneWithRows(dataArray),
    };
  }
  _clickCell(rowData) {
    if (rowData.key.length !== 0) {
      Actions[rowData.key]();
    }
  }
  _renderRow(rowData,sectionId,rowId) {
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
