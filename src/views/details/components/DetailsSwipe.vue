<template>
    <swiper class="details-swipe">
      <swiper-item v-for="item in topImages" :key="item">
        <img :src="item" :alt="item" />
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'
  export default {
    name: "DetailsSwipe",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style scoped>
  .details-swipe {
    height: 300px;
    overflow: hidden;
  }
</style>
