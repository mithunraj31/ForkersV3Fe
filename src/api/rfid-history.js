import request from '@/utils/request'

export function fetchRfid(query) {
  return request({
    url: `/rfid?perPage=${query.limit}&page=${query.page}`,
    method: 'get'
  })
}

export function findrfIdHistory(rfid, query) {
  return request({
    url: `/rfid/history/${rfid}?perPage=${query.limit}&page=${query.page}`,
    method: 'get'
  })
}

export function assignOperator(rfid) {
  const data = {
    rfid: rfid.rfid,
    operator_id: rfid.operatorId
  }
  return request({
    url: `/rfid/history/assign`,
    method: 'post',
    data
  })
}

export function removeOperator(rfid) {
  return request({
    url: `/rfid/history/remove/${rfid}`,
    method: 'delete'
  })
}

export function deleteRfid(id) {
  return request({
    url: `/rfid/${id}`,
    method: 'delete'
  })
}
