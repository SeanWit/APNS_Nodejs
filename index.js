#!/usr/bin/env node
'use strict';
var apn = require('apn');
var config = require('./config.json');
const TOKEN = config.devicetoken;
const BUNDLE_ID = config.bundle; // App Bundle Id
// 正式推送证书路径
const CERT = config.cert;
const KEY = config.key;
//推送环境
const PRODUCTION = config.production;

let options = {  // 推送服务设置选项
  cert: CERT,
  key: KEY,
  production: PRODUCTION, //推送环境 true 为正式 false 为测试
  enhanced: true,
  debug: true,
}

let service = new apn.Provider(options);

let note = new apn.Notification({
  alert: '推送测试, 收到了吗？收到的话快告诉高翔',
});

note.topic = BUNDLE_ID;

console.log('开始推送 ... ... ')
if(PRODUCTION) {
  console.log('当前推送环境为正式');
} else {
  console.log('当前推送环境为测试');
}

console.log(`推送: ${note.compile()} to ${TOKEN}`);
service.send(note, TOKEN).then( (result) => {
  let sent = result.sent;
  let failed = result.failed;
  console.log('成功: ', result.sent.length);
  console.log('失败: ', result.failed.length);
  if(failed.length == 0) {
    for(var i = 0; i <= result.sent.length; i++) {
      console.log('推送成功设备:  ' + result.sent[i].device);
    }
  }else {
    console.log('推送失败!');
    for(var i = 0; i <= result.failed.length; i++) {
      console.log('失败设备: ' + result.failed[i].device + ' 状态码 ' + result.failed[i].status + ' 失败原因: ' + result.failed[i].response.reason +'\n');
    }
  }
  console.log(result);
});

service.shutdown();
