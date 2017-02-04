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
  TouchableWithoutFeedback,

} from 'react-native';

import { Actions } from 'react-native-router-flux';

import { AudioRecorder, AudioUtils } from 'react-native-audio';

import RecordPowerImageView from './RecordPowerImageView';

const audioPath = `${AudioUtils.DocumentDirectoryPath}/test.aac`;

AudioRecorder.prepareRecordingAtPath(audioPath, {
  SampleRate: 22050,
  Channels: 1,
  AudioQuality: 'Low',
  AudioEncoding: 'aac'
});
const
  RecordStateBegan = 1,
  RecordStateRecording = 2,
  RecordStateFinished = 3;


const { width:ScreenW, height:ScreenH } = Dimensions.get('window');

export default class RecordDemoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordState:RecordStateBegan,
    };
  }
  componentWillMount() {
    console.log('RecordDemoView componentWillMount');
    console.log('audioPath ==',audioPath);
  }
  _BeganRecord() {
    console.log('_BeganRecord');
    if (this.state.recordState === RecordStateBegan || this.state.recordState === RecordStateFinished) {
      // AudioRecorder.startRecording();

      this.setState({
        ...this.state,
        recordState:RecordStateRecording,
      });
      RecordPowerImageView.show();
    } else {
      console.log('ignore');
    }
  }
  _StopRecord() {
    console.log('_StopRecord');
    if (this.state.recordState === RecordStateRecording) {
      // AudioRecorder.stopRecording();
      RecordPowerImageView.hide();
      this.setState({
        ...this.state,
        recordState:RecordStateFinished,
      });
    } else {
      console.log('ignore');
    }
  }
  _clickToPlayRecord() {
    console.log('_clickToPlayRecord');
  }
  renderButton(text,onPress) {
    return (
      <TouchableWithoutFeedback onPress={() => { onPress(); }}>
        <View style={{ width:140,height:40,justifyContent:'center',alignItems:'center',marginTop:20 }}>
          <Text style={{ color:'#333333',fontSize:16 }}>{`${text}`}</Text>
        </View>
      </TouchableWithoutFeedback>
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
        {this.renderButton('点击播放',() => this._clickToPlayRecord())}
      </View>
    );
  }
}
