import request from '@/utils/request'

export function newGroup(data) {
  return request({
    url: '/groups',
    method: 'post',
    data: {
      customer_id: data.customerId,
      name: data.name,
      description: data.description,
      parent_id: data.parentId
    }
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
  return request({
    url: `/groups/${data.id}`,
    method: 'put',
    data: {
      id: data.id,
      customer_id: data.customerId,
      name: data.name,
      description: data.description,
      parent_id: data.parentId
    }
  })
}
