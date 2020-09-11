let star = {
  name:"张某某",
  age:25,
  phone:"start : 13666173743"
}

let agent = new Proxy(star,{
  get:function(target,key){
      if(key === "phone"){
          // 返回经纪人自己的电话
          return "agent: 1683132132321" 
      }
      if(key === "price"){
          // 明星不报价,经纪人报价
          return 1200000;
      }
      return target[key];
  },
  set:function(target,key,val){
      if(key === "customPrice"){
          if(val < 100000){
              throw new Error("价格太低");
          } else {
              target[key] = val;
              return true;
          }
      }
  }   
});

console.log(agent.name);
console.log(agent.phone);
console.log(agent.age);
console.log(agent.price);

agent.customPrice = 1500000;
console.log(agent.customPrice);