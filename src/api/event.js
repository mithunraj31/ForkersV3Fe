import request from '@/utils/request'

export function fetchEventSummary() {
  return request({
    url: '/events/summary',
    method: 'get'
  })
}
