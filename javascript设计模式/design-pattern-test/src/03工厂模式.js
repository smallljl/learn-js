class Product {
  constructor(name){
      this.name = name;
  }
  init(){
      alert("init");
  }
  fun1(){
      alert("fun1");
  }
  fun2(){
      alert("fun2");
  }
}

class Creator{
  create(name){
      return new Product(name);
  }
}

// 测试
let creator = new Creator();
let p = creator.create("p1");
let p2 = creator.create("p2");

console.log(p);
p.init();
p.fun1();
console.log(p2);


