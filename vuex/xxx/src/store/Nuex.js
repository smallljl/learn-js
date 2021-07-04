import Vue from "vue";

const install = (Vue,options) => {
   // 给每一个vue实例添加一个store属性
   Vue.mixin({
      beforeCreate(){
        if(this.$options && this.$options.store){
          this.$store = this.$options.store;
        }
        // 如果不是根组件, 那么默认没有store
        // 我们只需要将它父组件的$store赋值给它即可
        else{
          this.$store = this.$parent.$store;
        }
      }
   });
}

class ModuleCollection {
  constructor(rootModule){
    this.register([], rootModule);
  }
  register(arr, rootModule){
    let module = {
      _raw : rootModule,
      _state: rootModule.state,
      _children : {}
    }

    if(arr.length === 0){
      this.root = module;
    } else {
      // ['a','b','c']  ===> ['a','b']
      let parent = arr.splice(0, arr.length - 1).reduce((root, currentKey) => {
        return root._children[currentKey];
      },this.root);
      parent._children[arr[arr.length-1]] = module;
    }

    // 处理子模块
    for(let childrenModuleName in rootModule.modules){
      let childrenModule = rootModule.modules[childrenModuleName];
      this.register(arr.concat(childrenModuleName), childrenModule);
    }
  }
}

class Store {
  constructor(options){
    // this.options = options;
    // this.state = options.state;
    // 双向绑定数据
    Vue.util.defineReactive(this, 'state', options.state);

    
    this.modules = new ModuleCollection(options);
    this.initModules([],this.modules.root)
    // console.log(this.modules);
  }
  
  dispatch = (type, payload) => {
    this.actions[type].forEach(fn => fn(payload));
  }

  commit = (type, payload) => {
    this.mutations[type].forEach(fn => fn(payload));
  }

  initModules(arr, rootModule){
    if(arr.length > 0){
      let parent = arr.splice(0, arr.length - 1).reduce((state,currentKey) => {
        return state[currentKey];
      }, this.state);
      Vue.set(parent, arr[arr.length - 1], rootModule._state);
    }
    this.initGetters(rootModule._raw);
    this.initMutations(rootModule._raw);
    this.initActions(rootModule._raw);

    for(let childrenModuleName in rootModule._children){
      let childrenModule = rootModule._children[childrenModuleName];
      this.initModules(arr.concat(childrenModuleName),childrenModule);
    }
  }

  initMutations(options){
    let mutations = options.mutations || {};
    this.mutations = this.mutations || {};
    for(let key in mutations){
      // 添加state方法
      this.mutations[key] = this.mutations[key] || [];
      this.mutations[key].push((payload) => {
        mutations[key](options.state,payload);
      })
    }
  }

  initActions(options){
    let actions = options.actions || {};
    this.actions = this.actions || {};
    for(let key in actions){
      this.actions[key] = this.actions[key] || [];
      this.actions[key].push((payload) => {
        actions[key](this, payload);
      })
    }
  }

  initGetters(options){
    let getters = options.getters || {};
    this.getters = this.getters || {};
    for(let key in getters){
      Object.defineProperty(this.getters,key,{
        get:()=>{
          return getters[key](options.state);
        }
      })
    }
  }
}

export default {
  install,
  Store,
}
