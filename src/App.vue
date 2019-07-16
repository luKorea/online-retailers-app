<template>
  <div id="app">
    <keep-alive exclude="Details">
      <router-view />
    </keep-alive>
    <main-tab-bar />
<!--    <back-top />-->
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar'
  // import BackTop from 'components/common/backTop/BackTop'
  export default {
    name: 'App',
    components: {
      MainTabBar,
      // BackTop
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
