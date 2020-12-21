import request from '@/utils/request'

export function fetchUsers(listQuery) {
  let params = ''
  if (listQuery) {
    params = `?perPage${listQuery.limit}&page=${listQuery.page}`
  } else {
    params = '?perPage=1000'
  }
  return request({
    url: `/users${params}`,
    method: 'get'
  })
}

export function deleteUser(id) {
  return request({
    url: `/users/${id}`,
    method: 'delete'
  })
}

export function fetchUserById(id) {
  return request({
    url: `/users/${id}`,
    method: 'get'
  })
}

// export function isEmailAlreadyRegistered() {

// }

export function newUser(data) {
  return request({
    url: `/users`,
    method: 'post',
    data: {
      first_name: data.firstName,
      last_name: data.lastName,
      username: data.username,
      customer_id: data.customerId,
      role_id: data.roleId,
      sys_role: data.sysRole,
      password: data.password
    }
  })
}

export function editUser(data) {
  return request({
    url: `/users/${data.id}`,
    method: 'put',
    data: {
      id: data.id,
      first_name: data.firstName,
      last_name: data.lastName,
      username: data.username,
      customer_id: data.customerId,
      role_id: data.roleId,
      sys_role: data.sysRole,
      password: data.password
    }
  })
}
