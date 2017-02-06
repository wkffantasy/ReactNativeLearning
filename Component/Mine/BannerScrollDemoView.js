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
} from 'react-native';

import ImageScrollView from '../Reusable/ImageScrollView';

const image01 = require('../Img/imageScrollDemo01.png');
const image02 = require('../Img/imageScrollDemo02.png');
const image03 = require('../Img/imageScrollDemo03.png');
const image04 = require('../Img/imageScrollDemo04.png');
const image05 = require('../Img/imageScrollDemo05.png');
const image06 = require('../Img/imageScrollDemo06.png');
const image07 = require('../Img/imageScrollDemo07.png');
const image08 = require('../Img/imageScrollDemo08.png');
const image09 = require('../Img/imageScrollDemo09.png');
const image10 = require('../Img/imageScrollDemo10.png');

const { width:ScreenW, height:ScreenH } = Dimensions.get('window');

const imageW = ScreenW;
const imageH = (400 * imageW) / 640;

const imageArray01 = [
  image01,
];
const imageArray02 = [
  image02,
  image03,
];
const imageArray03 = [
  image04,
  image05,
  image06,
];
const imageArray04 = [
  image05,
  image06,
  image07,
  image08,
  image09,
  image10,
];

export default class ImageScrollDemoView extends Component {

  _clickFirstDemo(index) {
    console.log('_clickFirstDemo index==',index);
  }
  _clickSecondDemo(index) {
    console.log('_clickSecondDemo index==',index);
  }
  _clickThirdDemo(index) {
    console.log('_clickThirdDemo index==',index);
  }
  _clickFouthDemo(index) {
    console.log('_clickFouthDemo index==',index);
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }} >
        <ImageScrollView
          style={{ marginTop:64 }}
          width={imageW}
          height={imageH}
          imageArray={imageArray01}
          onPressImage={(index) => { this._clickFirstDemo(index); }}
        />

        <ImageScrollView
          style={{ marginTop:20 }}
          width={imageW}
          height={imageH}
          imageArray={imageArray02}
          onPressImage={(index) => { this._clickSecondDemo(index); }}
        />

        <ImageScrollView
          style={{ marginTop:20 }}
          width={imageW}
          height={imageH}
          imageArray={imageArray03}
          onPressImage={(index) => { this._clickThirdDemo(index); }}
        />

        <ImageScrollView
          style={{ marginTop:20 }}
          width={imageW}
          height={imageH}
          imageArray={imageArray04}
          onPressImage={(index) => { this._clickFouthDemo(index); }}
        />
      </ScrollView>
    );
  }
}
