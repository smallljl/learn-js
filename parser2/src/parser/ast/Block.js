const Stmt = require("./Stmt");
const ASTNodeType = require("./ASTNodeTypes");
/**
 * @description:语句块 
 * @param {type} 
 * @return {type} 
 */
class Block extends Stmt {
  constructor(parent){
    super(parent,ASTNodeType.BLOCK,"block")
  }
}

module.exports = Block;