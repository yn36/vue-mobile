import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import { axios } from '@/utils/request'
import avatar2 from '@/assets/images/avatar2.png'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: null,
    permis: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar || avatar2
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
      if (info) {
        state.avatar = info.photo || avatar2
        state.name = info.realName
        state.welcome = welcome()
      }
    },
    SET_PERMIS: (state, permis) => {
      state.permis = permis
    }
  },

  actions: {
    // 设置token
    setToken({ commit, state }, token) {
      commit('SET_TOKEN', token)
    },
    // 判断是否已登录
    isAuthed({ commit }) {
      return new Promise((resolve, reject) => {
        axios.login({
          url: '/isAuthed',
          method: 'post',
          data: {}
        }).then(result => {
          if (result.success) {
            Vue.ss.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            commit('SET_INFO', result.principal)
            resolve(result.token)
          } else {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            Vue.ss.remove(ACCESS_TOKEN)
            Vue.ls.remove(ACCESS_TOKEN)
            reject();
          }
        }).catch((e) => {
          reject(e);
        })
      })
    },
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        // shiro 安全认证，调用认证接口
        const data = new FormData();
        data.append('username', userInfo.username);
        data.append('pwd', userInfo.password);
        data.append('captcha', userInfo.captcha);
        axios.login({
          url: '/login',
          method: 'post',
          data: data
        }).then(result => {
          if (result.success) {
            Vue.ss.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            commit('SET_INFO', result.principal)
            resolve(result)
          } else {
            notification.error({
              message: '错误',
              description: result.message
            })
            reject();
          }
        })

      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        const fn = (response) => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Vue.ss.remove(ACCESS_TOKEN)
          Vue.ls.remove(ACCESS_TOKEN)
          Vue.ck.remove(ACCESS_TOKEN)
          Vue.ck.remove('SHRIOSESSIONID')
          resolve()
        }
        axios.login({
          url: '/logout',
          method: 'get'
        }).then(result => {
          fn(result)
        }).catch(e => {
          fn(e)
        })
      })
    },

    // 设置按钮权限
    setPermis({ commit }, permis) {
      return new Promise((resolve) => {
        commit('SET_PERMIS', permis)
        resolve()
      })
    },
  }
}

export default user
