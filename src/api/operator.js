import request from '@/utils/request'

export function fetchOperatorDriveSummary(operatorId, start, end) {
  return request({
    url: '/operators/' + operatorId + '/driveSummary?start=' + start + '&end=' + end,
    method: 'get'
  })
}

export function fetchOperatorEvents(operatorId, start, end) {
  return request({
    url: '/operators/' + operatorId + '/events?start=' + start + '&end=' + end,
    method: 'get'
  })
}
