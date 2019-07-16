<template>
<!-- TODO HomeSwipe -->
  <swiper>
    <swiper-item v-for="item in banner" :key="item.acm" :title="item.title">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'
  export default {
    name: "HomeSwipe",
    props: {
      banner: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        isLoading: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imgLoad () {
        // TODO 设置只触发一次事件
        if (!this.isLoading) {
          this.$emit('swipeImgLoad');
          this.isLoading = true;
        }
      }
    }
  }
</script>

<style scoped>

</style>
