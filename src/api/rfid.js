import request from '@/utils/request'

export function fetchRfid(query, customerId = null) {
  let params = ''
  if (query.limit === 0) {
    params = `unAssigned=${query.unAssigned}&assigned=${query.assigned}`
  } else if (query) {
    params = `perPage=${query.limit}&page=${query.page}&unAssigned=${query.unAssigned}&assigned=${query.assigned}`
  }

  if (customerId) {
    params += `&customer_id=${customerId}`
  }

  return request({
    url: `/rfid?${params}`,
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
    id: rfid.id,
    customer_id: rfid.customerId
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
    customer_id: rfid.customerId
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

export function assignOperator(rfid) {
  return request({
    url: `rfid/${rfid.rfid}/assign/operator/${rfid.operatorId}`,
    method: 'put'
  })
}

export function findrfIdHistory(rfid, query) {
  return request({
    url: `/rfid/${rfid}/history?perPage=${query.limit}&page=${query.page}`,
    method: 'get'
  })
}

export function removeOperator(rfid, operatorId) {
  return request({
    url: `rfid/${rfid}/remove/operator/${operatorId}`,
    method: 'put'
  })
}

