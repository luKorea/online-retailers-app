<template>
  <div class="cart-container">
    <!-- 导航 -->
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 列表 -->
    <cart-list />
    <!-- 汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
  import CartList from './components/CartList'
  import CartBottomBar from './components/CartButtonBar'

  import NavBar from 'components/common/navbar/NavBar'

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      CartList,
      CartBottomBar,
      NavBar,
    },
    computed: {
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .cart-container {
    height: 100vh;
  }

  .cart-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
