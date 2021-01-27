import request from '@/utils/request'

export function fetchCharts() {
  return request({
    url: `/charts`,
    method: 'get'
  })
}

export function newChart(data) {
  return request({
    url: '/charts',
    method: 'post',
    data: {
      'name': data.name,
      'type': data.template,
      'api_path': data.apiPath,
      'is_private': data.isPrivate
    }
  })
}

export function editChart(data) {
  return request({
    url: `/charts/${data.id}`,
    method: 'put',
    data: {
      'name': data.name,
      'type': data.type,
      'api_path': data.apiPath,
      'is_private': data.isPrivate
    }
  })
}

export function fetchChartsById(id) {
  return request({
    url: `/charts/${id}`,
    method: 'get'
  })
}

export function deleteChart(id) {
  return request({
    url: `/charts/${id}`,
    method: 'delete'
  })
}
