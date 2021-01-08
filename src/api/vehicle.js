import request from '@/utils/request'

export function fetchVehicles(listQuery) {
  let params = ''
  if (listQuery) {
    params = `?perPage=${listQuery.limit}&page=${listQuery.page}`
  } else {
    params = `?perPage=${1000}`
  }

  return request({
    url: `/vehicles${params}`,
    method: 'get'
  })
}

export function fetchVehicleById(id) {
  return request({
    url: `/vehicles/${id}`,
    method: 'get'
  })
}

export function newVehicle(data) {
  return request({
    url: '/vehicles',
    method: 'post',
    data: {

    }
  })
}

export function editVehicle(data) {
  return request({
    url: `/vehicles/${data.id}`,
    method: 'post',
    data: {
      'id': data.id
    }
  })
}

export function deleteVehicle(id) {
  return request({
    url: `/vehicles/${id}`,
    method: 'delete'
  })
}
