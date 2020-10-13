class AlphabetHelper {
  
    static get ptnLetter(){
        return /^[a-zA-Z]$/;
    }

    static get ptnNumber(){
        return /^[0-9]$/;
    } 
    static get ptnLiteral(){
        return /^[_a-zA-Z0-9]$/;
    } 
    static get ptnOperator(){
        return /^[+\-*/><=!&|^%,]$/
    } 

    static isLetter(c) {
        return AlphabetHelper.ptnLetter.test(c)
    }
    static isNumber(c) {
        return AlphabetHelper.ptnNumber.test(c)
    }
    static isLiteral(c) {
        return AlphabetHelper.ptnLiteral.test(c)
    }
    static isOperator (c) {
        return AlphabetHelper.ptnOperator.test(c)
    }
}

module.exports = AlphabetHelper