

import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  View,
} from 'react-native';
import SVG,{
    Circle,
    Rect,
    Polygon,
    Text,
    Defs,
    Stop,
    LinearGradient,
    G,
} from 'react-native-svg';

import RNText from './ReactNativeText';

const circleNumber = 5;
const circleMargin = 20;
const commonColor = '#586E83';
const pointsColor = ['#fe663b','#4A94ff','#ce12ff','#8affff'];
const pointRadius = 2;
const fullMark = 30;
const circlePadding = 10;

const circleTotalWidth = circleNumber * circleMargin * 2;
const { width:ScreenW, height:ScreenH } = Dimensions.get('window');
const cx = ScreenW / 2;
export default class RadarView extends Component {
  static propTypes = {
    titleArray : PropTypes.array.isRequired,
    valuesArray : PropTypes.array.isRequired,
    style:View.propTypes.style,
  };
  _renderBottomCurveText(title,subtitle) {
    const path = 'M5 30 Q 45 45 85 30';
    return (
      <View style={{ backgroundColor:'transparent',justifyContent:'center',alignItems:'center' }}>
        <RNText
          style={{ marginTop:0 }}
          text={`${subtitle}`}
        />
        <SVG
          height="90"
          width="90"
        >
          <G y="-13">
            <Text
              fill="#fe663b"
              path={path}
              fontSize="20"
            >{`${title}`}</Text>
          </G>
        </SVG>
        <View style={{ marginTop:-70,backgroundColor:'transparent' }} />
      </View>
    );
  }
  render() {
    const scoreArray = this.props.valuesArray;
    const titleArray = this.props.titleArray;

    return (
      <View style={[{ backgroundColor:'transparent',alignItems:'center',justifyContent:'center' },this.props.style]} >
        <CurveTextView
          title={`${titleArray[0]}`}
          subtitle={`${scoreArray[0]}分`}
        />
        <View style={{ justifyContent:'center',alignItems:'center' }}>
          <View style={{ flexDirection:'row',alignItems:'center' }}>
            <CurveTextView
              title={`${titleArray[3]}`}
              subtitle={`${scoreArray[3]}分`}
              style={{ transform:[{ rotateZ:'270deg' }],marginLeft:ScreenW === 320 ? -20 : 0 }}
            />
            <View style={{ marginLeft:-20, }}>
              <Radar valuesArray={this.props.valuesArray} />
            </View>
            <CurveTextView
              title={`${titleArray[1]}`}
              subtitle={`${scoreArray[1]}分`}
              style={{ marginLeft:-20,transform:[{ rotateZ:'90deg' }] }}
            />
          </View>
        </View>
        {this._renderBottomCurveText(titleArray[2],`${scoreArray[2]}分`)}
      </View>
    );
  }
}

class CurveTextView extends Component {

  static propTypes = {
    subtitle : PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
    style:View.propTypes.style,
  };
  render() {
    // 起点x 起点y 圆心x 圆心y 终点x 终点y
    const path = 'M5 30 Q 45 15 85 30';
    return (
      <View style={[{ backgroundColor:'transparent',justifyContent:'center',alignItems:'center' },this.props.style]}>
        <SVG
          height="90"
          width="90"
        >
          <Text
            fill="#fe663b"
            path={path}
            fontSize="20"
          >{`${this.props.title}`}</Text>
        </SVG>
        <RNText
          style={{ marginTop:-65 }}
          text={`${this.props.subtitle}`}
        />
      </View>
    );
  }
}
class Radar extends Component {
  static propTypes = {
    valuesArray : PropTypes.array.isRequired,
  };
  _renderCircles() {
    const ret = [];
    for (let i = 0; i < circleNumber; i++) {
      let r = (i + 1) * circleMargin;
      if (i === circleNumber - 1) {
        r = (i + 1) * circleMargin - 1;
      }
      ret.push(
        <Circle
          key={`circle~~${i}`}
          cx={`${circleTotalWidth / 2 + circlePadding / 2}`}
          cy={`${circleTotalWidth / 2 + circlePadding / 2}`}
          r={`${r}`}
          stroke={`${commonColor}`}
          strokeWidth="1"
          fill="transparent"
        />
      );
    }
    return ret;
  }
  _renderPointView() {
    const scoreArray = this.props.valuesArray;
    const ret = [];
    const polygonXYArray = [];
    for (let i = 0; i < scoreArray.length; i++) {
      const itemScore = scoreArray[i];
      const color = pointsColor[i];
      let x = 0;
      let y = 0;
      if (i === 0) {
        x = circleTotalWidth / 2 + circlePadding / 2;
        y = circleTotalWidth / 2 - itemScore / fullMark * (circleTotalWidth / 2) + circlePadding / 2;
        polygonXYArray.push({
          x,
          y:y + pointRadius * 2,
        });
      } else if (i === 1) {
        x = itemScore / fullMark * (circleTotalWidth / 2) + (circleTotalWidth / 2) + circlePadding / 2;
        y = circleTotalWidth / 2 + circlePadding / 2;
        polygonXYArray.push({
          x : x - pointRadius * 2,
          y,
        });
      } else if (i === 2) {
        x = circleTotalWidth / 2 + circlePadding / 2;
        y = itemScore / fullMark * (circleTotalWidth / 2) + (circleTotalWidth / 2) + circlePadding / 2;
        polygonXYArray.push({
          x,
          y:y - pointRadius * 2,
        });
      } else {
        x = circleTotalWidth / 2 - itemScore / fullMark * (circleTotalWidth / 2) + circlePadding / 2;
        y = circleTotalWidth / 2 + circlePadding / 2;
        polygonXYArray.push({
          x : x + pointRadius * 2,
          y,
        });
      }
      ret.push(
        <Circle
          key={`point~~${i}`}
          cx={`${x}`}
          cy={`${y}`}
          r={`${pointRadius}`}
          stroke={`${color}`}
          strokeWidth={`${pointRadius}`}
          fill={`${color}`}
        />
      );
    }
    ret.push(
      <SVG
        key="Polygon"
        height={`${circleTotalWidth}`}
        width={`${circleTotalWidth}`}
      >
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="100%">
            <Stop offset="0" stopColor="#b773eb" stopOpacity="1" />
            <Stop offset="1" stopColor="#0c74db" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Polygon
          points={`${polygonXYArray[0].x},${polygonXYArray[0].y} ${polygonXYArray[1].x},${polygonXYArray[1].y} ${polygonXYArray[2].x},${polygonXYArray[2].y} ${polygonXYArray[3].x},${polygonXYArray[3].y}`}
          strokeWidth="1"
          fill="url(#grad)"
        />
      </SVG>
    );
    return ret;
  }

  render() {
    return (
      <View style={{ padding:5 ,backgroundColor:'transparent' }}>
        <SVG
          height={`${circleTotalWidth + circlePadding}`}
          width={`${circleTotalWidth + circlePadding}`}
        >
          {this._renderCircles()}
          <Rect
            x={`${(circleTotalWidth + circlePadding) / 2}`}
            y={`${circlePadding / 2}`}
            width="0.1"
            height={`${circleTotalWidth}`}
            stroke={`${commonColor}`}
          />
          <Rect
            x={`${circlePadding / 2}`}
            y={`${(circleTotalWidth + circlePadding) / 2}`}
            width={`${circleTotalWidth}`}
            height="0.1"
            stroke={`${commonColor}`}
          />
          {this._renderPointView()}
        </SVG>
      </View>
    );
  }
}
