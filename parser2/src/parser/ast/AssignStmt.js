const Stmt = require("./Stmt");
const ASTNodeType = require("./ASTNodeTypes");

class AssignStmt extends Stmt {
  constructor(parent){
    super(parent,ASTNodeType.ASSIGN_STMT,"assignStmt")
  }
}

module.exports = AssignStmt;