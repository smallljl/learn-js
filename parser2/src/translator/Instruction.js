const TAInstructionType = require('./TAInstructionType')

class TAInstructionType{
    constructor(type, result, op, arg1, arg2){
        this.type = type;
        this.result = result;
        this.op = op;
        this.arg1 = arg1;
        this.arg2 = arg2;
    }

    getType(){
        return this.type;
    }

    setType(type){
        this.type = type;
    }

    getResult(){
        return this.result;
    }

    setResult(result){
        this.result = result;
    }

    getOp(){
        return this.op;
    }

    setOp(op){
        this.op = op;
    }

    getArg1(){
        return this.arg1;
    }

    setArg1(arg1){
        this.arg1 = arg1;
    }

    getArg2(){
        return this.arg2;
    }

    setArg2(arg2){
        this.arg2 = arg2;
    }

    
}
module.exports = TAInstructionType;