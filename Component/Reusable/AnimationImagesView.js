import React, { Component, PropTypes } from 'react';
import {
  Image,
} from 'react-native';

export default class AnimationsImagesView extends Component {
  static propTypes = {
    animationImages : PropTypes.array.isRequired,
    animationRepeatCount : PropTypes.number,// 播放次数 默认 无限播放
    animationItemTime : PropTypes.number,//毫秒 每隔多少毫秒换一次图片 默认1秒
  };
  constructor(props) {
    super(props);
    this.state = {
      imageIndex:0,
    };
  }

  componentDidMount() {
    if (this.props.animationImages.length === 1) {
      return;
    }
    let animationRepeatCount = this.props.animationRepeatCount || Number.POSITIVE_INFINITY;
    this.timer && clearInterval(this.timer);
    this.timer = setInterval(
      () => {
        let imageIndex = this.state.imageIndex + 1;
        if (imageIndex >= this.props.animationImages.length) {
          imageIndex = 0;
          if (animationRepeatCount === 1) {
            this.timer && clearInterval(this.timer);
            return;
          }
          animationRepeatCount--;
        }
        this.setState({
          ...this.state,
          imageIndex,
        });
      },
      this.props.animationItemTime || 1000
    );
  }
  componentWillUnmount() {
    console.log('AnimationsImagesView clear timer');
    this.timer && clearInterval(this.timer);
  }

  render() {
    return (
      <Image
        {...this.props}
        source={this.props.animationImages[this.state.imageIndex]}
      />
    );
  }
}
