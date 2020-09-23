/*
 * @Author: your name
 * @Date: 2020-09-21 15:49:29
 * @LastEditTime: 2020-09-23 16:28:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit  
 * @FilePath: \parser2\src\parser\ast\Expr.js
 */
const ASTNode = require("./ASTNode");
const ASTNodeTypes = require("./ASTNodeTypes");
const table = require("../utils/PriorityTable");

class Expr extends ASTNode {
  constructor(parent){
    super(parent)
  }

  static fromToken(parent, type, token){
    const expr = new Expr(parent);
    expr.label = token.getValue();
    expr.lexeme = type;
    return expr;
  }

  /**
   * 
   * left E(k) -> E(k) op(k) E(k+1) | E(k+1) 
   * right :
   *    E(k) -> E(k+1) E_(k);
   *    // var e = new Expr(); e.lefet = E(k+1); e.right = E_(k).child(0)
   *    // combine 合并
   *    E_(k) -> op(k) E(k+1) E_(k) | ε
   *    // race 竞争
   *    
   *    
   *    // U -> (E) | ++E | --E
   *    E(t) -> F 因子 E_(t) | U 一元表达式 E_(t)
    * @description:
   * @param {type} 
   * @return {type} 
   */
  static parseExpr(parent,it){
    return Expr.E(it,0);
  }

  static E(parent, it, k){
    if(k < table.length -1){
      return Expr.combine(it,
        ()=>Expr.E(it,k+1),
        ()=>Expr.E_(it,k)
      )
    } else {
      return Expr.race(
        it,
        ()=> 
          Expr.combine(
            it,
            ()=>Expr.F(it),
            ()=>Expr.E_(it,k)
          ),
        ()=>
          Expr.combine(
            it,
            ()=>Expr.U(it),
            ()=>Expr.E_(it,k)
          ),
        ()=>
          Expr.combine(
            it,
            ()=>Expr.U(it),
            ()=>Expr.E_(it,k)
          )
      );
    }
  }

  static E_(parent, it, k){
    const token = it.peek();
    const value = token.getValue();

    if(table[k].indexOf(value) !== -1){
      it.nextMatch(value);
      const expr = Expr.fromToken(ASTNodeTypes.BINARY_EXPR, token);
      expr.addChild(
        Expr.combine(
          it,
          ()=> Expr.E(it, k + 1),
          ()=> Expr.E_(it, k, it)
        )
      );

      return expr;
    }

    return null;
  }

  static F(parent, it){
    const factor = Factor.parse(it);
    if(factor === null){
      return null;
    }
    if(it.hasNext() && it.peek().getValue() === "("){
      return CallExpr.parse(factor, it);
    }
    return factor;
  }

  static U(parent, it){
    const token = it.peek();
    const value = token.getValue();

    if(value === "("){
      it.nextMatch("(");
      const expr = Expr.parse(it);
      it.nextMatch(")");
      return expr;
    } else if(value === "++" || value === "--" || value === "!"){
      const t = it.peek();
      it.nextMatch(value);

      const expr = Expr.fromToken(ASTNodeTypes.UNARY_EXPR, t);
      expr.addChild(Expr.parse(it));
      return expr;
    }

    return null;
  }

  static combine(it,funcA,funcB){
    if(it.hasNext()){
      return null;
    }
    const a = funcA();
    if(a === null){
      return it.hasNext() ? funcB() : null;
    }

    const b = it.hasNext() ? funcB() : null;
    if(b === null){
      return a;
    }

    const expr = new Expr(parent,ASTNodeTypes.BINARY_EXPR, b.lexeme);
    expr.addChild(a);
    expr.addChild(b.getChild(0));
    return expr;

  }

  static race(it,funcA,funcB){
    if(!it.hasNext()){
      return null;
    }
    const a = funcA();
    if(a === null){
      return funcB();
    }
  }
}

module.exports = Expr;
