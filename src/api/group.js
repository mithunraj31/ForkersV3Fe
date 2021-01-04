import request from '@/utils/request'

export function newGroup(data) {
  const body = {
    name: data.name,
    description: data.description,
    parent_id: data.parentId
  }
  if (data.customerId) {
    body.customer_id = data.customerId
  }
  return request({
    url: '/groups',
    method: 'post',
    data: body
  })
}

export function deleteGroup(id) {
  return request({
    url: `/groups/${id}`,
    method: 'delete'
  })
}

export function fetchGroupById(id) {
  return request({
    url: `/groups/${id}`,
    method: 'get'
  })
}

export function fetchGroups() {
  return request({
    url: '/groups',
    method: 'get'
  })
}

export function editGroup(data) {
  const body = {
    id: data.id,
    name: data.name,
    description: data.description,
    parent_id: data.parentId
  }
  if (data.customerId) {
    body.customer_id = data.customerId
  }
  return request({
    url: `/groups/${data.id}`,
    method: 'put',
    data: body
  })
}

export function fetchGroupUsers(id, listQuery) {
  let params = ''
  if (listQuery) {
    params = `?perPage=${listQuery.limit}&page=${listQuery.page}`
  } else {
    params = `?perPage=${1000}`
  }
  return request({
    url: `/groups/${id}/users${params}`,
    method: 'get'
  })
}
