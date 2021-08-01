/*
 * @Author: your name
 * @Date: 2021-08-01 16:51:42
 * @LastEditTime: 2021-08-01 17:07:34
 * @LastEditors: Please set LastEditors
//  * @Description: In User Settings Edit
 * @FilePath: \learn-js\vue-router\xxx\src\router\index.js
 */
import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from './Nue-Router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history', // #/home /home
  base: process.env.BASE_URL,
  routes
})

export default router
