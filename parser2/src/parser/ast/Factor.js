/*
 * @Author: your name
 * @Date: 2020-09-21 15:42:06
 * @LastEditTime: 2020-09-21 17:56:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edite
 * @FilePath: \parser2\src\parser\ast\Factor.js
 */
const ASTNode = require("./ASTNode");
const TokenType = require("../../lexer/TokenType");
const ASTNodeTypes = require("../ast/ASTNodeTypes");

/**
 * 因子
 */
class Factor extends ASTNode {
  constructor(parent, it){
    super(parent)

    const token = it.next();
    let type = token.getType();
    if(type === TokenType.VARIABLE){
      this.type = ASTNodeTypes.VARIABLE;
    } else {
      this.type = ASTNodeTypes.SCALAR;
    }

    this.label = token.getValue();
    this.lexeme = token; // 词法因子
  }
}

module.exports = Factor;