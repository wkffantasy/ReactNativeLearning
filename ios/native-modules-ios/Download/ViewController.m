//
//  ViewController.m
//  asdadas
//
//  Created by fantasy on 17/1/11.
//  Copyright © 2017年 fantasy. All rights reserved.
//

#import "ViewController.h"

#import "TYDownLoadDataManager.h"
#import "TYDownLoadUtility.h"
#import "TYDownloadSessionManager.h"

static NSString * const downloadUrl = @"http://baobab.wdjcdn.com/1456117847747a_x264.mp4";

@interface ViewController ()<TYDownloadDelegate>

@property (weak, nonatomic)  UILabel *sizeLabel;
@property (weak, nonatomic)  UILabel *haveDownloadSizeLabel;
@property (weak, nonatomic)  UILabel *speedLabel;
@property (weak, nonatomic)  UILabel *remainTimeLabel;
@property (weak, nonatomic)  UILabel *progressLabel;

@property (weak, nonatomic)  UIProgressView *progressView;

@property (weak, nonatomic)  UIButton *downloadBtn;

@property (nonatomic,strong) TYDownloadModel *downloadModel;

@end

@implementation ViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  
  [self setupUI];
  [TYDownLoadDataManager manager].delegate = self;
  
  [self refreshDowloadInfo];
}
-(void)setupUI{
  
  UILabel * sizeLabel = [[UILabel alloc]init];
  sizeLabel.text= @"文件大小：";
  sizeLabel.frame = CGRectMake(0, 100, 300, 30);
  _sizeLabel = sizeLabel;
  [self.view addSubview:sizeLabel];
  
  UILabel * haveDownloadSizeLabel = [[UILabel alloc]init];
  haveDownloadSizeLabel.text= @"已经完成：";
  haveDownloadSizeLabel.frame = CGRectMake(0, 140, 300, 30);
  _haveDownloadSizeLabel = haveDownloadSizeLabel;
  [self.view addSubview:haveDownloadSizeLabel];
  
  UILabel * speedLabel = [[UILabel alloc]init];
  speedLabel.text= @"下载速度：";
  speedLabel.frame = CGRectMake(0, 180, 300, 30);
  _speedLabel = speedLabel;
  [self.view addSubview:speedLabel];
  
  UILabel * remainTimeLabel = [[UILabel alloc]init];
  remainTimeLabel.text= @"剩余时间：";
  remainTimeLabel.frame = CGRectMake(0, 220, 300, 30);
  _remainTimeLabel = remainTimeLabel;
  [self.view addSubview:remainTimeLabel];
  
  UILabel * progressLabel = [[UILabel alloc]init];
  progressLabel.text= @"当前进度：";
  progressLabel.frame = CGRectMake(0, 260, 300, 30);
  _progressLabel = progressLabel;
  [self.view addSubview:progressLabel];

  UIButton * downloadBtn = [UIButton buttonWithType:UIButtonTypeCustom];
  downloadBtn.frame = CGRectMake(0, 300, 100, 30);
  [downloadBtn setTitle:@"开始下载" forState:UIControlStateNormal];
  [downloadBtn addTarget:self action:@selector(clickbutton:) forControlEvents:UIControlEventTouchUpInside];
  downloadBtn.backgroundColor = [UIColor greenColor];
  _downloadBtn = downloadBtn;
  [self.view addSubview:downloadBtn];
  
}
- (void)clickbutton:(UIButton *)button{
  
  TYDownLoadDataManager *manager = [TYDownLoadDataManager manager];
  
  if (_downloadModel.state == TYDownloadStateReadying) {
    NSLog(@"clickbutton TYDownloadStateReadying");
    [manager cancleWithDownloadModel:_downloadModel];
    return;
  }
  
  if ([manager isDownloadCompletedWithDownloadModel:_downloadModel]) {
    NSLog(@"clickbutton isDownloadCompletedWithDownloadModel");
//    [manager deleteFileWithDownloadModel:_downloadModel];
  }
  
  if (_downloadModel.state == TYDownloadStateRunning) {
    NSLog(@"clickbutton TYDownloadStateRunning");
    [manager suspendWithDownloadModel:_downloadModel];
    return;
  }
  NSLog(@"clickbutton startDownlaod");
  [self startDownlaod];
  
}
- (void)refreshDowloadInfo
{
  // manager里面是否有这个model是正在下载
  _downloadModel = [[TYDownLoadDataManager manager] downLoadingModelForURLString:downloadUrl];
  if (_downloadModel) {
    NSLog(@"refreshDowloadInfo have _downloadModel");
    [self startDownlaod];
    return;
  }
  
  // 没有正在下载的model 重新创建
  TYDownloadModel *model = [[TYDownloadModel alloc]initWithURLString:downloadUrl];
  TYDownloadProgress *progress = [[TYDownLoadDataManager manager]progessWithDownloadModel:model];
  [self changeAllLabelsText:progress];
  [self.downloadBtn setTitle:[[TYDownLoadDataManager manager] isDownloadCompletedWithDownloadModel:model] ? @"下载完成，重新下载":@"开始" forState:UIControlStateNormal];
  _downloadModel = model;
  
  if (!_downloadModel.task && [[TYDownloadSessionManager manager] backgroundSessionTasksWithDownloadModel:_downloadModel]) {
    [self clickbutton:nil];
  }
}
- (void)startDownlaod
{
  TYDownLoadDataManager *manager = [TYDownLoadDataManager manager];
  __weak typeof(self) weakSelf = self;
  [manager startWithDownloadModel:_downloadModel progress:^(TYDownloadProgress *progress) {
    
    [weakSelf changeAllLabelsText:progress];
  
  } state:^(TYDownloadState state, NSString *filePath, NSError *error) {
    if (state == TYDownloadStateCompleted) {
      
    }
    
    [weakSelf.downloadBtn setTitle:[weakSelf stateTitleWithState:state] forState:UIControlStateNormal];
    
    NSLog(@"state %ld error%@ filePath%@",state,error,filePath);
  }];
}
- (void)changeAllLabelsText:(TYDownloadProgress *)progress{
  
  float fileSize = [TYDownloadUtility calculateFileSizeInUnit:(unsigned long long)progress.totalBytesExpectedToWrite];
  NSString * unit = [TYDownloadUtility calculateUnit:(unsigned long long)progress.totalBytesExpectedToWrite];
  NSString * fileSizeString = [NSString stringWithFormat:@"%.2f %@",fileSize,unit];
  
  NSString * leftTime = [NSString stringWithFormat:@"%d秒",progress.remainingTime];
  
  NSString * speed = [NSString stringWithFormat:@"%.2f %@",[TYDownloadUtility calculateFileSizeInUnit:(unsigned long long) progress.speed],[TYDownloadUtility calculateUnit:(unsigned long long)progress.speed]];
  
  NSString * haveDownload = [NSString stringWithFormat:@"%.2f %@",[TYDownloadUtility calculateFileSizeInUnit:(unsigned long long)progress.totalBytesWritten],[TYDownloadUtility calculateUnit:(unsigned long long)progress.totalBytesWritten]];
  
  NSString * persentProgress = [NSString stringWithFormat:@"%.2f%%",progress.progress*100];
  
  self.sizeLabel.text = [NSString stringWithFormat:@"文件大小： %@",fileSizeString];
  self.remainTimeLabel.text = [NSString stringWithFormat:@"剩余时间： %@",leftTime];
  self.speedLabel.text = [NSString stringWithFormat:@"下载速度： %@/秒",speed];
  self.progressLabel.text = [NSString stringWithFormat:@"当前进度：%@",persentProgress];
  self.haveDownloadSizeLabel.text = [NSString stringWithFormat:@"已经完成： %@",haveDownload];
}
- (NSString *)stateTitleWithState:(TYDownloadState)state
{
  switch (state) {
    case TYDownloadStateReadying:
      return @"等待下载";
      break;
    case TYDownloadStateRunning:
      return @"暂停下载";
      break;
    case TYDownloadStateFailed:
      return @"下载失败";
      break;
    case TYDownloadStateCompleted:
      return @"下载完成，重新下载";
      break;
    default:
      return @"开始下载";
      break;
  }
}


@end
