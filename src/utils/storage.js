/*
 * @Author: 彭林
 * @Date: 2020-12-18 17:04:28
 * @LastEditTime: 2020-12-18 17:14:21
 * @LastEditors: 彭林
 * @Description:
 * @FilePath: /goweb-web/src/utils/storage.js
 */

export default {

  ss_get(key) {
    let value = window.sessionStorage.getItem(key)
    value = value && JSON.parse(value)
    return value
  },

  ss_set(key, value) {
    value = JSON.stringify(value)
    return window.sessionStorage.setItem(key, value)
  },

  ss_rm(key) {
    return window.sessionStorage.removeItem(key)
  },

  ss_rm_all() {
    return window.sessionStorage.clear()
  },

  ls_get(key) {
    let value = window.localStorage.getItem(key)
    value = value && JSON.parse(value)
    return value
  },

  ls_set(key, value) {
    value = JSON.stringify(value)
    return window.localStorage.setItem(key, value)
  },

  ls_rm(key) {
    return window.localStorage.removeItem(key)
  },

  ls_rm_all() {
    return window.localStorage.clear()
  },

  rm() {
    window.sessionStorage.clear()
    window.localStorage.clear()
  }
}
