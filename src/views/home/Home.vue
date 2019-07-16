<template>
	<div class="home-container">
     <nav-bar class="home-nav-bar">
       <div slot="center">购物街</div>
     </nav-bar>
    <tab-control
      class="home-container-tabBar"
      ref="tabControl1"
      :titles="titles"
      @tabClick="tabClick"
      v-show="isFixed"
    />
    <scroll
      class="home-content"
      ref="scroll"
      :probe-type="probeType"
      :pull-up-load="pullUpLoad"
      @scrollMove="scrollMove"
      @pullingUpData="pullUpLoadData"
    >
      <home-swipe
        @swipeImgLoad="swipeImgLoad"
        :banner="banner"
      />
      <home-recommend :recommends="recommends" />
      <home-week-fashion />
      <tab-control
        ref="tabControl2"
        :titles="titles"
        @tabClick="tabClick"
      />
      <goods-list
        :goods="showGoods"
      />
    </scroll>
    <back-top @click.native="backTop" v-show="isShowTop" />
  </div>
</template>

<script>
  import HomeSwipe from './components/HomeSwipe'
  import HomeRecommend from './components/HomeRecommend'
  import HomeWeekFashion from './components/HomeWeekFashion'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/common/backTop/BackTop'

  import { reqMultidata, reqGoods } from 'http/home'
  import {debounce} from 'common/utils'

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
      HomeSwipe,
      HomeRecommend,
      HomeWeekFashion
    },
    data () {
      return {
        banner: [],   // 轮播图
        recommends: [],
        titles: ['流行', '新款', '精选'],
        curreyType: 'pop',  // 所选类型
        // TODO 保存商品品类数据
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },

        scroll: '',
        probeType: 3,
        pullUpLoad: true,
        isShowTop: false,
        tabOffsetTop: 0,
        isFixed: false,
        saveY: '',
      }
    },
    computed: {
      showGoods () {
        return this.goods[this.curreyType].list;
      }
    },
    methods: {
      /**
       * TODO 事件处理
       */
      // TODO 切换选项卡显示不同内容
      tabClick (index) {
        switch (index) {
          case 0:
            this.curreyType = 'pop';
            break;
          case 1:
            this.curreyType = 'new';
            break;
          case 2:
            this.curreyType = 'sell';
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      // TODO 点击回到顶部
      backTop () {
        this.$refs.scroll.scrollTop(0, 0, 2000);
      },
      // TODO 当用户滑屏至一定区域，显示backTop
      scrollMove (position) {
        // 判断是否显示topback
        this.isShowTop = (-position.y) > 1000;
        // 决定tabControl是否吸顶
        this.isFixed = (-position.y) > this.tabOffsetTop;
      },
      // TODO 上拉加载更多
      pullUpLoadData () {
        this.getGoods(this.curreyType)
      },
      // TODO 吸顶效果
      swipeImgLoad () {
        // TODO 获取tabControl位置，实现吸顶效果,$el 获取元素节点
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },

      /**
       * TODO 网络请求
       */
      // TODO 获取轮播图以及推荐数据
      async getBannerOrRecommend () {
        let bannerOrRecommend = await reqMultidata();
        this.banner = bannerOrRecommend.banner.list;
        this.recommends = bannerOrRecommend.recommend.list;
      },
      // TODO 获取商品分类数据
      async getGoods (type) {
        let page = this.goods[type].page + 1;
        let goods = await reqGoods(type, page);
        this.goods[type].list.push(...goods.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp()
      }
    },
    created() {
      this.getBannerOrRecommend();
      this.getGoods('pop');
      this.getGoods('new');
      this.getGoods('sell');
    },
    mounted() {
      // TODO 监听图片加载高度变化，实时刷新better-scroll高度
      const refresh = debounce(this.$refs.scroll.refresh, 200);
      this.$bus.$on('imgLoad', () => {
        refresh();
      });
    },
    // TODO  保存用户上一次浏览的位置
    activated() {
      this.$refs.scroll.scrollTop(0, this.saveY, 0);
      // this.$refs.scroll.refresh();
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y;
    }
  }
</script>

<style scoped>
  .home-container {
    height: 100vh;  /**viewport height**/
  }

  .home-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .home-container-tabBar {
    position: relative;
    z-index: 9;
  }

  .home-content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

</style>
