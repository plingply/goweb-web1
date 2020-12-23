import request from '@/utils/request'

export function getStudentList(params, data) {
  return request({
    url: '/api/student/list',
    method: 'get',
    params,
    data
  })
}

export function studentUpdate(params, data) {
  return request({
    url: '/api/student/update',
    method: 'post',
    params,
    data
  })
}

export function studentCreate(params, data) {
  return request({
    url: '/api/student/create',
    method: 'post',
    params,
    data
  })
}
