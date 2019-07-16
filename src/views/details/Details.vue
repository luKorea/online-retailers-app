<template>
	<div class="detail-container">
    <details-nav-bar />
    <details-swipe :top-images="topImages"/>
  </div>
</template>

<script>

  import DetailsNavBar from './components/DetailNavBar'
  import DetailsSwipe from './components/DetailsSwipe'

  import {reqDetails} from 'http/details'
  export default {
    name: "Details",
    components: {
      DetailsNavBar,
      DetailsSwipe
    },
    data () {
      return {
        iid: null,
        topImages: []
      }
    },
    async created() {
      this.iid = this.$route.params.iid;
      const result = await reqDetails(this.iid);
      this.topImages = result.itemInfo.topImages;
      console.log(result);
    }
  }
</script>

<style scoped>

</style>
