
const Stmt = require("./Stmt");
const ASTNodeType = require("./ASTNodeTypes");

class ForStmt extends Stmt {
  constructor(){
    super(ASTNodeType.FOR_STMT,"for")
  }
}

module.exports = ForStmt;