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

@property (nonatomic,strong) TYDownloadModel *downloadModel;

@property (nonatomic,copy)RCTResponseSenderBlock callBackDownloading;
@property (nonatomic,copy)RCTResponseSenderBlock callBackDownloadError;
@property (nonatomic,copy)RCTResponseSenderBlock callBackDownloadComplete;

@end

@implementation DownloadToolManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(beganDownload:(NSString *)url
                  path:(NSString*)path
                  downloading:(RCTResponseSenderBlock)callBackDownloading
                  complete:(RCTResponseSenderBlock)callBackComplete
                  error:(RCTResponseSenderBlock)callBackError)
{
  _downloadModel = [[TYDownLoadDataManager manager] downLoadingModelForURLString:url];
  
  _callBackDownloading = callBackDownloading;
  _callBackDownloadError = callBackError;
  _callBackDownloadComplete = callBackComplete;
  
  if (_downloadModel) {
    NSLog(@"当前的url已经在下载列表中了 url==%@",url);
    [self startDownlaod];
    return;
  }
  
  _downloadModel = [[TYDownloadModel alloc]initWithURLString:url];
  TYDownloadProgress *progress = [[TYDownLoadDataManager manager]progessWithDownloadModel:_downloadModel];
  [self callBackDownloadingProgress:progress];
  [self startDownlaod];
}
- (void)callBackDownloadingProgress:(TYDownloadProgress*)progress{
  
}
- (void)startDownlaod{
  
}




@end
