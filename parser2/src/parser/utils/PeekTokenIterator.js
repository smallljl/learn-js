/*
 * @Author: your name
 * @Date: 2020-09-21 17:45:45
 * @LastEditTime: 2020-09-22 09:19:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \parser2\src\parser\utils\PeekTokenIterator.js
 */
const PeekIterator = require("../../common/PeekIterator");
const ParseException = require("./ParseException");

class PeekTokenItertor extends PeekIterator{
  constructor(it){
    super(it);
  }

  nextMatch(value){
    var token = this.next();
    if(token.getValue() !== value){
      throw ParseException.fromToken(token);
    }
    return token;
  }

  nextMatch1(type){
    var token = this.next();
    if(token.getType() !== type){
      throw ParseException.fromToken(token);
    }
    return token;
  }
  
}

module.exports = PeekTokenItertor;
