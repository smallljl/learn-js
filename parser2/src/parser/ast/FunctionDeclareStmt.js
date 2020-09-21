const Stmt = require("./Stmt");
const ASTNodeType = require("./ASTNodeTypes");

class FunctionDeclareStmt extends Stmt {
  constructor(parent){
    super(parent,ASTNodeType.FUNCTION_DECLARE_STME,"func")
  }
}

module.exports = FunctionDeclareStmt;