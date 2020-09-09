/*
 * @Author: your name
 * @Date: 2020-09-09 17:44:14
 * @LastEditTime: 2020-09-09 19:09:13
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \learn-js\javascript设计模式\design-pattern-test\src\15.观察者模式.js
 */
// 主题， 保存状态， 状态变化之后触发所有观察这对象
class Subject {
  constructor(){
      this.state = 0;
      this.observers = [];
  }
  getState(){
      return this.state;
  }
  setState(state){
      this.state = state;
      this.notifyAllObservers();
  }
  notifyAllObservers(){
      this.observers.forEach(observer => {
          observer.update();
      });
  }
  attach(observer){
      this.observers.push(observer);
  }
}

// 观察者
class Observer {
  constructor(name,subject){
      this.name = name;
      this.subject = subject;
      this.subject.attach(this);  // 添加到主题里面
  }
  update(){
      console.log(`${this.name} update, state: ${this.subject.getState()}`)
  }
}

// 测试
let s = new Subject();
let o1 = new Observer("o1",s);
let o2 = new Observer("o2",s);
let o3 = new Observer("o3",s);
s.setState("1");
s.setState("2");
s.setState("3");