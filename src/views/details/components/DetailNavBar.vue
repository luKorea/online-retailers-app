<template>
  <nav-bar>
    <div slot="left" class="back" @click="backHome">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="details-item">
      <div
        v-for="(item, index) in title"
        :key="item"
        :class="{active: index === currentIndex}"
        @click="titleClick(index)"
      >
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data () {
      return {
        title: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      backHome () {
        this.$router.go(-1);
        // this.$router.back();
      },
      titleClick (index) {
        this.currentIndex = index;
      }
    }
  }
</script>

<style scoped>
  .back img {
    margin-top: 10px;
    width: 16px;
    height: 16px;
  }
  .details-item {
    display: flex;
    font-size: 13px;
  }
  .details-item div {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
</style>
