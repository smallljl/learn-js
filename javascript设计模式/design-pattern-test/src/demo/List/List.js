import $ from "jquery";
import { GET_LIST } from "../config/config";
import createItem from "./CreateItem.js";


export default class List {
  constructor(app){
    this.app = app;
    this.$el = $("<div>");
  }

  /**
   * @description:获取数据 
   * @param {type} 
   * @return {type} 
   */
  loadData(){
    // 返回 Promise 实例
    return fetch(GET_LIST).then(result => {
      return result.json();
    });
  }

  /**
   * @description: 生成列表
   * @param {type} 
   * @return {type} 
   */
  initItemList(data){
    data.forEach(itemData => {
      // 创建一个Item 然后 init
      let item = createItem(this,itemData);
      item.init();
    })
  }

  /**
   * @description:渲染 
   * @param {type} 
   * @return {type} 
   */
  render(){
    this.app.$el.append(this.$el);
  }

  /**
   * @description: 
   * @param {type} 
   * @return {type} 
   */
  init(){
    this.loadData().then(data=>{
      this.initItemList(data);
    }).then(()=>{
      // 渲染
      this.render();
    })   
  }
}
