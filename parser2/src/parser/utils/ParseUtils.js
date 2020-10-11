const ASTNodeTypes = require("../ast/ASTNodeTypes");
const { Factor } = require("c:/users/16824/desktop/romantics-master/romantics/tinyscript/js/src/parser/ast");
const ParserUtils = require("c:/users/16824/desktop/romantics-master/romantics/tinyscript/js/src/parser/util/parserutils");

class ParseUtils {
  
  // postfix 后缀
  // prefix 前缀
  // 1 2 3 + +
  static toPostfixExpression(node){
    // node (left , op , right)
    // left right op
    if(node instanceof Factor){
      return node.getLexeme().getValue();
    }

    const prts = [];
    for(let child of node.getChildren()){
      prts.push(ParserUtils.toPostfixExpression(child));
    }

    const lexemeStr = node.getLexeme() != null ? 
      node.getLexeme().getValue() : "";

    if(lexemeStr.length > 0){
      return prts.join(" ") + " " + lexemeStr;
    } else {
      return prts.join(" ");
    }

  }

  /**
   * 
   * @param {广度搜索优先} root 
   * @param {*} max 
   */
  static toBFSString(root,max){
    const queue = new LinkedList();
    const list = [];
    queue.push(root);

    let c = 0;
    //      a
    //   b     c
    // d   e  f   g
    while(queue.length > 0 && c++ < max){ // c 控制数量
      const node = queue.shift();
      list.push(node.getLabel());
      for(const child of node.getChildren()){
        queue.push(child);
      }
    }

    return list.join(" ");
  }
}

module.exports = ParseUtils;