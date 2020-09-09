import StateMachine from "javascript-state-machine";
import $ from "jquery";

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
            
        },
        onReject:function(){
           
        }
    }
});

