import request from '@/utils/request'

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
    method: 'get'
  })
}

export function fetchEventsVideoById(eventId) {
  return request({
    url: `/events/video/${eventId}`,
    method: 'get'
  })
}

