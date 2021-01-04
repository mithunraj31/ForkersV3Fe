import request from '@/utils/request'

export function fetchRoles(listQuery) {
  let params = ''
  if (listQuery) {
    params = `perPage${listQuery.limit}&page=${listQuery.page}`
  } else {
    params = 'perPage=1000'
  }
  return request({
    url: `/roles?${params}`,
    method: 'get'
  })
}

export function fetchRoleById(id) {
  return request({
    url: `/roles/${id}`,
    method: 'get'
  })
}

export function newRole(data) {
  const body = data
  if (body.customerId) {
    body.customer_id = data.customerId
  }
  return request({
    url: `/roles`,
    method: 'post',
    data: body
  })
}

export function editRole(data) {
  return request({
    url: `/roles/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/roles/${id}`,
    method: 'delete'
  })
}

