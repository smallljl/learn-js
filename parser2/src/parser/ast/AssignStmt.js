const Stmt = require("./Stmt");
const ASTNodeTypes = require("./ASTNodeTypes");
const ParseException = require("../utils/ParseException");


class AssignStmt extends Stmt {
  constructor(parent){
    super(parent,ASTNodeTypes.ASSIGN_STMT,"assign")
  }
}


const { Factor,Expr } = require("./index");

AssignStmt.parse = it => {
  const stmt = new AssignStmt();
  const tkn = it.peek();
  const factor = Factor.parse(it);
  if(factor === null){
    throw ParseException.fromToken(tkn);
  }
  stmt.addChild(factor);
  const lexeme = it.nextMatch("=");
  const expr = Expr.parse(null,it);
  stmt.addChild(expr);
  stmt.setLexeme(lexeme);
  return stmt;
}

module.exports = AssignStmt;