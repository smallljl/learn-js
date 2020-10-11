const Expr = require('./Expr')
const ASTNodeTypes = require("./ASTNodeTypes")
class CallExpr extends Expr {
    constructor() {
        super()
        this.type = ASTNodeTypes.CALL_EXPR
        this.label = "call"
    }

}

module.exports = CallExpr 

CallExpr.parse = (factor, it) => {
    const expr = new CallExpr()
    expr.addChild(factor); //  不理解

    it.nextMatch("(")
    let p = null
    while((p = Expr.parse(it)) != null) {
        expr.addChild(p);
        // peek 下一个值  保存到back里面
        if(!it.peek().getValue() === ")") {  // 
            it.nextMatch(",")
        }
    }
    it.nextMatch(")")
    return expr
}
