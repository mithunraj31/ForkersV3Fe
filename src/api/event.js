import request from '@/utils/request'
import { convertStrUtcToLocalDatetime } from '@/utils'

export function fetchEventSummary() {
  return request({
    url: '/events/summary',
    method: 'get'
  })
}

export function fetchEvents(query) {
  return request({
    url: `/events?perPage=${query.limit}&page=${query.page}`,
    method: 'get'
  })
}

export function fetchEventsById(eventId) {
  return request({
    url: `/events/${eventId}`,
    method: 'get',
    transformResponse: [(response) => {
      const res = JSON.parse(response)
      const { data } = res
      if (!data || data.length !== 1) {
        return res
      }
      const singleData = data[0]
      const localDatetime = convertStrUtcToLocalDatetime(singleData.time)
      singleData.time = localDatetime
      res.data = singleData
      return res
    }]
  })
}

export function fetchEventsVideoById(eventId) {
  return request({
    url: `/events/video/${eventId}`,
    method: 'get'
  })
}

