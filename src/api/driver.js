import request from '@/utils/request'

export function fetchDrivers(query, customerId = null) {
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
    url: `/operators?${params}`,
    method: 'get'
  })
}

export function fetchDriverById(id) {
  return request({
    url: `/operators/${id}`,
    method: 'get'
  })
}

export function newDriver(driver) {
  const data = {
    name: driver.name,
    dob: driver.dob,
    address: driver.address,
    license_no: driver.licenseNo,
    license_received_date: driver.licenseReceived,
    license_renewal_date: driver.licenseRenewal,
    license_location: driver.licenseLocation,
    phone_no: driver.phoneNo
  }

  if (driver.customerId) {
    data.customer_id = driver.customerId
  }

  return request({
    url: `/operators`,
    method: 'post',
    data
  })
}

export function editDriver(driver) {
  const data = {
    id: driver.id,
    operator_id: driver.operatorId,
    name: driver.name,
    dob: driver.dob,
    address: driver.address,
    license_no: driver.licenseNo,
    license_received_date: driver.licenseReceived,
    license_renewal_date: driver.licenseRenewal,
    license_location: driver.licenseLocation,
    phone_no: driver.phoneNo

  }

  if (driver.customerId) {
    data.customer_id = driver.customerId
  }

  return request({
    url: `/operators/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteDriver(id) {
  return request({
    url: `/operators/${id}`,
    method: 'delete'
  })
}

export function removeRFID(id, rfid) {
  return request({
    url: `/operators/${id}/remove/rfid/${rfid}`,
    method: 'put'
  })
}

export function assignRfid(data) {
  return request({
    url: `/operators/${data.id}/assign/rfid/${data.rfid}`,
    method: 'put'
  })
}

