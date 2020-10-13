const SymbolType = require("./SymbolType");

class Symbol {  // 符号
    constructor(type){
        this.type = type;
        this.label = null;
        this.offset = 0; // 偏移地址
        this.layerOffset = 0;   // 层级作用域
        this.lexeme = null; // 词法
        this.parent = null;
    }

    

    static createAddressSymbol(lexeme, offset){
        let symbol = new Symbol(SymbolType.ADDRESS_SYMBOL)
        symbol.lexeme = lexeme;
        symbol.offset = offset;
        return symbol;
    }

    // 常量区的数
    static createImmediateSymbol(lexeme){
        let symbol = new Symbol(SymbolType.IMMEDIATE_SYMBOL);
        symbol.lexeme = lexeme;
        return symbol;
    }

    static createLabelSymbol(label, lexeme){
        let symbol = new Symbol(SymbolType.LABEL_SYMBOL);
        symbol.label = label;
        symbol.lexeme = lexeme;
        return symbol;
    }

    copy(){
        var symbol = new Symbol(this.type);
        symbol.lexeme = this.lexeme;
        symbol.label = this.label;
        symbol.offset = this.offset;
        symbol.layerOffset = this.layerOffset;
        return symbol;
    }

    setParent(parent){
        this.parent = parent;
    }

    setOffset(offset){
        this.offset = offset;
    }

    setLexeme(lexeme){
        this.lexeme = lexeme;
    }

    getOffset(){
        return this.offset;
    }

    getLexeme(){
        return this.lexeme;
    }

    setLayerOffset(offset){
        this.layerOffset = offset;
    }

    getLayerOffset(){
        return this.layerOffset;
    }

    toString(){
        if(this.type === SymbolType.LABEL_SYMBOL){
            return this.label;  // 是标签直接返回
        }
        // 常量区  和 地址区
        return this.lexeme.getValue();  // 返回词法的label(词法是对象)
    }
}

module.exports = Symbol;