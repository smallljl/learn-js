const Enum = require("../../common/Enum");

/**
 * @description:文件节点的类型 
 * @param {type} 
 * @return {type} 
 */
module.exports = {
  BLOCK: new Enum("BLOCK",1),
  BINARY_EXPR: new Enum("BINARY_EXPR", 2),  // 二元表达式
  UNARY_EXPR: new Enum("UNARY_EXPR", 3),  // 一元表达式
  VARIABLE: new Enum("VARIABLE",4),  // 变量
  IF_STMT: new Enum("IF_STMT", 5),
  WHILE_STMT: new Enum("WHILE_STMT", 6),
  FOR_STMT: new Enum("FOR_STMT", 7),
  ASSIGN_STMT: new Enum("ASSIGN_STMT", 8),  // 合并
  FUNCTION_DECLARE_STME : new Enum("FUNCTION_DECLARE_STMT", 9),
  DECLARE_STIME: new Enum("DECLARE_STIME",10),  // 声明
  SCALAR: new Enum("SCALAR", 11)  // 常量
}