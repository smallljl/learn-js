const ASTNodeTypes = require("./ASTNodeTypes");

class ASTNode {
  constructor(_parent=null,_type=null,_label=null){
    /**树结构 */
    this.children = [];   // 子节点
    this.parent = _parent; // 父节点

    /**关键信息 */
    this.lexeme = null;  
    this.type = _type;  // 类型
    this.label = _label; // 展示的值

    /**属性 */
    this._props = {};
  }

  getChild(index){
    if(!this.children[index]) { return null; }
    return this.children[index];
  }

  addChild(node){
    node.parent = this;
    this.children.push(node);
  }

  getLabel(){
    return this.label;
  }

  // 词法单元
  getLexeme(){
    return this.lexeme;   // 词法单元的具体信息
  }

  getType(){
    return this.type;
  }
 
  getChildren(){
    return this.children;
  }

  /**
   * 判断是否是变量还是标量
   */
  isValueType(){
    return this.type === ASTNodeTypes.VARIABLE || this.type === ASTNodeTypes.SCALAR;
  }

  print(indent = 0){
    console.log(`${"".padStart(indent*2, " ")} ${this.label}`);
    this.children.forEach(x=>x.print(indent+1));
  }

  setProp(key,value){
    this._props[key] = value;
  }

  getProps(key){
    if(this._props[key] === undefined){
      return null;
    }
    return this._props[key];
  }
}


module.exports = ASTNode;