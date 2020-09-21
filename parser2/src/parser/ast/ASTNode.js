class ASTNode {
  constructor(){
    /**树结构 */
    this.children = [];
    this.parent = _parent;

    /**关键信息 */
    this.lexeme = null;
    this.type = _type;
    this.label = _label;
  }

  getChild(index){
    return this.children[index];
  }

  addChild(node){
    this.children.push(node);
  }

  // 词法单元
  getLexeme(){
    return this.lexeme;
  }
 
  getChildren(){
    return this.children;
  }
}


module.exports = ASTNode;