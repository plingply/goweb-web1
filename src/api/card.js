import request from '@/utils/request'

export function getCardList(params, data) {
  return request({
    url: '/api/card/list',
    method: 'get',
    params,
    data
  })
}

export function cardUpdate(params, data) {
  return request({
    url: '/api/card/update',
    method: 'post',
    params,
    data
  })
}

export function cardCreate(params, data) {
  return request({
    url: '/api/card/create',
    method: 'post',
    params,
    data
  })
}

export function getCardSimpleList(params, data) {
  return request({
    url: '/api/card/simple/list',
    method: 'get',
    params,
    data
  })
}
