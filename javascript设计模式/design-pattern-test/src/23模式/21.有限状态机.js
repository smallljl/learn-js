import StateMachine from "javascript-state-machine";
import $ from "jquery";

let fsm = new StateMachine({
    init:"收藏",
    transitions:[
        {
            name:"doStore",
            from:"收藏",
            to:"取消收藏"
        },
        {
            name:"deleteStore",
            from:"取消收藏",
            to:"收藏"
        }
    ],
    methods:{
        onDoStore:function(){
            alert("收藏成功"); // post
            updateText();
        },
        onDeleteStore:function(){
            alert("取消收藏"); // post
            updateText();
        }
    }
});

let $btn =  $("#test");

$btn.click(function(){
    if(fsm.is("收藏")){
        fsm.doStore();
    } else {
        fsm.deleteStore();
    }
}) 

// 更新按钮的文案
function updateText(){
    console.log(fsm);
    $btn.text(fsm.state);
}

updateText();
