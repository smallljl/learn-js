import $ from "jquery";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import List from "./List/List";


export default class App {
  constructor(id){
    this.$el = $("#"+id);
  }
  
  init(){
    this.initShoppingCart();
    this.initList();
  }

  /**
   * @description:初始化购物车
   * @param {type} 
   * @return {type} 
   */
  initShoppingCart(){
    let shoppingCart = new ShoppingCart(this);
    shoppingCart.init();
  }
  /**
   * @description:初始化列表 
   * @param {type} 
   * @return {type} 
   */
  initList(){
    let list = new List(this);
    list.init();
  }
}