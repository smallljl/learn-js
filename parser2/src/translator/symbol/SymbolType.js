const Enum = require("../../common/Enum");

module.exports = {
    ADDRESS_SYMBOL: new Enum("ADDRESS_SYMBOL", 1),  // 地址
    IMMEDIATE_SYMBOL : new Enum("IMMEDIATE_SYMBOL", 2), // 立即数
    LABEL_SYMBOL: new Enum("LABEL_SYMBOL", 3) // goto 标签语句
}