const TokenType = require("./TokenType");
const AlphabetHelper = require("./AlphabetHelper");
const LexicalException = require("./LexicalException");

const Keywords = new Set([
  "var",
  "if",
  "else",
  "for",
  "while",
  "break",
  "func",
  "return"
]);

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

  isValue(){
    return  this.isScalar() || this.isVariable();
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
      const c = it.peek();  // 将改元素添加到栈里面
      if(AlphabetHelper.isLiteral(c)){
        s +=c ;
      } else {
        break;
      }
      // 不变式  吃掉peek c
      it.next();
    }
    if(Keywords.has(s)){
      return new Token(TokenType.KEYWORD, s);
    }

    if(s === "true" || s === "false"){
      return new Token(TokenType.BOOLEAN, s);
    }

    return new Token(TokenType.VARIABLE, s);
  }

  /**
   * 提取字符串
   * @param {*} it 
   */
  static makeString(it){
    let s = "";
    let state = 0;
    while(it.hasNext()){
      let c = it.next();
      switch(c){
        case 0:
          if(c === '"'){
            state = 1;
          } else {
            state = 2;
          }
          s+=c;
          break;
        case 1:
          if(c === '"'){
            return new Token(TokenType.STRING, s + c);
          } else {
            s += c;
          }
          break;
        case 2:
          if(c === "'"){
            return new Token(TokenType.STRING, s + c);
          } else {
            s += c;
          }
          break;
      }
    }
    throw new LexicalException("Unexpected error");
  }

  /**
   * 
   * @param {提取操作符} it 
   */
  static makeOp(it){
    let state = 0;
    while(it.hasNext()){
      let lookhead = it.next();
      switch(state){
        case 0:
          switch(lookhead){
            case "+":
              state = 1;
              break;
            case "-":
              state = 2;
              break;
            case "*":
              state = 3;
              break;
            case "/":
              state = 4;
              break;
            case ">":
              state = 5;
              break;
            case "<":
              state = 6;
              break;
            case "=":
              state = 7;
              break;
            case "!":
              state = 8;
              break;
            case "&":
              state = 9;
              break;
            case "|":
              state = 10;
              break;
            case "^":
              state = 11;
              break;
            case "%":
              state = 12;
              break;
            case ",":
              return new Token(TokenType.OPERATOR, ",");
            case ";":
              return new Token(TokenType.OPERATOR, ";");
          }
          break;
        case 1:
          if(lookhead === "+"){
            return new Token(TokenType.OPERATOR, "++");
          } else if(lookhead === "="){
            return new Token(TokenType.OPERATOR, "+=");
          } else {
            it.putBack();
            return new Token(TokenType.OPERATOR, "+");
          }
        case 2:
          if(lookhead === "-"){
            return new Token(TokenType.OPERATOR, "--");
          } else if(lookhead === "="){
            return new Token(TokenType.OPERATOR, "+=");
          } else {
            it.putBack();
            return new Token(TokenType.OPERATOR, "-");
          }
        case 3:
          if(lookhead === "="){
            return new Token(TokenType.OPERATOR, "*=");
          } else {
            it.putBack();
            return new Token(TokenType.OPERATOR, "*");
          }
        case 4:
          if(lookhead === "="){
            return new Token(TokenType.OPERATOR, "/=");
          } else {
            it.putBack();
            return new Token(TokenType.OPERATOR, "/");
          }
        case 5:
          if(lookhead === "="){
            return new Token(TokenType.OPERATOR, ">=");
          } else if(lookhead === ">"){
            return new Token(TokenType.OPERATOR, ">>");
          } else {
            it.putBack();
            return new Token(TokenType.OPERATOR, ">");
          }
        case 6:
          if(lookhead === "="){
            return new Token(TokenType.OPERATOR, "<=");
          } else if(lookhead === "<"){
            return new Token(TokenType.OPERATOR,"<<");
          } else {
            it.putBack();
            return new Token(TokenType.OPERATOR,"<");
          }
        case 7:
          if(lookhead === "="){
            return new Token(TokenType.OPERATOR, "==");
          } else {
            it.putBack();
            return new Token(TokenType.OPERATOR,"=");
          }
        case 8:
          if(lookhead === "="){
            return new Token(TokenType.OPERATOR,"!=");
          } else {
            it.putBack();
            return new Token(TokenType.OPERATOR, "!");
          }
        case 9:
          if(lookhead === "&"){
            return new Token(TokenType.OPERATOR, "&&");
          } else if(lookhead === "="){
            return new Token(TokenType.OPERATOR, "&=");
          } else {
            it.putBack();
            return new Token(TokenType.OPERATOR,"&");
          }
        case 10:
          if(lookhead === "|"){
            return new Token(TokenType.OPERATOR, "||");
          } else if(lookhead === "="){
            return new Token(TokenType.OPERATOR, "|=");
          } else {
            it.putBack();
            return new Token(TokenType.OPERATOR,"|");
          }
        case 11:
          if(lookhead === "^"){
            return new Token(TokenType.OPERATOR,"^^");
          } else if(lookhead === "="){
            return new Token(TokenType.OPERATOR,"^=");
          } else {
            it.putBack();
            return new Token(TokenType.OPERATOR,"^");
          }
        case 12:
          if(lookhead === "="){
            return new Token(TokenType.OPERATOR,"%=");
          } else {
            it.putBack();
            return new Token(TokenType.OPERATOR,"%");
          }
      }
    }
    throw new LexicalException("Unexpected error");
  }

  /**
   * 
   * @param {提取number} it 
   */
  static makeNumber(it){
    let state = 0;
    let s = "";
    while(it.hasNext()){
      let lookhead  = it.peek();
      switch(state){
        case 0:
          if(lookhead === "0"){
            state = 1;
          } else if(AlphabetHelper.isNumber(lookhead)){
            state = 2;
          } else if(lookhead === "+" || lookhead === "-"){
            state = 3;
          } else if(lookhead === "."){
            state = 5;
          }
          break;
        case 1:
          if(lookhead === "0"){
            state = 1;
          } else if(lookhead == "."){
            state = 4;
          } else {
            return new Token(Token.INTEGER, s);
          }
          break;
        case 2:
          if(AlphabetHelper.isNumber(lookhead)){
            state = 2;
          } else if(lookhead === "."){
            state = 4;
          } else {
            return new Token(TokenType.INTEGER, s );
          }
          break;
        case 3:
          if(AlphabetHelper.isNumber(lookhead)){
            state = 2;
          } else if(lookhead === "."){
            state = 5;
          } else {
            throw  LexicalException.fromChar(lookhead);
          }
          break;
        case 4:
          if(lookhead === "."){
            throw LexicalException.fromChar(lookhead);
          } else if(AlphabetHelper.isNumber(lookhead)){
            state = 20;
          } else {
            return new Token(TokenType.FLOAT, s);
          }
          break;
        case 5:
          if(AlphabetHelper.isNumber(lookhead)){
            state = 20;
          } else {
            throw LexicalException.fromChar(lookhead);
          }
          break;
        case 20:
          if(AlphabetHelper.isNumber(lookhead)){
            state = 20;
          } else if(lookhead === "."){
            throw LexicalException.fromChar(lookhead);
          } else {
            return new Token(TokenType.FLOAT, s );
          }
      }
      s += lookhead;
      it.next();
    } // end while
    throw new LexicalException("Unexpected error");
  }
  
}

module.exports = Token;