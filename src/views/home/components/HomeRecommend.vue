<template>
<!-- TODO HomeRecommend -->
	<div class="home-recommend-container">
    <div v-for="item in recommends" :key="item.acm" class="home-recommend-item">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title" />
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommend",
    props: {
      recommends: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style scoped>
  .home-recommend-container {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
  }
  .home-recommend-item {
    flex: 1;
  }
  .home-recommend-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>
