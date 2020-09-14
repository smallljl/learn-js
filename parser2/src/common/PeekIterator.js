const LinkedList = require("linkedlist");

const CACHE_SIZE = 10;

class PeekIterator {
    constructor(it,endToken = null){
        this.it = it;
        // 需要putBack的元素
        this.stackPutBacks = new LinkedList();
        // 基于时间窗口的缓存
        this.queueCache = new LinkedList();
        this.endToken = endToken;
    }
    peek(){
        if(this.stackPutBacks.length > 0){
            return this.stackPutBacks.head;
        }
        const val = this.next();
        this.stackPutBacks();
        return val;
    }
    pubBack(){
        if(this.queueCache.length > 0){
            this.stackPutBacks.push(this.queueCache.pop());
        }
    }
    next(){
        let val = null;
        if(this.stackPutBacks.length > 0){
            val = this.stackPutBacks.pop();
        } else {
            val = this.it.next().value;
            if(val === undefined){
                const tmp = this.endToken;
                this.endToken = null;
                return tmp
            }
        }
        // 处理缓存
        while(this.queueCache.length < CACHE_SIZE -1){
            this.queueCache.shift();
        }
        this.queueCache.push(val);
        return val;
    }
    hasNext(){
        return  this.endToken || !!this.peek();
    }
}

module.exports = PeekIterator;