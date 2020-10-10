 const Lexer = require("../lexer/Lexer");
 const Expr = require("../parser/ast/Expr");
 const arrayToGenerator = require("../common/arrayToGenerator");
 const ParserUtils = require("../parser/utils/ParseUtils");
 const { assert } = require("chai");
 const PeekTokenItertor = require("../parser/utils/PeekTokenIterator");
const ParseUtils = require("../parser/utils/ParseUtils");

 function createExpr(str){
    const gen = arrayToGenerator([...str]);
    const lexer = new Lexer();
    const tokens = lexer.analyse(gen);
    const it = new PeekTokenItertor(arrayToGenerator(tokens));
    return Expr.parseExpr(null,it);
 }

 describe("ParseExpression", ()=>{
   it("simple", ()=>{
      const expr = createExpr("1+1+1");
      assert.equal(ParserUtils.toPostfixExpression(expr),"1 1 1 + +");
   });

   it("simple1", ()=> {
     const expr = createExpr('"1" == ""');
     assert.equal(ParseUtils.toPostfixExpression(expr),'"1" "" ==');
   });

   it("complex", ()=> {
     const expr1 = createExpr("1+2*3");
     const expr2 = createExpr("1*2+3");
     const expr3 = createExpr("10 * (7+4)");
     //  const expr4 = createExpr("(1*2!=7)==3!=4*5+6");

    console.log(expr3.print());
    console.log(ParserUtils.toPostfixExpression(expr3));
     assert.equal(ParserUtils.toPostfixExpression(expr1),"1 2 3 * +");
     assert.equal(ParserUtils.toPostfixExpression(expr2),"1 2 * 3 +");
     assert.equal(ParserUtils.toPostfixExpression(expr3),"10 7 4 + *");
    //  assert.equal(ParserUtils.toPostfixExpression(expr4),"1 2 * 7 != 3 4 5 * 6 + != ==");
   })

 })