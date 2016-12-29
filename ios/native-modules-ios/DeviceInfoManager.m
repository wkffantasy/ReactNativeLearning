//
//  DeviceInfoManager.m
//  ReactNativeLearning
//
//  Created by fantasy on 16/12/28.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "DeviceInfoManager.h"
#import <AdSupport/ASIdentifierManager.h>

@implementation DeviceInfoManager

RCT_EXPORT_MODULE();

#pragma 获取手机通知打开状态  以及 打开手机设置
RCT_EXPORT_METHOD(getAppNotificationStatus:(RCTResponseSenderBlock)callback)
{
  if (!callback) {
    return;
  }
  if ([[UIDevice currentDevice].systemVersion floatValue]>=8.0f) {
    UIUserNotificationSettings *setting = [[UIApplication sharedApplication] currentUserNotificationSettings];
    
    if (UIUserNotificationTypeNone == setting.types) {
      callback(@[@"false"]);
    }else{
      callback(@[@"true"]);
    }
  }else{
    UIRemoteNotificationType type = [[UIApplication sharedApplication] enabledRemoteNotificationTypes];
    if(UIRemoteNotificationTypeNone == type){
      callback(@[@"false"]);
    }else{
      callback(@[@"true"]);
    }
  }
  
  
}
RCT_EXPORT_METHOD(openAppSettingNotification){
  [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString]];
}

#pragma 获取手机DeviceId
RCT_EXPORT_METHOD(getDeviceId:(RCTResponseSenderBlock)callback) {
  NSString *ret = [self identifierForAdvertising];
  if (callback) {
    if (ret) {
      callback(@[@"true",ret]);
    }else {
      callback(@[@"false",@"User refused to give idfa"]);
    }
  }
}
- (NSString *)identifierForAdvertising
{
  if([[ASIdentifierManager sharedManager] isAdvertisingTrackingEnabled])
  {
    NSUUID *IDFA = [[ASIdentifierManager sharedManager] advertisingIdentifier];
    
    return [IDFA UUIDString];
  }
  
  return nil;
}



@end
