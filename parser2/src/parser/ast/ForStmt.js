
const Stmt = require("./Stmt");
const ASTNodeType = require("./ASTNodeTypes");

class ForStmt extends Stmt {
  constructor(parent){
    super(parent,ASTNodeType.FOR_STMT,"for")
  }
}

module.exports = ForStmt;