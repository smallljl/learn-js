// 顺序遍历  有序集合
// 使用着不必知道集合的内部结构

class Iterator {
    constructor(container){
        this.list = container.list;
        this.index = 0;
    }
    next(){
        if(this.hasNext()){
            return this.list[this.index++];
        } 
        return null;
    }
    hasNext(){
        if(this.index >= this.list.length){
            return false;
        }
        return true;
    }
}

class Container {
    constructor(list){
        this.list = list;
    }
    // 生成遍历器
     getIterator(){
        return new Iterator(this);
    }
}

var arr = [1,2,3,4,5,6];
var container = new Container(arr);
var lt = container.getIterator();
while(lt.hasNext()){
    console.log(lt.next());
}


function each(data){
    let iterator = data[Symbol.iterator]();
    let item = {done:false};
    while(!item.done){
        item = iterator.next();
        if(!item.done){
            console.log(item.value);
        }
    }
}

let arr = [1,2,3,4];
each(arr);

for(let item of arr){
    console.log(item);
}