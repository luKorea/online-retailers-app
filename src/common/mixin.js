// TODO Vue高级用法，Mixin
import {debounce} from "./utils"
import BackTop  from 'components/common/backTop/BackTop'
// TODO 监听图片加载高度变化，实时刷新better-scroll高度
export const itemImageListenerMixin = {
  data () {
    return {
      itemImageListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.itemImageListener = () => {
      refresh();
    };
    this.$bus.$on('imgLoad', this.itemImageListener);
  }
};
// 回到顶部
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      showBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTop(0, 0, 1000)
    },
    listenShowBackTop (position) {
      this.showBackTop = -position.y > BACK_POSITION
    }
  }
};
