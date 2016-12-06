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
  production: false, //推送环境 true 为正式 false 为测试
  enhanced: true,
  debug: true,
}

let service = new apn.Provider(options);

let note = new apn.Notification({
  alert: 'test push, 收到了吗？ by 高翔',
});

note.topic = BUNDLE_ID;

console.log(`Send: ${note.compile()} to ${TOKEN}`);
service.send(note, TOKEN).then( (result) => {
  let sent = result.sent;
  let failed = result.failed;
  console.log('成功: ', result.sent.length);
  console.log('失败: ', result.failed.length);
  console.log(result.failed);
  if(failed.length = 0) {
    console.log('发送成功设备:  ' + result.sent);
  }else {
    console.log('发送失败!');
    console.log(result.failed);
  }
});

service.shutdown();
