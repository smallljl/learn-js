const Token = require('../../lexer/Token');
const TokenType = require('../../lexer/TokenType');
const Symbol = require('./Symbol');

class SymbolTable {
    constructor(){
        this.parent = null;
        this.children = [];
        this.symbols = [];
        this.tempIndex = 0;
        this.offsetIndex = 0;
        this.level = 0;
    }
    
    /**
     * 创建临时变量
     */
    createVariable(){
        // type value
        let lexeme = new Token(TokenType.VARIABLE, "p" + this.tempIndex ++)
        let symbol = Symbol.createAddressSymbol(lexeme,this.offsetIndex++)
        this.addSymbol(symbol);
        return symbol;
    }

    createLabel(label, lexeme){
        let labelSymbol = Symbol.createLabelSymbol(label,lexeme);
        this.addSymbol(labelSymbol);
    }
    
    /**
     * 
     * @param {判断符号是否存在符号表}} lexeme 
     */
    exists(lexeme){
        let symbol = this.symbols.find(x => 
                x.lexeme.getValue() === lexeme.getValue()
            )
        
        if(symbol){
            return true;
        }

        if(this.parent != null){
            return this.parent.exists(lexeme);
        }

        return false;
    }


    /**
     * 克隆symboltable 中的 symbol 并标识所在层级
     * @param {*} lexeme 
     * @param {*} layerOffset 
     */
    cloneFromSymbolTree(lexeme, layerOffset){
        let symbol = this.symbols.find(x => x.lexeme.getValue() === lexeme.getValue());

        if(symbol){
            symbol = symbol.copy();
            symbol.getLayerOffset(layerOffset);
            return symbol;
        }

        if(this.parent != null){
            return this.parent.cloneFromSymbolTree(lexeme,layerOffset+1);
        }

        return null;

    }

    /**
     * 通过lexeme 创建symbol
     * @param {}} lexeme 
     */
    createSymbolByLexeme(lexeme){
        let symbol = null;
        if(lexeme.isScalar()){
            Symbol.createImmediateSymbol(lexeme);
        } else {
            symbol = this.cloneFromSymbolTree(lexeme,0);   // 父级没有找到就新建
            if(symbol == null){
                symbol = Symbol.createAddressSymbol(lexeme,this.offsetIndex++);
            }
        }
        this.addSymbol(symbol);
        return symbol;
    }

    /**
     * 栈中有几个元素
     */
    localSize(){
        return this.offsetIndex;
    }

    /**
     * 
     * @param {添加符号} symbol 
     */
    addSymbol(symbol){
        this.symbols.push(symbol);
        symbol.setParent(this);
    }


    addChild(child){
        child.parent = this;
        child.level = this.level + 1;
        this.children.push(child);
    }

    getSymbols(){
        return this.symbols;
    }

    getChilden(){
        return this.children; 
    }

}

module.exports = SymbolTable;