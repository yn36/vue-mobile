/*
 * @Description: 移动端入口配置
 * @Version: 1.0
 * @Autor: jiajun wu
 * @Date: 2022-03-02 17:46:09
 * @LastEditors: jiajun wu
 * @LastEditTime: 2022-03-02 17:58:02
 */
// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import bootstrap from './core/bootstrap'
import './core/use'

/*
  1.实际开发中需要解除permission的注释，
  2.并将./router/index.js中routes属性还原为静态路由
*/
// import './permission' // permission control
import './utils/filter' // global filter

//引入vant组件
import Vant from 'vant'
import 'vant/lib/index.less'
import 'vant/lib/icon/local.less'
import 'amfe-flexible'

Vue.use(Vant)

Vue.config.productionTip = false

//引入Cookies
import Cookies from 'js-cookie'

Vue.ck = Cookies

// 引入 sessionstorage
import VueSessionStorage from 'vue-sessionstorage'

Vue.use(VueSessionStorage)
Vue.ss = Vue.prototype.$session

new Vue({
  router,
  store,
  created() {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
