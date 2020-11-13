import request from '@/utils/request'

export function fetchDevices() {
  return request({
    url: '/devices?perPage=10000',
    method: 'get'
  })
}

export function fetchDriveSummery(deviceId, startTime, endTime) {
  return request({
    url: '/devices/driveSummary?deviceId=' + deviceId + '&start=' + startTime + '&end=' + endTime,
    method: 'get'
  })
}

export function fetchEventsByDeviceIdAndTime(deviceId, startTime, endTime) {
  return request({
    url: '/events/?deviceId=' + deviceId + '&start=' + startTime + '&end=' + endTime,
    method: 'get'
  })
}
