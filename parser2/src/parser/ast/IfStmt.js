const Stmt = require("./Stmt");
const ASTNodeType = require("./ASTNodeTypes");

class IfStmt extends Stmt {
  constructor(parent){
    super(parent,ASTNodeType.IF_STMT,"ifStmt")
  }
}

module.exports = IfStmt;