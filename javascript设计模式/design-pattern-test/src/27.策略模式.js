// 策略模式
class OrdinaryUser {
  buy(){
      console.log("普通用户购买");
  }
}

class MemberUser {
  buy(){
      console.log("会员用户购买");
  }
}

class VipUser {
  buy(){
      console.log("vip 用户购买");
  }
}

let u1 = new OrdinaryUser();
let u2 = new MemberUser();
let u3 = new VipUser();

u1.buy();
u2.buy();
u3.buy();
