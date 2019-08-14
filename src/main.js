// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'//引入store
import vant from 'vant';
import 'vant/lib/index.css';
import './assets/font/iconfont.css';
Vue.use(vant);

Vue.config.productionTip = false;
import '@/assets/js/pxtorem.js';    //设备适配
import {get,post} from '@/assets/js/http.js';
import utils from '@/assets/js/utils.js' ;
import {setWatermark} from '@/assets/js/watermark.js'
Vue.use(utils);
Vue.prototype.setWatermark = setWatermark;
Vue.prototype.get = get;
Vue.prototype.post = post;
import '@/assets/sass/common.scss'
process.env.MOCK && import('@/mock/index')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

