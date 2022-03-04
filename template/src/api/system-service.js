/*
 * @Description: 系统管理服务
 * @Version: 1.0
 * @Autor: jiajun wu
 * @Date: 2022-03-02 17:46:09
 * @LastEditors: jiajun wu
 * @LastEditTime: 2022-03-02 17:59:57
 */
import { axios } from '@/utils/request'

//login
export function login(data) {
  return axios.login({
    url: `/login`,
    method: 'post',
    data
  })
}

//isAuthed
export function isAuthed(data) {
  return axios.login({
    url: `/isAuthed`,
    method: 'post',
    data
  })
}
