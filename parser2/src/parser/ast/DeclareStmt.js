const Stmt = require("./Stmt");
const ASTNodeType = require("./ASTNodeTypes");

class DeclareStmt extends Stmt {
  constructor(parent){
    super(parent,ASTNodeType.DeclareStmt,"deClareStmt")
  }
}

module.exports = DeclareStmt;