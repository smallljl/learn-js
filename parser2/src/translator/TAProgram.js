const StaticSymbolTable = require('./symbol/StaticSymbolTable');
const TAInstruction = require('./Instruction');
const TAInstructionType = require('./InstructionType');
const SymbolType = require('./symbol/SymbolType');

// TA = Three Address
class TAProgram {
  constructor(){
    this.instrutions = [];  // 指令集合
    // If
    // For
    this.labelCounter = 0;  // 标签数量
    
    this.staticSymbolTable = new StaticSymbolTable();  // 静态table
  }

  add(instruction){
    this.instrutions.push(instruction);
  }

  getInstructions(){
    return this.instrutions;
  }

  toString(){
    return this.instrutions.map(x => x.toString()).join("\n");
  } 

  addLabel(){
    const label = "L" + this.labelCounter++;
    const instruction = new TAInstruction(
      TAInstructionType.LABEL, null, null, label, null
    );

    this.instrutions.push(instruction);
    return instruction;
  }


  // 设置常量的symbol
  /**
   * @description: 讲常量添加到常量表中
   * @param {type} 
   * @return {type} 
   */
  setStaticSymbols(symbolTable){
    for(const symbol of symbolTable.getSymbols()){
      if(symbol.getType() === SymbolType.IMMEDIATE_SYMBOL){
        // 是常量
        this.staticSymbolTable.add(symbol);
      }
    }

    // 帮childTable也添加到常量中
    for(const child of symbolTable.getChildren()){
      this.setStaticSymbols(child);
    }
    
  }

  getStaticSymbolTable(){
    return this.staticSymbolTable; 
  }
}

module.exports = TAProgram;