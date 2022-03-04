// eslint-disable-next-line
import { BasicLayout, BlankLayout } from '@/layouts'

// 404
export const pageNotFound = {
  path: '/404',
  name: '404',
  component: () => import(/* webpackChunkName: "fail" */ '@/views/404'),
  meta: { title: '404' },
  hidden: true
}

/**
 * 动态路由
 * hiddenHeader:是否隐藏顶部导航
 * visibleTabBar 是否显示底部导航
 */
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: BasicLayout,
    meta: { title: 'ROOT' },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home.vue'),
        name: 'home',
        meta: { title: '首页', keepAlive: false, }
      },
      {
        path: '/mine',
        component: () => import('@/views/mine.vue'),
        name: 'mine',
        meta: { title: '我的', keepAlive: false, }
      },
      {
        path: '/search-list',
        component: () => import('@/views/search-list/index'),
        name: 'search-list',
        meta: { title: '搜索列表', keepAlive: false, }
      },
      pageNotFound
    ]
  },

  // 异常页面组件
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
  path: '/login',
  name: 'login',
  hidden: true,
  component: () => import('@/views/login'),
  meta: {
    title: '用户登录',
    keepAlive: false,
    hiddenHeader: false
  }
}]