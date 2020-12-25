/*
 * @Author: 彭林
 * @Date: 2020-12-25 14:57:29
 * @LastEditTime: 2020-12-25 15:08:18
 * @LastEditors: 彭林
 * @Description:
 * @FilePath: /goweb-web1/src/api/peotry.js
 */
import request from '@/utils/request'
import qs from 'qs'
export function peotrySync(params, data) {
  return request({
    url: '/api/peotry/sync',
    method: 'post',
    params,
    data
  })
}

export function getPeotryInfo(params, data) {
  return request({
    url: 'https://api.xhzapp.com/api/v5/AppBook/GetShiWenModel',
    method: 'post',
    params,
    data: qs.stringify(data, { allowDots: true })
  })
}

export function getPeotryLastId(params, data) {
  return request({
    url: '/api/peotry/lastid',
    method: 'get',
    params,
    data
  })
}

export function getPeotryList(params, data) {
  return request({
    url: '/api/peotry/lastid',
    method: 'get',
    params,
    data
  })
}
