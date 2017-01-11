//
//  DownloadToolManager.m
//  ReactNativeLearning
//
//  Created by fantasy on 17/1/11.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "DownloadToolManager.h"

#import "TYDownLoadDataManager.h"
#import "TYDownLoadUtility.h"
#import "TYDownloadSessionManager.h"

@interface DownloadToolManager ()<TYDownloadDelegate>

@end

@implementation DownloadToolManager

- (instancetype)init{
  
  self = [super init];
  if (self) {
    
  }
  return self;
  
}

RCT_EXPORT_MODULE();




@end
