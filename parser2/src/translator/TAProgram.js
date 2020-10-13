const StaticSymbolTable = require('./symbol/StaticSymbolTable')
const TAInstruction = require('./Instruction')
const TAInstructionType = require('./InstructionType')
const SymbolType = require('./symbol/SymbolType')

// TA = Three Address
class TAProgram {
  constructor(){
    this.instrutions = [];  // 指令集合
    // If
    // For
    this.labelCounter = 0;
    
    this.staticSymbolTable = new StaticSymbolTable();
  }

  add(instruction){
    this.instrutions.push(instruction);
  }

  toString(){
    return this.instrutions.map(x => x.toString()).join("\n");
  }

  addLabel(){
    const label = "L" + this.labelCounter++;
    const instruction = new TAInstruction(
      TAInstructionType.LABEL, null, null, null, null
    );

    this.instrutions.push(instruction);
    return instruction;
  }

  setStaticSymbols(symbolTable){
    for(const symbol of symbolTable.getSymbols()){
      if(symbol.getType() === SymbolType.IMMEDIATE_SYMBOL){
        // 是常量
        this.staticSymbolTable.add(symbol);
      }
    }

    for(const child of symbolTable.getChildren()){
      this.setStaticSymbols(child);
    }
    
  }

  getStaticSymbolTable(){
    return this.staticSymbolTable;
  }
}

module.exports = TAProgram;