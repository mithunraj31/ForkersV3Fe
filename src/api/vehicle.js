import request from '@/utils/request'
import { convertStrLocalDatetimeToUtc, convertStrUtcToLocalDatetime } from '@/utils'

function convertDriveData(x) {
  if (x.engine_started_at !== null) {
    x.engine_started_at = convertStrUtcToLocalDatetime(x.engine_started_at)
  }

  if (x.engine_stoped_at !== null) {
    x.engine_stoped_at = convertStrUtcToLocalDatetime(x.engine_stoped_at)
  }

  if (x.driver_data && x.driver_data.length > 0) {
    x.driver_data = x.driver_data.map(drive => {
      drive.engine_started_at = convertStrUtcToLocalDatetime(drive.engine_started_at)
      drive.drive_ended_at = convertStrUtcToLocalDatetime(drive.drive_ended_at)
      return drive
    })
  }

  return x
}

export function fetchVehicles(listQuery) {
  let params = ''
  if (listQuery) {
    params = `?perPage=${listQuery.limit}&page=${listQuery.page}`
  } else {
    params = `?perPage=${1000}`
  }

  return request({
    url: `/vehicles${params}`,
    method: 'get'
  })
}

export function fetchVehicleById(id) {
  return request({
    url: `/vehicles/${id}`,
    method: 'get'
  })
}

export function newVehicle(data) {
  return request({
    url: '/vehicles',
    method: 'post',
    data: {

    }
  })
}

export function editVehicle(data) {
  return request({
    url: `/vehicles/${data.id}`,
    method: 'post',
    data: {
      'id': data.id
    }
  })
}

export function deleteVehicle(id) {
  return request({
    url: `/vehicles/${id}`,
    method: 'delete'
  })
}

export function fetchDriveRoute(deviceId, startTime, endTime) {
  const startDatetimeUtc = convertStrLocalDatetimeToUtc(startTime)
  const endDatetimeUtc = convertStrLocalDatetimeToUtc(endTime)

  return request({
    url: `/vehicles/${deviceId}/route?start=${startDatetimeUtc}&end=${endDatetimeUtc}`,
    method: 'get'
  })
}

export function fetchDriveSummery(deviceId, startTime, endTime) {
  const startDatetimeUtc = convertStrLocalDatetimeToUtc(startTime)
  const endDatetimeUtc = convertStrLocalDatetimeToUtc(endTime)

  return request({
    url: '/vehicles/' + deviceId + '/driveSummary?start=' + startDatetimeUtc + '&end=' + endDatetimeUtc,
    method: 'get',
    transformResponse: [function(response) {
      const res = JSON.parse(response)
      const { data } = res
      if (!data || data.length === 0) {
        return res
      }
      data.map(convertDriveData)
      return res
    }]
  })
}
