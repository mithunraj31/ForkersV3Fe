import request from '@/utils/request'

export function fetchManufacturers(listQuery, customerId = null) {
  let params = ''
  if (listQuery) {
    params = `?perPage=${listQuery.limit}&page=${listQuery.page}`
  } else {
    params = `?perPage=${1000}`
  }

  if (customerId) {
    params += `&customer_id=${customerId}`
  }
  return request({
    url: `/manufacturers${params}`,
    method: 'get'
  })
}

export function fetchManufacturerById(id) {
  return request({
    url: `/manufacturers/${id}`,
    method: 'get'
  })
}

export function newManufacturer(data) {
  return request({
    url: '/manufacturers',
    method: 'post',
    data: {
      'name': data.name,
      'description': data.description,
      'customer_id': data.customerId || null
    }
  })
}

export function editManufacturer(data) {
  return request({
    url: `/manufacturers/${data.id}`,
    method: 'post',
    data: {
      'id': data.id,
      'name': data.name,
      'description': data.description,
      'customer_id': data.customerId || null
    }
  })
}

export function deleteManufacturer(id) {
  return request({
    url: `/manufacturers/${id}`,
    method: 'delete'
  })
}
