const ASTNode = require("./ASTNode");
const TokenType = require("../../lexer/TokenType");
const ASTNodeTypes = require("../ast/ASTNodeTypes");
const Variable = require("./Variable");

/**
 * 因子
 */
class Factor extends ASTNode {
  constructor(parent, it){

    super(parent)
    
    this.label = token.getValue();
    this.lexeme = token; // 词法因子
  }
}

module.exports = Factor;

const { Variable } = require("./index");

Factor.parse = (it) => {
  const token = it.peek();
  const type = token.getType();

  if(type === TokenType.VARIABLE){
    it.next();
    return new Variable
  }
}