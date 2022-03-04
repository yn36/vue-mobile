import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
// import config from '@/config/defaultSettings'
import { Toast } from 'vant'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar

  // token参数处理
  const token = to.query.token || from.query.token;
  if (token) {
    const flag = Vue.ss.get(ACCESS_TOKEN) != token;
    Vue.ss.set(ACCESS_TOKEN, token);
    store.dispatch('setToken', token);
    if (flag) {
      store.dispatch('isAuthed');
    }
  }

  // 设置页面标题
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  // 令牌验证
  if (Vue.ss.get(ACCESS_TOKEN)) {
    /* has token */
    if (to.path === '/login') {
      next({ path: '/home' })
      NProgress.done()
    } else {
      // 如果已认证，并且又请求登录页面，则返回首页
      if (to.path === '/login') {
        next({ path: '/' })
        NProgress.done()
        return;
      }

      // 判断前端是否获取到用户信息
      if (!store.getters.userInfo) {
        store.dispatch('isAuthed').then(() => {
          next({ path: to.fullPath });
        }).catch(() => {
          // 跳转到登录页面
          gotoLogin(to.fullPath)
          NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
        })
        return;
      }
      if (!store.getters.config) {
        store.dispatch('loadConfig').then(config => {

        })
      }
    }

    // 直接放行
    next();
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      // 跳转到登录页面
      next({ path: '/login', query: { redirect: to.fullPath, _useiframe: false } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *    <i-button v-action:add >添加用户</a-button>
 *    <a-button v-action:delete>删除用户</a-button>
 *    <a v-action:edit @click="edit(record)">修改</a>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
 *  - 当后台权限跟 pro 提供的模式不同时，只需要针对这里的权限过滤进行修改即可
 *
 *  @see https://github.com/sendya/ant-design-pro-vue/pull/53
 */
const action = Vue.directive('action', {
  bind: function (el, binding, vnode) {
    const actionName = binding.arg
    const btn = store.getters.permis[actionName];
    if (!btn) {
      el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none');
    }
  }
})

export {
  action
}