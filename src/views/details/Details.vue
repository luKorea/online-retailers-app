<template>
	<div class="detail-container">
    <details-nav-bar
      class="details-nav"
      @navClick="navClick"
      ref="navBar"
    />
    <scroll
      class="content"
      :probe-type="3"
      ref="scroll"
      @scrollMove="scroll"
    >
      <details-swipe :top-images="topImages"/>
      <details-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommendsInfo" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
  </div>
</template>

<script>

  import DetailsNavBar from './components/DetailNavBar'
  import DetailsSwipe from './components/DetailsSwipe'
  import DetailsBaseInfo from './components/DetailBaseInfo'
  import DetailShopInfo from './components/DetailShopInfo'
  import DetailGoodsInfo from './components/DetailGoodsInfo'
  import DetailParamInfo from './components/DetailParamInfo'
  import DetailCommentInfo from './components/DetailCommentInfo'
  import DetailBottomBar from './components/DetailBottomBar'


  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'

  import {reqDetails, reqRecommend, Goods, Shop, GoodsParam} from 'http/details'
  import {itemImageListenerMixin, backTopMixin} from 'common/mixin'
  import {debounce} from "../../common/utils"
  import {mapActions} from 'vuex'

  export default {
    name: "Details",
    components: {
      DetailsNavBar,
      DetailsSwipe,
      DetailsBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
    },
    mixins: [itemImageListenerMixin, backTopMixin],
    data () {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendsInfo: [],
        themeTops: [],
        getThemeTopY: null,
        currentIndex: 0,
      }
    },
    methods: {
      ...mapActions(['addToCart']),
      imageLoad () {
        this.$refs.scroll.refresh();
        this.getThemeTopY();
      },
      async getRecommend () {
        const result = await reqRecommend();
        this.recommendsInfo = result.list;
      },
      navClick (index) {
        // TODO 点击顶部，滚动到某一个对应的位置
        this.$refs.scroll.scrollTop(0, -this.themeTops[index], 100);
      },
      // TODO 屏幕滚动。顶部显示对应数据
      scroll (position) {
        const y = -position.y;
        let length = this.themeTops.length;
        for (let i = 0; i < length - 1; i++) {
         /* let i1 = (i < length - 1 && y >= this.themeTops[parseInt(i)] &&
            y < this.themeTops[i+1]);
          let i2 = (i === length -1 && y >= this.themeTops[parseInt(i)]);
          if (this.currentIndex !== i && (i1 || i2)) {
            this.currentIndex = i;
            this.$refs.navBar.currentIndex = this.currentIndex;
          }*/
        // TODO 性能优化
          let i1 = (i < length - 1 && y >= this.themeTops[parseInt(i)] &&
            y < this.themeTops[i+1]);
          if (this.currentIndex !== i && i1) {
            this.currentIndex = i;
            this.$refs.navBar.currentIndex = this.currentIndex;
          }
        }
      },
      // TODO 添加商品到购物车
      addToCart () {
        // 获取加入购物车的数据
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        // 将商品添加到购物车
       /* console.log(this.addToCart);
        this.addToCart(product).then(res => {
          console.log(res);
        });*/
        this.$store.dispatch('addToCart', product).then(res => {
          console.log(this.$toast);
        });
      }
    },

    async created() {
      this.iid = this.$route.params.iid;
      const result = await reqDetails(this.iid);

      // TODO 详情页数据获取
      // 获取定都轮播图
      this.topImages = result.itemInfo.topImages;
      // 获取商品信息
      this.goods = new Goods(result.itemInfo, result.columns, result.shopInfo.services);
      // 获取店铺信息
      this.shop = new Shop(result.shopInfo);
      // 获取商品详细信息
      this.detailInfo = result.detailInfo;
      // 获取商品参数信息
      this.paramInfo = new GoodsParam(result.itemParams.info, result.itemParams.rule);
      // 取出评论信息
      if (result.rate.cRate !== 0) {
        this.commentInfo = result.rate.list[0];
      }
      // 获取详情页推荐数据
      this.getRecommend();

      this.getThemeTopY = debounce(() => {
        // 当图片请求结束，获取位置
        this.themeTops = [];
        let param = this.$refs.param.$el.offsetTop;
        let comment = this.$refs.comment.$el.offsetTop;
        let recommend = this.$refs.recommend.$el.offsetTop;
        this.themeTops.push(0);
        this.themeTops.push(param);
        this.themeTops.push(comment);
        this.themeTops.push(recommend);
        this.themeTops.push(Number.MAX_VALUE);
      }, 100);
    },
    mounted() {},
    destroyed() {
      this.$bus.$off('imgLoad', this.itemImageListener);
    },
  }
</script>

<style scoped>
  .detail-container {
    position: relative;
    height: 100vh;
    z-index: 9;
    background-color: #fff;
  }

  .details-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
