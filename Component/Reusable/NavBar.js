import React, { Component,PropTypes } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

export default class LearningRN extends Component {
  static propTypes = {
    onLeft:PropTypes.func,
    onRight:PropTypes.func,

    leftTitle:PropTypes.string,
    leftIcon:Image.propTypes.source,

    rightTitle:PropTypes.string,
    rightIcon:Image.propTypes.source,
  };
  render() {
    return (
      <View style={styles.containerStyle}>
        <StatusBar barStyle={'light-content'} />
        <View style={styles.navStyle} />
      </View>
    );
  }

}
const styles = StyleSheet.create({
  containerStyle:{
    height: 64,
    backgroundColor: '#34495e',
    borderBottomColor: '#445566',
  },
  navStyle:{
    backgroundColor:'yellow',
    alignItems:'center',
    flexDirection:'row',
  },
});
