import request from '@/utils/request'

export function getClassList(params, data) {
  return request({
    url: '/api/class/list',
    method: 'get',
    params,
    data
  })
}

export function classUpdate(params, data) {
  return request({
    url: '/api/class/update',
    method: 'post',
    params,
    data
  })
}

export function classCreate(params, data) {
  return request({
    url: '/api/class/create',
    method: 'post',
    params,
    data
  })
}

export function getClassSimpleList(params, data) {
  return request({
    url: '/api/class/simple/list',
    method: 'get',
    params,
    data
  })
}

export function getClassMemberList(params, data) {
  return request({
    url: '/api/class/member/list',
    method: 'get',
    params,
    data
  })
}
