import React, { Component, PropTypes } from 'react';
import {
  Image,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  InteractionManager,
} from 'react-native';


export default class ImageScrollView extends Component {
  static propTypes = {
    imageArray:PropTypes.array.isRequired,
    width:PropTypes.number.isRequired,
    height:PropTypes.number.isRequired,
    style: View.propTypes.style,
    onPressImage: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      currentIndex:0,
      imageArray:[],
      originImageLength:0,
    };
  }
  componentWillMount() {
    this._fixImageArray();
  }
  componentDidMount() {

  }
  componentWillUnmount() {

  }
  _fixImageArray() {
    const originImageArray = this.props.imageArray;
    if (originImageArray === undefined || originImageArray.length === 0) {
      console.error('there have no images,this.props.imageArray==',this.props.imageArray);
    } else {
      if (originImageArray.length === 1) {
        this.setState({
          ...this.state,
          imageArray:originImageArray,
          originImageLength:1,
        });
      } else {
        const imageArray = [];
        imageArray.push(originImageArray[originImageArray.length - 1]);
        for (let i = 0; i < originImageArray.length; i++) {
          const imageItem = originImageArray[i];
          imageArray.push(imageItem);
        }
        imageArray.push(originImageArray[0]);
        this.setState({
          ...this.state,
          imageArray,
          originImageLength:originImageArray.length,
        });
        InteractionManager.runAfterInteractions(() => {
          this.scrollView.scrollTo({
            x:this.props.width,
            animated:false,
          });
        });
      }
    }
  }
  _clickImage(index) {
    console.log('index ==',index);
    const realIndex = this._fixIndex(index);
    console.log('realIndex ==',realIndex);
    this.props.onPressImage && this.props.onPressImage(realIndex);
  }
  _fixIndex(index) {
    if (this.state.originImageLength === 1) {
      return 0;
    } else {
      if (index === 0) {
        return this.state.imageArray.length - 2;
      } else {
        return index - 1;
      }
    }
  }
  _onMomentumScrollEnd(e) {
    if (this.state.originImageLength === 1) {
      return;
    }
    const scrollIndex = parseInt(e.nativeEvent.contentOffset.x / (this.props.width));
    if (scrollIndex === 0) {
      this.scrollView.scrollTo({
        x:this.props.width * (this.state.imageArray.length - 2),
        animated:false,
      });
    } else if (scrollIndex === this.state.imageArray.length - 1) {
      this.scrollView.scrollTo({
        x:this.props.width,
        animated:false,
      });
    }
    console.log('scrollIndex==',scrollIndex);

    let realIndex = 0;
    if (this.state.originImageLength === 1) {
      realIndex = 0;
    } else {
      if (scrollIndex === this.state.imageArray.length - 1) {
        realIndex = 0;
      } else {
        realIndex = scrollIndex - 2;
      }
    }
    console.log('realIndex ==',realIndex);
    this.setState({
      ...this.state,
      currentIndex:realIndex,
    });
  }

  _renderImagesView() {
    const imageViewArray = [];
    const imageArray = this.state.imageArray;
    for (let i = 0; i < imageArray.length; i++) {
      const imageSource = imageArray[i];
      imageViewArray.push(
        <TouchableWithoutFeedback
          onPress={() => { this._clickImage(i); }}
          key={`TouchableWithoutFeedback~~image~~${i}`}
        >
          <Image source={imageSource} style={{ width:this.props.width,height:this.props.height }} />
        </TouchableWithoutFeedback>
      );
    }
    return imageViewArray;
  }
  _renderDotsView() {
    const dotsArray = [];
    const dotWH = 5;
    for (let i = 0; i < this.state.originImageLength; i++) {
      dotsArray.push(
        <View
          key={`dota~~${i}`}
          style={{ width:dotWH,height:dotWH,borderRadius:dotWH / 2,marginLeft:i === 0 ? 0 : 5,backgroundColor:this.state.currentIndex === i ? 'red' : 'white' }}
        />
      );
    }
    return (
      <View style={{ justifyContent:'center',alignItems:'center',position:'absolute',bottom:10,left:0,width:this.props.width,height:dotWH }}>
        <View style={{ flexDirection:'row' }}>
          {dotsArray}
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={[{ width:this.props.width,height:this.props.height },this.props.style]}>
        <ScrollView
          ref={ScrollView => (this.scrollView = ScrollView)}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          style={{ width:this.props.width,height:this.props.height }}
          onMomentumScrollEnd={(e) => { this._onMomentumScrollEnd(e); }}
        >
          {this._renderImagesView()}
        </ScrollView>
        {this._renderDotsView()}
      </View>
    );
  }
}
