//
//  RecordFileToMp3Manger.m
//  ReactNativeLearning
//
//  Created by fantasy on 17/2/7.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "RecordFileToMp3Manger.h"

#import "lame.h"

@implementation RecordFileToMp3Manger

RCT_EXPORT_MODULE();

/*
 RCT_EXPORT_METHOD(prepareRecordingAtPath:(NSString *)path sampleRate:(float)sampleRate channels:(nonnull NSNumber *)channels quality:(NSString *)quality encoding:(NSString *)encoding meteringEnabled:(BOOL)meteringEnabled)*/

RCT_EXPORT_METHOD(beganTransformFilePath:(NSString *)filePath
                  destinationPath:(NSString *)mp3Path
//                  transforming:(RCTResponseSenderBlock)transformingCallBack
                  finished:(RCTResponseSenderBlock)finishedCallBack
                  error:(RCTResponseSenderBlock)errorCallBack){
  NSLog(@"11111111");
  NSLog(@"filePath ==%@",filePath);
  NSLog(@"mp3Path ==%@",mp3Path);
  NSLog(@"finishedCallBack ==%@",finishedCallBack);
  NSLog(@"errorCallBack ==%@",errorCallBack);
//  NSLog(@"transformingCallBack ==%@",transformingCallBack);

  
  @try {
    int read, write;
    
    FILE *pcm = fopen([filePath cStringUsingEncoding:1], "rb");  //source 被转换的音频文件位置
    fseek(pcm, 4*1024, SEEK_CUR);                                   //skip file header
    FILE *mp3 = fopen([mp3Path cStringUsingEncoding:1], "wb");  //output 输出生成的Mp3文件位置
    
    const int PCM_SIZE = 8192;
    const int MP3_SIZE = 8192;
    short int pcm_buffer[PCM_SIZE*2];
    unsigned char mp3_buffer[MP3_SIZE];
    
    lame_t lame = lame_init();
    lame_set_num_channels(lame, 2);//设置1为单通道，默认为2双通道
    lame_set_in_samplerate(lame, 8000.0);//11025.0
    //lame_set_VBR(lame, vbr_default);
    lame_set_brate(lame, 16);
    lame_set_mode(lame, 3);
    lame_set_quality(lame, 2);
    lame_init_params(lame);
    
    do {
      read = fread(pcm_buffer, 2*sizeof(short int), PCM_SIZE, pcm);
      if (read == 0)
        write = lame_encode_flush(lame, mp3_buffer, MP3_SIZE);
      else
        write = lame_encode_buffer_interleaved(lame, pcm_buffer, read, mp3_buffer, MP3_SIZE);
      
      fwrite(mp3_buffer, write, 1, mp3);
      
    } while (read != 0);
    
    lame_close(lame);
    fclose(mp3);
    fclose(pcm);
  }
  @catch (NSException *exception) {
    NSLog(@"%@",[exception description]);
    errorCallBack(@[[exception description]]);
  }
  @finally {
    
    NSLog(@"MP3生成成功: %@",mp3Path);
    finishedCallBack(@[
                       mp3Path
                       ]);
  }
  
}

@end
