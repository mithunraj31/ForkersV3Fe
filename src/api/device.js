import request from '@/utils/request'

export function fetchDevices(listQuery) {
  let params = ''
  if (listQuery) {
    params = `perPage=${listQuery.limit}&page=${listQuery.page}`
  } else {
    params = `perPage=1000`
  }
  return request({
    url: `/devices?${params}`,
    method: 'get'
  })
}

export function fetchDriveSummery(deviceId, startTime, endTime) {
  return request({
    url: '/devices/' + deviceId + '/driveSummary?start=' + startTime + '&end=' + endTime,
    method: 'get'
  })
}

export function fetchEventsByDeviceIdAndTime(deviceId, startTime, endTime) {
  return request({
    url: '/events/?deviceId=' + deviceId + '&start=' + startTime + '&end=' + endTime,
    method: 'get'
  })
}

export function fetchDriveRoute(deviceId, startTime, endTime) {
  return request({
    url: '/devices/' + deviceId + '/route?start=' + startTime + '&end=' + endTime,
    method: 'get'
  })
}
