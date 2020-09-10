class Mediator {
    constructor(a,b){
        this.a = a;
        this.b = b;
    }
    setB(){
        let num = this.a.number;
        this.b.setNumber(num * 100);
    }
    setA(){
        let num = this.b.number;
        this.a.setNumber(num / 100); 
    }
}

class A {
    constructor(){
        this.number = 0;
    }
    setNumber(num,m){
        this.number = num;
        if(m){
            m.setB();
        }
    }
}

class N {
    constructor(){
        this.number = 0;
    }
    setNumber(num,m){
        this.number = num;
        if(m){
            m.setA();
        }
    }
}
