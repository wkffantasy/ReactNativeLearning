/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  // Dimensions,
  Text,
  TouchableWithoutFeedback,
  Platform,
  Image,
  NativeModules,
} from 'react-native';

// import { Actions } from 'react-native-router-flux';

import { AudioRecorder, AudioUtils } from 'react-native-audio';

// import RecordPowerImageView from './RecordPowerImageView';

const audioPath = `${AudioUtils.DocumentDirectoryPath}/test.caf`;
const mp3Path = `${AudioUtils.DocumentDirectoryPath}/test.mp3`;
const RecordFileToMp3Manger = NativeModules.RecordFileToMp3Manger;

const
  recordImage = require('../Img/toast_microphone.png'),// 83 x 135
  recordVioce1 = require('../Img/toast_vol_1.png'),// 30 x 90
  recordVioce2 = require('../Img/toast_vol_2.png'),
  recordVioce3 = require('../Img/toast_vol_3.png'),
  recordVioce4 = require('../Img/toast_vol_4.png'),
  recordVioce5 = require('../Img/toast_vol_5.png'),
  recordVioce6 = require('../Img/toast_vol_6.png'),
  recordVioce7 = require('../Img/toast_vol_7.png');

const
  RecordStateBegan = 1,
  RecordStateRecording = 2,
  RecordStateFinished = 3;

// const { width:ScreenW, height:ScreenH } = Dimensions.get('window');

export default class RecordDemoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordState:RecordStateBegan,
      currentMetering:100,
    };
  }
  componentWillMount() {
    console.log('RecordDemoView componentWillMount');
    console.log('audioPath ==',audioPath);
    console.log('mp3Path ==',mp3Path);
  }
  _BeganRecord() {
    console.log('_BeganRecord');
    if (this.state.recordState === RecordStateBegan || this.state.recordState === RecordStateFinished) {
      AudioRecorder.prepareRecordingAtPath(audioPath, {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: 'High',
        AudioEncoding: 'caf',
        MeteringEnabled:true,
      });
      AudioRecorder.onProgress = (data) => {
        console.log('AudioRecorder.onProgress data==',data);
        if (data && data.currentMetering !== undefined) {
          const currentMetering = data.currentMetering + 60;
          this.setState({
            ...this.state,
            currentMetering,
          });
        }
      };
      AudioRecorder.onFinished = (data) => {
        console.log('AudioRecorder.onFinished data==',data);
        if (Platform.OS === 'ios') {
          console.log('Platform ==',Platform);
          console.log('Platform.OS ==',Platform.OS);
        }
      };
      AudioRecorder.startRecording();
      this.setState({
        ...this.state,
        recordState:RecordStateRecording,
      });
      // RecordPowerImageView.show();
    } else {
      console.log('ignore');
    }
  }
  _StopRecord() {
    console.log('_StopRecord');
    if (this.state.recordState === RecordStateRecording) {
      AudioRecorder.stopRecording();
      // RecordPowerImageView.hide();
      this.setState({
        ...this.state,
        recordState:RecordStateFinished,
        currentMetering:100,
      });
    } else {
      console.log('ignore');
    }
  }
  _clickToTransform() {
    console.log('_clickToTransform');
    RecordFileToMp3Manger.beganTransformFilePath(
      audioPath,
      mp3Path,
      // (param) => { console.log('progress param==',param); },
      (param) => { console.log('finished param==',param); },
      (error) => { console.log('error ==',error); },
    );
  }
  _getTextForBeganRecord() {
    let text = '';
    if (this.state.recordState === RecordStateBegan) {
      text = '开始录音';
    } else if (this.state.recordState === RecordStateRecording) {
      text = '正在录音';
    } else if (this.state.recordState === RecordStateFinished) {
      text = '重新录音';
    } else {
      console.error('录音状态只能是这三种');
    }
    return text;
  }
  _renderImages() {
    console.log('this.state.currentMetering ==',this.state.currentMetering);
    const currentMetering = this.state.currentMetering;
    if (currentMetering === 100) {
      return null;
    } else {
      const currentImage = this._getImageForMetering();
      return (
        <View style={{ marginTop:20,backgroundColor:'black',justifyContent:'center',alignItems:'center' }} >
          <View style={{ flexDirection:'row',alignItems:'center' }}>
            <Image source={recordImage} style={{ width:83 / 2,height:135 / 2,marginLeft:20 }} />
            <Image source={currentImage} style={{ width:30 / 2,height:90 / 2,marginLeft:20,marginRight:20 }} />
          </View>
        </View>
      );
    }
  }
  _getImageForMetering() {
    const currentMetering = this.state.currentMetering;
    if (currentMetering > 0 && currentMetering <= 10) {
      return recordVioce1;
    } else if (currentMetering > 10 && currentMetering <= 20) {
      return  recordVioce2;
    } else if (currentMetering > 20 && currentMetering <= 30) {
      return  recordVioce3;
    } else if (currentMetering > 30 && currentMetering <= 40) {
      return  recordVioce4;
    } else if (currentMetering > 40 && currentMetering <= 50) {
      return  recordVioce5;
    } else if (currentMetering > 50 && currentMetering <= 60) {
      return  recordVioce6;
    } else if (currentMetering === 100) {
      return null;
    } else {
      return recordVioce7;
    }
  }
  render() {
    return (
      <View style={{ flex: 1,marginTop:64,alignItems:'center' }}>
        <TouchableWithoutFeedback
          delayLongPress={500}
          onLongPress={() => { this._BeganRecord(); }}
          onPressOut={() => { this._StopRecord(); }}
        >
          <View style={{ width:140,height:40,justifyContent:'center',alignItems:'center',marginTop:20 }}>
            <Text style={{ color:'#333333',fontSize:16 }}>{`${this._getTextForBeganRecord()}`}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this._clickToTransform()}>
          <View style={{ width:140,height:40,justifyContent:'center',alignItems:'center',marginTop:20 }}>
            <Text style={{ color:'#333333',fontSize:16 }}>{'点击转成mp3'}</Text>
          </View>
        </TouchableWithoutFeedback>
        {this._renderImages()}
      </View>
    );
  }
}
