import request from '@/utils/request'

export function fetchStatus(query) {
  return request({
    // url: `/users?perPage=${query.limit}&page=${query.page}`,
    url: '/vue-element-admin/vehicle/satus',
    method: 'get'
  })
}
