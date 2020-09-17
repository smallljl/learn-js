const PeekIterator = require('../common/PeekIterator');
const Token = require("./Token");
const TokenType = require("./TokenType");
const AlphabetHelper = require("./AlphabetHelper");
const LexicalException = require("./LexicalException");
const arrayToGenerator = require("../common/arrayToGenerator");

/**
 * 词法分析器
 */
class Lexer {
    analyse(source){
        const tokens = [];
        const it = new PeekIterator(source,'\0');

        while(it.hasNext()){
            let c = it.next();
            if(c === '\0') {
                break;
            }
            let lookahead = it.peek();

            if(c === " " || c === "\n" || c === "\r"){
                continue;
            }

            // 提取注释的程序
            if(c === "/"){
                if(lookahead === "/"){
                    // 删除当前注释行
                    while(it.hasNext() && (c = it.next()) != "\n");
                    continue;
                } else if(lookahead === "*"){
                    let valid = false;
                    while(it.hasNext()){
                        const p = it.next();
                        if(p === "*" && it.peek() === "/"){
                            valid = true;
                            it.next();
                            break;
                        }
                    }

                    if(!valid){
                        throw new LexicalException("content not matched");
                    }

                    continue;
                }

            }

            if(c === "{" || c === "}" || c === "(" || c === ")"){
                tokens.push(new Token(TokenType.BRACKET, c));
                continue;
            }

            if(c === "'" || c === '"'){
                it.putBack();
                tokens.push(Token.makeString(it));
                continue;
            }

            if(AlphabetHelper.isLetter(c)){
                it.putBack();
                tokens.push(Token.makeVarOrKeyWord(it));
                continue;
            }
            
            if(AlphabetHelper.isNumber(c)){
                it.putBack();
                tokens.push(Token.makeNumber(it));
                continue;
            }

            // **********
            // 这里 + - 号也可以作为数字的开头
            if((c === "+" || c === "-") && AlphabetHelper.isNumber(lookahead)){
                // 跳过: a + 1, 1 + 1  // 左边是值的类型不处理  + -
                // +5, 3*-5
                const lastToken = tokens[tokens.length - 1] || null;
                // 没有值 +5的情况   有值 操作符号 3* -5   *为操作符号  
                if(lastToken === null || !lastToken.isValue()){
                    it.putBack();
                    tokens.push(Token.makeNumber(it));
                    continue;
                }
            }

            if(AlphabetHelper.isOperator(c)){
                it.putBack();
                tokens.push(Token.makeOp(it));
                continue;
            }
            throw LexicalException.fromChar(c);

        }
        return tokens;
    }

    static fromFile(src){
        const content = fs.readFileSync(src,"urf-8");
        const lexer = new Lexer();
        return arrayToGenerator(lexer.analyse(arrayToGenerator(content)));
    }
}

module.exports = Lexer;