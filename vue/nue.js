let CompilerUtil = {
  getValue(vm,value){
     // time.h --> [time, h]
     return value.split('.').reduce((data, currentKey) => {
        // 第一次执行: data=$data, currentKey=time
        // 第二次执行: data=time, currentKey=h
        return data[currentKey.trim()];
     }, vm.$data);
  },
  getContent(vm,value){
    // console.log(value); //  {{name}}-{{age}} -> 李南江-{{age}}  -> 李南江-33
    let reg = /\{\{(.+?)\}\}/gi;
    let val = value.replace(reg, (...args) => {
        // 第一次执行 args[1] = name
        // 第二次执行 args[1] = age
        // console.log(args);
        return this.getValue(vm, args[1]); // 李南江, 33
    });
    return val;
  },
  setValue(vm, attr, newValue){
    attr.split(".").reduce((data,currentAttr,index,arr)=>{
      if(index == arr.length - 1){
        data[currentAttr] = newValue;
      }
      return data[currentAttr];
    },vm.$data);
  },
  model:function(node,value,vm){  // value
    // node.value = vm.$data[value];
    // 在第一次渲染的时候，就给所有的属性添加观察者
    new Watcher(vm,value,(newValue,oldValue)=>{
      node.value = newValue;
    });
    let val = this.getValue(vm,value);
    node.value = val;

    // 绑定input - v-model
    node.addEventListener("input", (e) => {
      let newValue = e.target.value;
      this.setValue(vm,value,newValue);
    })
    
  },
  html:function(node,value,vm){
    new Watcher(vm, value, (newValue, oldValue)=>{
      node.innerHTML = newValue;
      // debugger;
    });
    let val = this.getValue(vm,value);
    node.innerHTML = val;
  },
  text:function(node,value,vm){
    new Watcher(vm, value, (newValue, oldValue)=>{
      node.innerText = newValue;
      // debugger;
    });
    let val = this.getValue(vm,value);
    node.innerText = val;
  },
  content:function(node,value,vm){
    let reg = /\{\{(.+?)\}\}/gi;
    // 外层是为了拿到属性名称
    let val = value.replace(reg, (...args)=>{
        // 内层是为了保证数据完整性
        new Watcher(vm, args[1], (newValue, oldValue)=>{
            node.textContent = this.getContent(vm, value);
        });
        return this.getValue(vm, args[1]);
    });
    node.textContent = val;
  },
  on:function(node,value,vm,type){
    node.addEventListener(type,(e)=>{
      vm.$methods[value].call(vm,e);
    })
  }
}

class Nue {
  constructor(options){
    // 1.保存创建时候传递过来的数据
    if(this.isElement(options.el)){
      this.$el = options.el;
    } else {
      this.$el = document.querySelector(options.el);
    }

    this.$data = options.data;
    this.$methods = options.methods;
    this.$computed = options.computed;
    this.proxyData(); // 代理data的数据
    this.computed2data();
    if(this.$el){
      // 给外界传入的所有数据都添加get/set方法
      new Observer(this.$data);
      new Compier(this);
    }
  }
  computed2data(){
    for(let key in this.$computed){
      Object.defineProperty(this.$data, key, {
        get:()=>{
          return this.$computed[key].call(this);
        }
      })
    }
  }
  // 实现数据的代理 this.name ===> this.data.name
  proxyData(){
    for(let key in this.$data){
      Object.defineProperty(this,key,{
        get:()=>{
          return this.$data[key];
        }
      })
    }
  }
  // 判断是否是一个元素
  isElement(node){
    return node.nodeType === 1;
  }
}


class Compier {
  constructor(vm){
    this.vm = vm;
    let fragment = this.node2fragement(this.vm.$el);
    this.buildTemplate(fragment);

    this.vm.$el.appendChild(fragment);
    // console.log(fragment);
  }
  node2fragement(app){
    let fragment = document.createDocumentFragment();
    let node = app.firstChild;
    while(node){
      // 添加文档碎屏对象中 会删除
      fragment.appendChild(node);
      node = app.firstChild;
    }
    return fragment;
  }

  buildTemplate(fragment){
    // 取出节点
    let nodeList = [...fragment.childNodes];
    nodeList.forEach((node)=>{
      if(this.vm.isElement(node)){
        this.buildElement(node);
        this.buildTemplate(node);
      } else {
        this.buildText(node);
      }
    });
  }

  buildElement(node){
    let attrs = [...node.attributes];
    attrs.forEach(attr=>{
      let {name,value} = attr;
      // 以v 开头的指令
      if(name.startsWith("v-")){
        // name v-on:click  value = myFn
        let [directiveName, directiveType] = name.split(":");
        let [_,directive] = directiveName.split("-");
        CompilerUtil[directive](node,value,this.vm,directiveType);
      }
    });
  }

  buildText(node){
    let content = node.textContent;
    let reg = /\{\{.+?\}\}/gi;
    if(reg.test(content)){
      // {{name}}
      CompilerUtil['content'](node, content, this.vm);
    }
  }
}


class Observer{
  constructor(data){
    this.observer(data);
  }

  observer(obj){
    if(obj && typeof obj === "object"){
      // 遍历取出传入对象的所有属性,给遍历到的属性都增加get/set方法
      for(let key in obj){
        this.defineRecative(obj,key,obj[key]);
      }
    }
  }
  // obj 
  // attr 需要新增get/set方法的属性
  // value 需要新增get/set方法属性的取值
  defineRecative(obj,attr,value){
    this.observer(value);

    // 第三步，当前属性的所有观察者对象都放到当前属性的发布订阅对象中管理起来
    let dep = new Dep();
    Object.defineProperty(obj, attr, {
      get(){
        Dep.target &&  dep.addSub(Dep.target);
        
        return value;
      },
      set:(newValue)=>{
        if(value !== newValue){
          this.observer(newValue);
          value = newValue;
          dep.notify();
        }
      }
    })
  }
}

// 想要实现数据变化之后更新UI界面，我们可以使用发布订阅模式来实现
// 先定一个观察者类，再定义一个发布订阅类，然后再通过发布订阅的类来管理观察者类 

class Dep{
  constructor(){
    // 这个暑假就是专门用于管理某个属性的所有的观察者对象的
    this.subs = [];
  }

  // 订阅观察的方法
  addSub(watcher){
    this.subs.push(watcher);
  }
  
  // 发布订阅的方法
  notify(){
    this.subs.forEach(watcher=> watcher.update());
  }

}

class Watcher {
  constructor(vm,attr,cb){
    this.vm = vm;
    this.attr = attr;
    this.cb = cb;
    // 在创建观察者对象的时候就去获取当前的旧值
    this.oldValue = this.getOldValue();
  }

  getOldValue(){
    Dep.target = this;
    let oldValue = CompilerUtil.getValue(this.vm,this.attr);
    Dep.target = null;
    return oldValue;
  }

  // 定义一个更新的方法，用于判断新值和旧值是否相同
  update(){
    let newValue = CompilerUtil.getValue(this.vm,this.attr);
    console.log(this.oldValue,newValue);
    if(this.oldValue !== newValue){
      this.cb(newValue,this.oldValue);
    }
  }
}