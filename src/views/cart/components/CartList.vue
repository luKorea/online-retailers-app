<template>
	<div class="cart-list-container">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :product-item="item"
        :key="index"
      />
    </scroll>
  </div>
</template>

<script>
  import CartListItem from './CartListItem'

  import Scroll from 'components/common/scroll/Scroll'
  import {mapGetters} from 'vuex'
  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem,
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  .cart-list-container {
    height: calc(100% - 44px - 49px - 40px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
