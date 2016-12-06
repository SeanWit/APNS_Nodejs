'use strict';

var fs = require('fs');
var shell = require('shelljs');


// 判断目录是否为空 如果是 返回 yes 如果不是 输出目录下文件
// path 路径
//
function isDirNull(path) {
  fs.readdir(path, function(err, files) {
    if(err) console.log('read dir fail');
    console.log(files);
    if(files.length <= 0) {
      console.log('dir is null');
    } else {
      console.log(files);
    }
  });
}

isDirNull('./node_modules');
