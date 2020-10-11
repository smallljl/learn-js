const ASTNodeTypes = require('./ASTNodeTypes')
const {Stmt} = require('./index')
class DeclareStmt extends Stmt {
    constructor() {
        super(ASTNodeTypes.DECLARE_STMT, 'declare')
    }

}

module.exports = DeclareStmt;

const {Factor, Expr} = require('./index')

DeclareStmt.parse = (it) => {
    const stmt = new DeclareStmt()
    it.nextMatch("var")
    const tkn = it.peek()
    const factor = Factor.parse(it); // 返回因子
    if(factor == null) {
        throw ParseException.fromToken(tkn); //报错
    }
    stmt.addChild(factor)
    const lexeme = it.nextMatch("=")
    const expr = Expr.parse(it)
    stmt.addChild(expr)
    stmt.setLexeme(lexeme); // 赋值并添加表达式
    return stmt
}