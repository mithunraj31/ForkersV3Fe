import request from '@/utils/request'

export function fetchRoles(customerId, listQuery) {
  customerId = customerId || ''
  let params = `?customer_id=${customerId}`
  if (listQuery) {
    params += `&perPage${listQuery.limit}&page=${listQuery.page}`
  } else {
    params += '&perPage=1000'
  }
  return request({
    url: `/roles${params}`,
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
  return request({
    url: `/roles`,
    method: 'post',
    data: {
      ...data,
      customer_id: data.customerId
    }
  })
}

export function editRole(data) {
  return request({
    url: `/roles/${data.id}`,
    method: 'put',
    data: {
      ...data,
      customer_id: data.customerId
    }
  })
}

export function deleteRole(id) {
  return request({
    url: `/roles/${id}`,
    method: 'delete'
  })
}

