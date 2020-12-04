import request from '@/utils/request'

export function makeVideo(maker) {
  return request({
    url: '/videos',
    method: 'post',
    data: {
      'device_id': maker.deviceId,
      'begin_datetime': maker.beginDatetime,
      'end_datetime': maker.endDatetime,
      'stk_user': 'mbel' // auth module not implemented yet
    }
  })
}
