const EventEmitter = require("events").EventEmitter;

class Dog extends EventEmitter {
    constructor(name){
        super();
        this.name = name;
    }
}

let simon = new Dog("simon");
simon.on("bark",function(){
    console.log(this.name, " barked_2");
});

simon.on("bark",function(){
    console.log(this.name, " barked_1");
}); 

setInterval(function(){
    simon.emit("bark");
},1000);