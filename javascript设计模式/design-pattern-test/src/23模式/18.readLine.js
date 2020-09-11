// stream 用到自定义事件
const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
    input:fs.createReadStream("./file.text")
});

let lineNum = 0;

rl.on("line",function(line){
    lineNum++;
});

rl.on("close",function(){
    console.log("lineNum",lineNum);
});