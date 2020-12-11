import request from '@/utils/request'
import { convertStrLocalDatetimeToUtc } from '@/utils'

export function makeVideo(maker) {
  return request({
    url: '/videos',
    method: 'post',
    data: {
      'device_id': maker.deviceId,
      'begin_datetime': convertStrLocalDatetimeToUtc(maker.beginDatetime),
      'end_datetime': convertStrLocalDatetimeToUtc(maker.endDatetime),
      'stk_user': 'mbel' // auth module not implemented yet
    }
  })
}
