import request from '@/utils/request'

export function fetchDrivers(query) {
  return request({
    url: `/drivers?perPage=${query.limit}&page=${query.page}`,
    method: 'get'
  })
}

export function fetchDriverById(id) {
  return request({
    url: `/drivers/${id}`,
    method: 'get'
  })
}

export function newDriver(driver) {
  const data = {
    driver_id: driver.driverId,
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
    url: `/drivers`,
    method: 'post',
    data
  })
}

export function editDriver(driver) {
  const data = {
    id: driver.id,
    driver_id: driver.driverId,
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
    url: `/drivers/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteDriver(id) {
  return request({
    url: `/drivers/${id}`,
    method: 'delete'
  })
}
