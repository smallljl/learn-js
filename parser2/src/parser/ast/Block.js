const Stmt = require("./Stmt");
const ASTNodeType = require("./ASTNodeTypes");
/**
 * @description:语句块 
 * @param {type} 
 * @return {type} 
 */
class Block extends Stmt {
  constructor(){
    super(ASTNodeType.BLOCK,"block")
  }
}

Block.parse = (it) => {
  it.nextMatch("{");
  const block = new Block();  // type label
  let stmt = null;
  while((stmt = Stmt.parse(it)) != null){  // 语法解析
    block.addChild(stmt);
  }
  it.nextMatch("}");
  return block;
}

module.exports = Block;