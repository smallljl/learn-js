/*
 * @Author: your name
 * @Date: 2020-09-21 17:42:23
 * @LastEditTime: 2020-09-21 17:45:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * 
 * @FilePath: \parser2\src\parser\utils\ParseException.js
 */
class ParseException extends Error{
  constructor(msg){
    super(msg);
  }

  static fromToken(token){
    return new ParseException(`Syntax Error, unexpeted token ${token.getValue()}`);
  }

}

module.exports = ParseException;