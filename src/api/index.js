export function httpGet(apiRoute) {
  if (apiRoute === '/data-summary/operator-driving-time') {
    return new Promise(resolve => {
      resolve({
        data: [
          {
            'operator': {
              'id': 1,
              'name': 'A',
              'customer': {},
              'rfid': {}
            },
            'driving_time': 263
          },
          {
            'operator': {
              'id': 2,
              'name': 'B',
              'customer': {},
              'rfid': {}
            },
            'driving_time': 233
          },
          {
            'operator': {
              'id': 3,
              'name': 'C',
              'customer': {},
              'rfid': {}
            },
            'driving_time': 1226
          }
        ]
      })
    })
  } else if (apiRoute === '/data-summary/vehicle-group-maintenance') {
    return new Promise(resolve => {
      resolve({
        data: [
          {
            'group': {
              'id': 1,
              'name': 'A'
            },
            'number_of_vehicle': 15
          },
          {
            'group': {
              'id': 2,
              'name': 'B'
            },
            'number_of_vehicle': 9
          },
          {
            'group': {
              'id': 3,
              'name': 'C'
            },
            'number_of_vehicle': 30
          }
        ]
      })
    })
  } else if (apiRoute === '/data-summary/alarms/vehicle') {
    return new Promise(resolve => {
      resolve({
        data: [
          {
            'summary_date': '2021/01/16',
            'groups': [
              {
                'vehicle_group': {
                  'id': 1,
                  'name': 'A'
                },
                'alarm_count': 200,
                'running_time': 20
              },
              {
                'vehicle_group': {
                  'id': 2,
                  'name': 'B'
                },
                'alarm_count': 230,
                'running_time': 10
              },
              {
                'vehicle_group': {
                  'id': 3,
                  'name': 'C'
                },
                'alarm_count': 215,
                'running_time': 30
              }
            ]
          },
          {
            'summary_date': '2021/01/17',
            'groups': [
              {
                'vehicle_group': {
                  'id': 1,
                  'name': 'A'
                },
                'alarm_count': 63,
                'running_time': 36
              },
              {
                'vehicle_group': {
                  'id': 2,
                  'name': 'B'
                },
                'alarm_count': 2,
                'running_time': 1
              },
              {
                'vehicle_group': {
                  'id': 3,
                  'name': 'C'
                },
                'alarm_count': 63,
                'running_time': 62
              }
            ]
          }
        ]
      })
    })
  } else if (apiRoute === '/api/v1/data-summary/event/operators') {
    return new Promise(resolve => {
      resolve({
        'data': [
          {
            'operator': {
              'id': 1,
              'name': '#1'
            },
            'event_summary': {
              'handle_left': 52,
              'handle_right': 32,
              'acceleration​': 20,
              'deacceleration​': 36,
              'accident': 2
            },
            'running_time': 255
          },
          {
            'operator': {
              'id': 2,
              'name': '#2'
            },
            'event_summary': {
              'handle_left': 9,
              'handle_right': 8,
              'acceleration​': 20,
              'deacceleration​': 36,
              'accident': 2
            },
            'running_time': 266
          },
          {
            'operator': {
              'id': 3,
              'name': '#3'
            },
            'event_summary': {
              'handle_left': 85,
              'handle_right': 32,
              'acceleration​': 20,
              'deacceleration​': 65,
              'accident': 0
            },
            'running_time': 852
          }
        ],
        'remarks': {
          'api': {
            'http_method': 'GET',
            'url': '/api/v1/data-summary/event/operators',
            'params': {
              'start': '2021-01-05',
              'end': '2021-01-18',
              'customer_id': 1,
              'operator_ids': [51, 59, 62]
            }
          },
          'comment': 'running_time property is number of second'
        }
      })
    })
  } else if (apiRoute === '/api/v1/data-summary/event/vehicles') {
    return new Promise(resolve => {
      resolve({
        'data': [
          {
            'vehicle': {
              'id': 1,
              'name': '#1'
            },
            'event_summary': {
              'handle_left': 52,
              'handle_right': 32,
              'acceleration​': 20,
              'deacceleration​': 36,
              'accident': 2
            },
            'running_time': 255
          },
          {
            'vehicle': {
              'id': 2,
              'name': '#2'
            },
            'event_summary': {
              'handle_left': 9,
              'handle_right': 8,
              'acceleration​': 20,
              'deacceleration​': 36,
              'accident': 2
            },
            'running_time': 266
          },
          {
            'vehicle': {
              'id': 3,
              'name': '#3'
            },
            'event_summary': {
              'handle_left': 85,
              'handle_right': 32,
              'acceleration​': 20,
              'deacceleration​': 65,
              'accident': 0
            },
            'running_time': 852
          }
        ],
        'remarks': {
          'api': {
            'http_method': 'GET',
            'url': '/api/v1/data-summary/event/vehicles',
            'params': {
              'start': '2021-01-05',
              'end': '2021-01-18',
              'customer_id': 1,
              'vehiclesids': [51, 59, 62]
            }
          },
          'comment': 'running_time property is number of second'
        }
      })
    })
  } else if (apiRoute === '/api/v1/data-summary/event/vehicle-groups') {
    return new Promise(resolve => {
      resolve({
        'data': [
          {
            'vehicle_group': {
              'id': 1,
              'name': '#1',
              'number_of_vehicle': 10
            },
            'event_summary': {
              'handle_left': 52,
              'handle_right': 32,
              'acceleration​': 20,
              'deacceleration​': 36,
              'accident': 2
            },
            'running_time': 255
          },
          {
            'vehicle_group': {
              'id': 2,
              'name': '#2',
              'number_of_vehicle': 6
            },
            'event_summary': {
              'handle_left': 9,
              'handle_right': 8,
              'acceleration​': 20,
              'deacceleration​': 36,
              'accident': 2
            },
            'running_time': 266
          },
          {
            'vehicle_group': {
              'id': 3,
              'name': '#3',
              'number_of_vehicle': 200
            },
            'event_summary': {
              'handle_left': 85,
              'handle_right': 32,
              'acceleration​': 20,
              'deacceleration​': 65,
              'accident': 0
            },
            'running_time': 852
          }
        ],
        'remarks': {
          'api': {
            'http_method': 'GET',
            'url': '/api/v1/data-summary/event/vehicle-groups',
            'params': {
              'start': '2021-01-05',
              'end': '2021-01-18',
              'customer_id': 1,
              'group_ids': [51, 59, 62]
            }
          },
          'comment': 'running_time property is number of second'
        }
      })
    })
  } else if (apiRoute === '/api/v1/data-summary/alarms/operators') {
    return new Promise(resolve => {
      resolve({
        'data': [
          {
            'summary_date': '2021/01/16',
            'event_summary': {
              'handle_left': 52,
              'handle_right': 32,
              'acceleration​': 20,
              'deacceleration​': 36,
              'accident': 2
            },
            'running_time': 255
          },
          {
            'summary_date': '2021/01/17',
            'event_summary': {
              'handle_left': 9,
              'handle_right': 8,
              'acceleration​': 20,
              'deacceleration​': 36,
              'accident': 2
            },
            'running_time': 266
          },
          {
            'summary_date': '2021/01/18',
            'event_summary': {
              'handle_left': 85,
              'handle_right': 32,
              'acceleration​': 20,
              'deacceleration​': 65,
              'accident': 0
            },
            'running_time': 852
          }
        ],
        'remarks': {
          'api': {
            'http_method': 'GET',
            'url': '/api/v1/data-summary/alarms/operators',
            'params': {
              'start': '2021-01-05',
              'end': '2021-01-18',
              'customer_id': 1
            }
          },
          'comment': 'running_time property is number of second'
        }
      })
    })
  } else if (apiRoute === '/api/v1/data-summary/alarms/vehicle') {
    return new Promise(resolve => {
      resolve({
        'data': [
          {
            'summary_date': '2021/01/16',
            'event_summary': {
              'handle_left': 52,
              'handle_right': 32,
              'acceleration​': 20,
              'deacceleration​': 36,
              'accident': 2
            },
            'running_time': 255
          },
          {
            'summary_date': '2021/01/17',
            'event_summary': {
              'handle_left': 9,
              'handle_right': 8,
              'acceleration​': 20,
              'deacceleration​': 36,
              'accident': 2
            },
            'running_time': 266
          },
          {
            'summary_date': '2021/01/18',
            'event_summary': {
              'handle_left': 85,
              'handle_right': 32,
              'acceleration​': 20,
              'deacceleration​': 65,
              'accident': 0
            },
            'running_time': 852
          }
        ],
        'remarks': {
          'api': {
            'http_method': 'GET',
            'url': '/api/v1/data-summary/alarms/vehicle',
            'params': {
              'start': '2021-01-05',
              'end': '2021-01-18',
              'customer_id': 1
            }
          },
          'comment': 'running_time property is number of second'
        }
      })
    })
  }
}
