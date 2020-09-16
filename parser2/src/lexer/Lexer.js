const PeekIterator = require('../common/PeekIterator');
const Token = require("./Token");
const TokenType = require("./TokenType");
const AlphabetHelper = require("./AlphabetHelper");
const LexicalException = require("./LexicalException");


/**
 * 词法分析
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

            if(c === "/"){

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
            
            if((c === "+" || c === "-") && AlphabetHelper.isNumber(lookahead)){
                const lastToken = tokens[tokens.length - 1] || null;
                if(lastToken)
            }

        

        }
        return null;
    }
}