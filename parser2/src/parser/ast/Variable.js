/*
 * @Author: your name
 * @Date: 2020-09-21 15:43:36
 * @LastEditTime: 2020-09-21 17:57:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \parser2\src\parser\Variable.js
 */
const Factor = require("./Factor");

class Variable extends Factor {
  constructor(parent,it){
    super(parent,it);
  }
}

module.exports = Variable;