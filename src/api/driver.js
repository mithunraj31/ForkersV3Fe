import request from '@/utils/request'

export function fetchDrivers(query) {
  return request({
    url: `/operators?perPage=${query.limit}&page=${query.page}`,
    method: 'get'
  })
}

export function fetchAllDrivers() {
  return request({
    url: `/operators/all/data`,
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

export function removeRFID(id) {
  return request({
    url: `/operators/${id}/rfid/`,
    method: 'delete'
  })
}

export function assignRfid(ids) {
  const data = {
    rfid: ids.rfid,
    id: ids.id
  }
  return request({
    url: `/operators/assign`,
    method: 'post',
    data
  })
}
