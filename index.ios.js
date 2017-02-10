/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Actions,Scene, Router } from 'react-native-router-flux';

import LearningRN from './Component/LearningRN/LearningRN';
import LearingJS from './Component/LearningJS/LearningJS';
import Mine from './Component/Mine/Mine';

// LearningRN
import ActivityIndicatorView from './Component/LearningRN/ActivityIndicatorView';
import ImageLearningView from './Component/LearningRN/ImageLearningView';

// Mine
import MarqueeTextDemoView from './Component/Mine/MarqueeTextDemoView';
import AnimateImagesDemoView from './Component/Mine/AnimateImagesDemoView';
import SVGViews from './Component/Mine/SVGViews';
import DeviceInfoView from './Component/Mine/GetDeviceInfoView';
import StorageForAppView from './Component/Mine/StorageForAppView';
import DownloadDemoView from './Component/Mine/DownloadDemoView';
import RecordDemoView from './Component/Mine/RecordDemoView';
import ImageScrollView from './Component/Mine/BannerScrollDemoView';

// common
import WebTipView from './Common/Component/WebTipView';

const TabBarItem = () => props => (
  <View style={{ alignItems:'center', paddingTop:4 }}>
    <Text style={[{ marginTop:6 }, props && props.selected ? { color:'#00b5e9' } : { color:'#999999' }, { fontSize:11,marginBottom:4 }]} >
      {props.title}
    </Text>
  </View>
  );

export default class ReactNativeLearning extends Component {
  componentWillMount() {
    console.log('ReactNativeLearning componentWillMount');
    console.log('process.env.NODE_ENV ==',process.env.NODE_ENV);
    // development
    console.log('process.env ==',process.env);
    console.log('process ==',process);
  }
  render() {
    return (
      <Router>
        <Scene initial key="root" tabs={true} tabBarStyle={{ backgroundColor:'#fcfcfc' }}>
          <Scene key="tab0" title="RN学习" icon={TabBarItem({ title:'RN学习' })} style={{ marginBottom:49 }}>
            <Scene key="LearningRN" component={LearningRN} title="RN学习" initial={true} />
            <Scene key="ActivityIndicatorView" component={ActivityIndicatorView} hideTabBar />
            <Scene key="ImageLearningView" component={ImageLearningView} hideTabBar />
          </Scene>
          <Scene key="tab1" title="JS学习" icon={TabBarItem({ title:'111' })} style={{ marginBottom:49 }}>
            <Scene key="LearingJS" component={LearingJS} title="LearingJS" initial={true} />
          </Scene>
          <Scene key="tab2" title="我的" icon={TabBarItem({ title:'222' })} style={{ marginBottom:49 }}>
            <Scene key="Mine" component={Mine} title="Mine" initial={true} />
            <Scene key="MarqueeTextDemoView" component={MarqueeTextDemoView} hideTabBar />
            <Scene key="AnimateImagesDemoView" component={AnimateImagesDemoView} hideTabBar />
            <Scene key="SVGViews" component={SVGViews} hideTabBar />
            <Scene key="DeviceInfoView" component={DeviceInfoView} hideTabBar />
            <Scene key="StorageForAppView" component={StorageForAppView} hideTabBar />
            <Scene key="DownloadDemoView" component={DownloadDemoView} hideTabBar />
            <Scene key="RecordDemoView" component={RecordDemoView} hideTabBar />
            <Scene key="ImageScrollView" component={ImageScrollView} hideTabBar />

            <Scene key="WebTipView" component={WebTipView} hideTabBar />
          </Scene>

        </Scene>
      </Router>
    );
  }
}

AppRegistry.registerComponent('ReactNativeLearning', () => ReactNativeLearning);
