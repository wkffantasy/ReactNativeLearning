import React, { Component,PropTypes } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';


export default class LearningRN extends Component {
  static propTypes = {
    rowData:PropTypes.Object,
    onPress:PropTypes.func,
  };

  render() {
    console.log('this.props.rowData ==',this.props.rowData);
    const rowData = this.props.rowData;
    return (
      <TouchableWithoutFeedback onPress={() => { this.props.onPress && this.props.onPress(); }}>
        <View style={{ backgroundColor:'white' }} >
          <Text style={{ marginLeft:15,marginRight:15,marginTop:10,color:'#333333' }}>{`${rowData.title}`}</Text>
          <Text style={{ marginLeft:15,marginRight:15,marginTop:10,marginBottom:10,color:'#999999' }}>{`${rowData.introduce}`}</Text>
          <View style={{ backgroundColor:'#fefefe',height:1,marginLeft:15 }} />
        </View>
      </TouchableWithoutFeedback>
    );
  }

}
