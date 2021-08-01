<!--
 * @Author: your name
 * @Date: 2021-08-01 17:20:43
 * @LastEditTime: 2021-08-01 17:48:29
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \learn-js\vue-router\xxx\src\views\About.vue
-->
<template>
  <div class="about">
    <h1>我是About</h1>
  </div>
</template>
<script>
  export default {
    name: 'About',
    mounted() {
      console.log('About', this.$router);
      console.log('About', this.$route);
    }
  }
</script>
