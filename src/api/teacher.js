import request from '@/utils/request'

export function getTeacherList(params, data) {
  return request({
    url: '/api/teacher/list',
    method: 'get',
    params,
    data
  })
}

export function teacherUpdate(params, data) {
  return request({
    url: '/api/teacher/update',
    method: 'post',
    params,
    data
  })
}

export function teacherCreate(params, data) {
  return request({
    url: '/api/teacher/create',
    method: 'post',
    params,
    data
  })
}
