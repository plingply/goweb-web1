/*
 * @Author: 彭林
 * @Date: 2020-12-25 11:51:43
 * @LastEditTime: 2020-12-29 13:19:03
 * @LastEditors: 彭林
 * @Description:
 * @FilePath: /goweb-web1/src/api/course.js
 */

import request from '@/utils/request'

export function getCourseList(params, data) {
  return request({
    url: '/api/course/list',
    method: 'get',
    params,
    data
  })
}

export function checkPaikeConflict(params, data) {
  return request({
    url: '/api/course/check',
    method: 'post',
    params,
    data
  })
}
