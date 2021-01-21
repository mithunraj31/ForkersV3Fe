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
  }
}
