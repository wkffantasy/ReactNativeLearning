import React, { Component, PropTypes } from 'react';
import {
  Image,
  ScrollView,
  View,
} from 'react-native';

export default class ImageScrollView extends Component {
  static propTypes = {
    imageArray:PropTypes.array.isRequired,
    width:PropTypes.number.isRequired,
    height:PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      imageIndex:0,
    };
  }

  componentDidMount() {

  }
  componentWillUnmount() {
  }

  render() {
    return (
      <View />
    );
  }
}
