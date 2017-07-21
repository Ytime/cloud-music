// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import store from './store'
//主题样式
import "./assets/theme.less"
import FastClick from 'fastclick' // 消除移动端300毫秒延迟

document.addEventListener('DOMContentLoaded', function () {
  FastClick.attach(document.body)
}, false)

Vue.config.productionTip = false

/* eslint-disable no-new */


Vue.use(MuseUI);
Vue.prototype.$http = axios;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
