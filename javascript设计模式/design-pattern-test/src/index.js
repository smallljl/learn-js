class Person {
    constructor(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
}

let p = new Person("双越老师");
console.log(p.getName());