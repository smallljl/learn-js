const Stmt = require("./Stmt");
const ASTNodeType = require("./ASTNodeTypes");

class DeclareStmt extends Stmt {
  constructor(parent){
    super(parent,ASTNodeType.DeclareStmt,"declare")
  }
}

module.exports = DeclareStmt;