import request from '@/utils/request'

export function fetchVehicleModels(listQuery, manufacturerId = null) {
  let params = ''
  if (listQuery) {
    params = `?perPage=${listQuery.limit}&page=${listQuery.page}`
  } else {
    params = `?perPage=${1000}`
  }

  if (manufacturerId) {
    params += `&manufacturer_id=${manufacturerId}`
  }
  return request({
    url: `/vehicle-models${params}`,
    method: 'get'
  })
}

export function fetchVehicleModelById(id) {
  return request({
    url: `/vehicle-models/${id}`,
    method: 'get'
  })
}

export function newVehicleModels(data) {
  return request({
    url: '/vehicle-models',
    method: 'post',
    data: {

    }
  })
}

export function editVehicleModel(data) {
  return request({
    url: `/vehicle-models/${data.id}`,
    method: 'post',
    data: {
      'id': data.id
    }
  })
}

export function deleteVehicleModel(id) {
  return request({
    url: `/vehicle-models/${id}`,
    method: 'delete'
  })
}
