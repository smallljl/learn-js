class ASTNode {
  constructor(_parent=null,_type=null,_label=null){
    /**树结构 */
    this.children = [];   // 子节点
    this.parent = _parent; // 父节点

    /**关键信息 */
    this.lexeme = null;  
    this.type = _type;  // 类型
    this.label = _label; // 展示的值
  }

  getChild(index){
    return this.children[index];
  }

  addChild(node){
    this.children.push(node);
  }

  // 词法单元
  getLexeme(){
    return this.lexeme;   // 词法单元的具体信息
  }
 
  getChildren(){
    return this.children;
  }

  print(indent = 0){
    console.log(`${"".padStart(indent*2, " ")} ${this.label}`);
    this.children.forEach(x=>x.print(indent+1));
  }
}


module.exports = ASTNode;