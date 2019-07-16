<template>
	<div class="goods-item">
    <img
      :src="goodsItem.show.img"
      :alt="goodsItem.title"
      @load="imgLoad"
      @click="getDetails"
    >
    <div class="goods-item-info">
      <p>{{goodsItem.title}}</p>
      <span class="goods-item-info-price">{{goodsItem.price}}</span>
      <span class="goods-item-info-collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: Object,
      default: () => {}
    },
    methods: {
      imgLoad () {
        // TODO 事件总线
        this.$bus.$emit('imgLoad')
      },
      getDetails () {
        this.$router.push(`/details/${this.goodsItem.iid}`);
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-item-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-item-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-item-info .goods-item-info-price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-item-info .goods-item-info-collect {
    position: relative;
  }

  .goods-item-info .goods-item-info-collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
