const PeekIterator = require("../../common/PeekIterator");
const ParseException = require("./ParseException");

class PeekTokenItertor extends PeekIterator{
  constructor(it){
    super(it);
  }

  nextMatch(value){
    var token = this.next();
    if(token.getValue() !== value){
      throw ParseException.fromToken(token);
    }
    return token;
  }

  nextMatch1(type){
    var token = this.next();
    if(token.getType() !== type){
      throw ParseException.fromToken(token);
    }
    return token;
  }
  
}

module.exports = PeekTokenItertor;
