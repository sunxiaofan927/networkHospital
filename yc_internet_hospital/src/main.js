// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'lib-flexible'
import { Base64 } from 'js-base64'
Vue.prototype.$Base64 = Base64;

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);

import axios from 'axios'


Vue.prototype.$axios = axios;
import vuex from 'vuex'
Vue.config.productionTip = false
Vue.use(vuex)
import store from './store'



import Qs from 'qs'
import api from '@/api/api.js'
Vue.prototype.$qs = Qs; 
Vue.prototype.$api = api;

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

// 打印
import Print from 'vue-print-nb'
Vue.use(Print); 
Vue.config.productionTip = false


//路由拦截
router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.getItem(Base64.encode("login"));
  if (!isLogin && to.path !== '/login' && to.path !== '/signPhone' && to.path !== '/signLogin' && to.path !== '/safeUser') {//无登录状态 并且切换到其他路由
      if (to.path !== '/login') {
          next('/login');
      }else {
          next();
      }
  }else {
    return next();
  }
});
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
//刷新保存状态
if (sessionStorage.getItem("store")) {
  store.replaceState(
      Object.assign(
          {},
          store.state,
          JSON.parse(sessionStorage.getItem("store"))
      )
  );
  sessionStorage.removeItem("store")
}

//监听，在页面刷新时将vuex里的信息保存到sessionStorage里
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("store", JSON.stringify(store.state));
});