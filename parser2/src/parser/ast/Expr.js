/*
 * @Author: your name
 * @Date: 2020-09-21 15:49:29
 * @LastEditTime: 2020-09-22 11:21:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit  
 * @FilePath: \parser2\src\parser\ast\Expr.js
 */
const ASTNode = require("./ASTNode");
const ASTNodeTypes = require("./ASTNodeTypes");

class Expr extends ASTNode {
  constructor(parent){
    super(parent)
  }

  static fromToken(parent, type, token){
    const expr = new Expr(parent);
    expr.label = 
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

  }

  static E(parent, it, k){

  }

  static E_(parent, it, k){

  }

  static F(parent, it){

  }

  static U(parent, it){
    
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
