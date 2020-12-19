import request from '@/utils/request'

export function getSchoolList(data) {
  return request({
    url: '/api/school/list',
    method: 'get',
    data
  })
}
