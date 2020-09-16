const TokenType = require("./TokenType");
const AlphabetHelper = require("./AlphabetHelper");

const Keywords = new Set([
  "var",
  "if",
  "else",
  "for",
  "while",
  "break",
  "func",
  "return"
])

class Token {
  constructor(type,value){
    this._type = type;
    this._value = value;
  }

  getType(){
    return this._type;
  }

  getValue(){
    return this._value;
  }

  isVariable(){
    return this._type === TokenType.VARIABLE;
  }

  isScalar(){
    return this._type === TokenType.INTEGER ||
      this._type === TokenType.FLOAT || 
      this._type === TokenType.STRING ||  
      this._type === TokenType.BOOLEAN;
  }

  toString(){
    return `type ${this._type},value ${this._value}`;
  }

  /*
   * 关键字的处理
   */
  static makeVarOrKeyWord(it){
    let s = "";
    while(it.hasNext()){
      const c = it.peek();
      if(AlphabetHelper.isLetter(c)){
        s +=c ;
      } else {
        break;
      }
      // 不变式
      it.next();
    }
    if(Keywords.has(s)){
      return new Token(TokenType.KEYWORD, s);
    }

    if(s === "true" || s === "false"){
      return new Token(TokenType.BOOLEAN, s);
    }

    return new Token(TokenType.VARIABLE,s);
  }
  
}

module.exports = Token;