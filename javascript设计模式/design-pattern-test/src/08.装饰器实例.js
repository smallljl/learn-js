@testDec(false)
class Demo {
    // ...
}

// function testDec(target){
//     target.isDec = true;
// }

function testDec(isDec){
    return function(target){
        target.isDec = isDec;
    }
}

alert(Demo.isDec);
