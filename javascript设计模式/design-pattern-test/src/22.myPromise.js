import StateMachine from "javascript-state-machine";

let fsm = new StateMachine({
    init:"pending",
    transitions:[
        {
            name:"resolve", // 事件名称
            from:"pending",
            to:"fullfilled"
        },
        {
            name:"reject",
            from:"pending",
            to:"rejected"
        }
    ],
    methods:{
        onResolve:function(state,data){ // state 当前状态机实例  data参数
            data.successList.forEach(fn => fn());
        },
        onReject:function(state,data){
            data.failList.forEach(fn => fn());
        }
    }
});

class MyPromise {
    constructor(fn){
        this.successList = [];
        this.failList = [];

        fn(()=>{
            fsm.resolve(this);
        },()=>{
            fsm.reject(this);
        });
    }

    then(successFn,failFn){
        this.successList.push(successFn);
        this.failList.push(failFn);
    }
}

function loadImg(src){
    const promise = new MyPromise(function(resolve,reject){
        let img = document.createElement("img");
        img.onload = function(){
            resolve(img);
        }
        img.onerror = function(){
            reject();
        }
        img.src = src;
    });

    return promise;
}

let src = "https://www.imooc.com/static/img/index/index_javaarchitect.png";
let result = loadImg(src);

result.then(function(){
    console.log("ok")
},function(){
    console.log("error");
});

result.then(function(){
    console.log("ok2")
},function(){
    console.log("error");
});
   
