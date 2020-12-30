import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'

const service = axios.create({
  baseURL: '',
  timeout: 30000,
  withCredentials: false
})

service.interceptors.request.use(
  config => {
    if (config.url.indexOf('api.xhzapp.com') === -1) {
      if (store.getters.token) {
        config.headers['token'] = getToken()
      }
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.request.responseURL.indexOf('api.xhzapp.com') > -1) {
      return res
    }

    if (res.code !== 0) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          'You have been logged out, you can cancel to stay on this page, or log in again',
          'Confirm logout',
          {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        )
          .then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
          .catch(() => {
            removeToken()
            window.location = '/'
          })
      }
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
