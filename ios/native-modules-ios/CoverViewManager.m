//
//  CoverViewManager.m
//  ReactNativeLearning
//
//  Created by fantasy on 17/2/4.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "CoverViewManager.h"

@interface CoverViewManager ()

@property (weak, nonatomic) UIView * view;

@end

@implementation CoverViewManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  if (_view == nil) {
    
    UIView * view = [[UIView alloc]initWithFrame:[UIScreen mainScreen].bounds];
    view.backgroundColor = [UIColor clearColor];
    [[UIApplication sharedApplication].keyWindow addSubview:view];
    _view = view;
    
  }
  return _view;
}

RCT_EXPORT_METHOD(showCoverView:(RCTResponseSenderBlock)callback) {
  
}

RCT_EXPORT_METHOD(hideCoverView) {
  if (_view != nil) {
    [_view removeFromSuperview];
    _view = nil;
  }
}

@end
