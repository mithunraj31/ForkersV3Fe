import request from '@/utils/request'

export function fetchRfid(query) {
  return request({
    url: `/rfid?perPage=${query.limit}&page=${query.page}`,
    method: 'get'
  })
}

export function fetchRfidById(id) {
  return request({
    url: `/rfid/${id}`,
    method: 'get'
  })
}

export function newRfid(rfid) {
  const data = {
    rfid: rfid.rfid
  }
  return request({
    url: `/rfid`,
    method: 'post',
    data
  })
}

export function editRfid(rfid) {
  const data = {
    id: rfid.id,
    rfid: rfid.rfid
  }
  return request({
    url: `/rfid/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteRfid(id) {
  return request({
    url: `/rfid/${id}`,
    method: 'delete'
  })
}
