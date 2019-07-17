import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import toast from './components/common/toast/Toast'
import Fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload);
Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
Vue.use(toast);

Fastclick.attach(document.body);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
