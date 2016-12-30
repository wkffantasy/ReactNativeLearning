//
//  DeviceInfoManager.m
//  ReactNativeLearning
//
//  Created by fantasy on 16/12/28.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "DeviceInfoManager.h"

#import <AdSupport/ASIdentifierManager.h>
#import <CoreTelephony/CTCarrier.h>
#import <CoreTelephony/CTTelephonyNetworkInfo.h>

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

#pragma 获取  手机DeviceId  设备的唯一标示符
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
#pragma 获取手机设备的信息
RCT_EXPORT_METHOD(getDeviceInfo:(RCTResponseSenderBlock)callback)
{
  if (callback) {
    UIDevice * device = [[UIDevice alloc] init];
    callback(@[
               device.name,
               device.model,
               device.localizedModel,
               device.systemName,
               device.systemVersion,
               ]);
  }
}

#pragma 获取当前屏幕分辨率的信息
RCT_EXPORT_METHOD(getDeviceScreenResolution:(RCTResponseSenderBlock)callback)
{
  if (callback) {
    CGRect rect = [[UIScreen mainScreen] bounds];
    CGFloat scale = [[UIScreen mainScreen] scale];
    CGFloat width = rect.size.width * scale;
    CGFloat height = rect.size.height * scale;
    callback(@[
               [NSString stringWithFormat:@"%f",width],
               [NSString stringWithFormat:@"%f",height],
               ]);
  }
}
#pragma 获取运营商的信息
RCT_EXPORT_METHOD(getDeviceCarrier:(RCTResponseSenderBlock)callback)
{
  
  CTTelephonyNetworkInfo *info = [[CTTelephonyNetworkInfo alloc] init];

  CTCarrier *carrier = [info subscriberCellularProvider];
  //获取运行商的名称
  NSString *mCarrier = [NSString stringWithFormat:@"%@",[carrier carrierName]];
  /*
   获取当前网络的类型
   CTRadioAccessTechnologyGPRS      	//介于2G和3G之间，也叫2.5G ,过度技术
   CTRadioAccessTechnologyEdge       	//EDGE为GPRS到第三代移动通信的过渡，EDGE俗称2.75G
   CTRadioAccessTechnologyWCDMA
   CTRadioAccessTechnologyHSDPA        	//亦称为3.5G(3?G)
   CTRadioAccessTechnologyHSUPA        	//3G到4G的过度技术
   CTRadioAccessTechnologyCDMA1x   	//3G
   CTRadioAccessTechnologyCDMAEVDORev0    //3G标准
   CTRadioAccessTechnologyCDMAEVDORevA
   CTRadioAccessTechnologyCDMAEVDORevB
   CTRadioAccessTechnologyeHRPD     	//电信使用的一种3G到4G的演进技术， 3.75G
   CTRadioAccessTechnologyLTE   		//接近4G
   */
  NSString *mConnectType = [[NSString alloc] initWithFormat:@"%@",info.currentRadioAccessTechnology];
  if (callback) {
    callback(@[
               mCarrier,
               mConnectType,
               ]);
  }

}
#pragma 获取电池的相关信息
RCT_EXPORT_METHOD(getDeviceBatteryStatus:(RCTResponseSenderBlock)callback)
{
  if (callback) {
    callback(@[
               [self getBatteryState],
               [NSString stringWithFormat:@"%f",[self getBatteryLevel]],
               ]);
  }
}
-(NSString*)getBatteryState {
  UIDevice *device = [UIDevice currentDevice];
  if (device.batteryState == UIDeviceBatteryStateUnknown) {
    return @"UnKnow";
  }else if (device.batteryState == UIDeviceBatteryStateUnplugged){
    return @"Unplugged";
  }else if (device.batteryState == UIDeviceBatteryStateCharging){
    return @"Charging";
  }else if (device.batteryState == UIDeviceBatteryStateFull){
    return @"Full";
  }
  return nil;
}
//获取电量的等级，0.00~1.00
-(float) getBatteryLevel {
  return [UIDevice currentDevice].batteryLevel;
}

#pragma app打开一个网页
RCT_EXPORT_METHOD(openWeb:(NSString*)webString
                  callBack:(RCTResponseSenderBlock)callback)
{
  NSLog(@"openWeb webString==%@",webString);
  [self openURL:webString callBack:callback];
  
}
- (void)openURL:(NSString*)string callBack:(RCTResponseSenderBlock)callback{
  if (string.length==0) {
    return;
  }
  NSURL * url =[NSURL URLWithString:string];
  BOOL canOpen = [[UIApplication sharedApplication] canOpenURL:url];
  if (canOpen) {
    [[UIApplication sharedApplication] openURL:url];
  } else {
    callback(@[@"can not open this",string]);
  }
  
}

#pragma app打开另一个app
/*
 [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"tel://10086"]];
 [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"mailto://devprograms@apple.com"]];
 [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"sms://10086"]];
 */
RCT_EXPORT_METHOD(openAnotherApp:(NSString*)appString
                  callBack:(RCTResponseSenderBlock)callback)
{
  NSLog(@"openAnotherApp webString==%@",appString);
  [self openURL:appString callBack:callback];

}

@end
