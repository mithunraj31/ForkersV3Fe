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
  }
}
