import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element-ui
import ELEMENTUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入animate.css文件
import animate from 'animate.css';
// 引入插件
import vueUtil from './util/vueUtil.js';

// 阻止vue在启动时生成生产提示
Vue.config.productionTip = false
Vue.use(ELEMENTUI)
Vue.use(vueUtil);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
