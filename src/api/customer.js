import request from '@/utils/request'

export function fetchCustomers(listQuery) {
  let params = ''
  if (listQuery) {
    params = `?perPage=${listQuery.limit}&page=${listQuery.page}`
  } else {
    params = `?perPage=${1000}`
  }
  return request({
    url: `/customers${params}`,
    method: 'get'
  })
}

export function newCustomer(data) {
  return request({
    url: '/customers',
    method: 'post',
    data: {
      'id': data.id,
      'name': data.name,
      'description': data.description,
      'stk_user': data.stkUser
    }
  })
}

export function editCustomer(data) {
  return request({
    url: `/customers/${data.id}`,
    method: 'put',
    data: {
      'id': data.id,
      'name': data.name,
      'description': data.description,
      'stk_user': data.stkUser
    }
  })
}

export function fetchCustomerById(id) {
  return request({
    url: `/customers/${id}`,
    method: 'get'
  })
}

export function deleteCustomer(id) {
  return request({
    url: `/customers/${id}`,
    method: 'delete'
  })
}
