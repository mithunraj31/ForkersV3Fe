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

export function deleteUser() {
  return new Promise((resolve, reject) => {
    resolve()
  })
}

export function fetchUserById() {

}

export function isEmailAlreadyRegistered() {

}

export function newUser() {

}

export function editUser() {

}
