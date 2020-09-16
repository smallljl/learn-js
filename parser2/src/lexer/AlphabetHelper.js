class AlphabetHelper {
    static ptnLetter = /^[a-zA-Z]$/; // 字母
    static ptnNumber = /^[0-9]$/; // 数字
    static ptnLiteral = /^[_a-zA-Z0-9]$/; // 文本
    static ptnoperator = /^[+-\\*/><=!&|^%]$/;

    static isLetter(c){
        return AlphabetHelper.ptnLetter.test(c);
    }

    static isNumber(c){
        return AlphabetHelper.ptnNumber.test(c);  
    }

    static isLiteral(c){
        return AlphabetHelper.ptnLiteral.test(c);
    }

    static isOperator(c){
        return AlphabetHelper.ptnoperator.test(c);
    }
}

module.exports = AlphabetHelper;