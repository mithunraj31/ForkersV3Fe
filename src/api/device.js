import request from '@/utils/request'

export function fetchDevices() {
  return request({
    url: '/devices?perPage=10000',
    method: 'get'
  })
}
