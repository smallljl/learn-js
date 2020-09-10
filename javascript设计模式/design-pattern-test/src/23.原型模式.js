// 一个原型 对象
let prototype = {
  getName:function(){
    return this.first + ' ' + this.last;   
  },
  say:function(){
      alert("hello")
  }
}

let x = Object.create(prototype);

x.first = "a";
x.last = "b";

alert(x.getName());
x.say();


let y = Object.create(prototype);

y.first = "y";
y.last = "b";

alert(y.getName());
y.say();
