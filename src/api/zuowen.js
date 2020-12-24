/*
 * @Author: 彭林
 * @Date: 2020-12-24 18:22:25
 * @LastEditTime: 2020-12-24 19:11:45
 * @LastEditors: 彭林
 * @Description:
 * @FilePath: /goweb-web1/src/api/zuowen.js
 */
import request from '@/utils/request'
import qs from 'qs'
export function zuowenSync(params, data) {
  return request({
    url: '/api/zuowen/sync',
    method: 'post',
    params,
    data
  })
}

export function getZuowenInfo(params, data) {
  return request({
    url: 'https://api.xhzapp.com/api/v5/AppBook/GetZuoWenModel',
    method: 'post',
    params,
    data: qs.stringify(data, { allowDots: true })
  })
}

export function getZuowenLastId(params, data) {
  return request({
    url: '/api/zuowen/lastid',
    method: 'get',
    params,
    data
  })
}

export function getZuowenList(params, data) {
  return request({
    url: '/api/zuowen/list',
    method: 'get',
    params,
    data
  })
}
