import request from '@/utils/request'

export function getSchoolList(data) {
  return request({
    url: '/api/school/list',
    method: 'get',
    data
  })
}

export function createSchool(data) {
  return request({
    url: '/api/school/create',
    method: 'post',
    data
  })
}

export function getCampusList(params, data) {
  return request({
    url: '/api/school/campus/list',
    method: 'get',
    params,
    data
  })
}

export function campusUpdate(params, data) {
  return request({
    url: '/api/school/campus/update',
    method: 'post',
    params,
    data
  })
}

export function campusCreate(params, data) {
  return request({
    url: '/api/school/campus/create',
    method: 'post',
    params,
    data
  })
}

export function getCampusSimpleList(params, data) {
  return request({
    url: '/api/school/campus/simple/list',
    method: 'get',
    params,
    data
  })
}

export function getCityList(id, params, data) {
  return request({
    url: `/api/city/${id}`,
    method: 'get',
    params,
    data
  })
}
