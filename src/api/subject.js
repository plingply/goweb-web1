import request from '@/utils/request'

export function getSubjectList(params, data) {
  return request({
    url: '/api/subject/list',
    method: 'get',
    params,
    data
  })
}

export function subjectUpdate(params, data) {
  return request({
    url: '/api/subject/update',
    method: 'post',
    params,
    data
  })
}

export function subjectCreate(params, data) {
  return request({
    url: '/api/subject/create',
    method: 'post',
    params,
    data
  })
}
