const PeekIterator = require('../common/PeekIterator');
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
        }
        return null;
    }
}