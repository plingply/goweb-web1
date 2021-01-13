import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function getInfo(params) {
  return request({
    url: '/api/user/info',
    method: 'get',
    params
  })
}

export function logout() {
  return request({
    url: '/api/user/signout',
    method: 'post'
  })
}
