import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { Toast } from 'vant'
import config from '@/config/defaultSettings'

// 创建 axios 实例
const service = axios.create({
  baseURL: config.context, // api base_url
  timeout: 60000 // 请求超时时间
})

const err = error => {
  if (error.response) {
    // const data = error.response.data
    const token = Vue.ss.get(ACCESS_TOKEN)
    if (error.response.status === 404) {
      Toast.fail('NotFound')
    } else if (error.response.status === 403) {
      Toast.fail('Forbidden')
    } else if (error.response.status === 402) {
      Toast.fail('License验证失败')
    } else if (error.response.status === 401) {
      Toast.fail('Unauthorized')
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    } else if (error.response.status === 400) {
      Toast.fail('Bad Request')
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ss.get(ACCESS_TOKEN)
  if (token) {
    Vue.ck.set(ACCESS_TOKEN, token)
    // config.headers[ACCESS_TOKEN] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    // config.headers[ACCESS_TOKEN] = 'Bearer ' + token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  config.headers['X-Axios-With'] = true
  return config
}, err)

// response interceptor
service.interceptors.response.use(response => {
  if (response.data === '') {
    store.dispatch('Logout').then(() => {
      setTimeout(() => {
        window.location.reload()
      }, 500)
    })
  } else {
    return response.data
  }
}, err)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service)
  }
}


// 注册外部rest axios服务
Object.keys(config.extServer).forEach(key => {

  let extService = axios.create({
    baseURL: config.extServer[key], // api base_url
    timeout: 60000 // 请求超时时间
  })

  // request interceptor
  extService.interceptors.request.use(config => {
    const token = Vue.ss.get(ACCESS_TOKEN)
    if (token) {
      Vue.ck.set(ACCESS_TOKEN, token)
    }
    config.headers['X-Axios-With'] = true
    return config
  }, err)

  // response interceptor
  extService.interceptors.response.use((response) => {
    if (response.status === 402) {
      // notification.error({
      //   message: 'License验证失败',
      //   description: data.message
      // })
      console.log('error:402')
    }
    return response.data
  }, err)

  service[key] = extService
})

export { installer as VueAxios, service as axios }
