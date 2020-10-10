const ASTNodeTypes = require("../ast/ASTNodeTypes");

class ParseUtils {
  
  // postfix 后缀
  // prefix 前缀
  static toPostfixExpression(astNode){
    // node (left , op , right)
    // left right op
    switch(astNode.type){
      case ASTNodeTypes.BINARY_EXPR:
        return `${ParseUtils.toPostfixExpression(astNode.getChild(0))} ${ParseUtils.toPostfixExpression(astNode.getChild(1))} ${astNode.lexeme.getValue()}`;
      case ASTNodeTypes.VARIABLE:
      case ASTNodeTypes.SCALAR:
        return astNode.lexeme.getValue();
    }

    throw "not impl."
  }

  static prefixExpresion(astNode){

  }
}

module.exports = ParseUtils;