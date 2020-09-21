/*
 * @Author: your name
 * @Date: 2020-09-21 15:43:36
 * @LastEditTime: 2020-09-21 17:58:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \parser2\src\parser\Variable.js
 */
const Factor = require("./Factor");

class Scalar extends Factor {
  constructor(parent,it){
    super(parent,it)
  }
}

module.exports = Scalar;