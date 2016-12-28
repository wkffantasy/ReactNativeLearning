

import React, { Component, PropTypes } from 'react';
import {
  View,
  Dimensions,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import AnimationImagesView from '../Reusable/AnimationImagesView';

const uploadingArray = [
  require('../Img/ic-speakingExercise-uploading01.png'),
  require('../Img/ic-speakingExercise-uploading02.png'),
  require('../Img/ic-speakingExercise-uploading03.png'),
  require('../Img/ic-speakingExercise-uploading04.png'),
  require('../Img/ic-speakingExercise-uploading05.png'),
];
const uploadingSuccessArray = [
  require('../Img/ic-speakingExercise-uploadingSuccess01.png'),
  require('../Img/ic-speakingExercise-uploadingSuccess02.png'),
  require('../Img/ic-speakingExercise-uploadingSuccess03.png'),
  require('../Img/ic-speakingExercise-uploadingSuccess04.png'),
  require('../Img/ic-speakingExercise-uploadingSuccess05.png'),
  require('../Img/ic-speakingExercise-uploadingSuccess06.png'),
];

const recordViewWH = 59;
const { width:ScreenW, height:ScreenH } = Dimensions.get('window');

export default class AnimateImageDemo extends Component {

  render() {
    return (
      <View style={{ backgroundColor:'white',flex:1, }}  >
        <AnimationImagesView
          animationImages={uploadingArray}
          animationItemTime={200}
          style={{ width:recordViewWH,height:recordViewWH,marginTop:100,marginLeft:50 }}
        />
        <AnimationImagesView
          animationImages={uploadingArray}
          animationItemTime={300}
          style={{ width:recordViewWH,height:recordViewWH,marginTop:20,marginLeft:50 }}
        />
        <AnimationImagesView
          animationImages={uploadingArray}
        />
        <AnimationImagesView
          animationImages={uploadingSuccessArray}
          animationItemTime={300}
          style={{ width:recordViewWH,height:recordViewWH,marginTop:20,marginLeft:50 }}
        />
        <AnimationImagesView
          animationImages={uploadingSuccessArray}
        />
        <AnimationImagesView
          animationImages={[uploadingSuccessArray[uploadingSuccessArray.length - 1]]}
        />
        <AnimationImagesView
          animationImages={uploadingSuccessArray}
          animationItemTime={300}
          animationRepeatCount={2}
          style={{ width:recordViewWH,height:recordViewWH,marginTop:20,marginLeft:50 }}
        />
      </View>
    );
  }

}
