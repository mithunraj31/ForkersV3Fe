function generatePrivilege(moduleName) {
  return Object.freeze({
    ADD: `${moduleName}:add`,
    EDIT: `${moduleName}:edit`,
    DELETE: `${moduleName}:delete`,
    VIEW: `${moduleName}:view`
  })
}

export const RESOURCE_TYPE = Object.freeze({
  GROUP: 'group',
  USER: 'user',
  ROLE: 'role',
  DEVICE: 'device',
  EVENT: 'event',
  OPERATOR: 'operator',
  VEHICLE: 'vehicle',
  RFID: 'rfid',
  DRIVER: 'driver',
  Manufacturer: 'manufacturer'
})

export const SYSTEM_ROLE = Object.freeze({
  ADMIN: 'admin',
  USER: 'user'
})

export const RFID_PRIVILAGE = generatePrivilege(RESOURCE_TYPE.RFID)

export const DRIVER_PRIVILAGE = generatePrivilege(RESOURCE_TYPE.DRIVER)

export const GROUP_PRIVILEGE = generatePrivilege(RESOURCE_TYPE.GROUP)

export const USER_PRIVILEGE = generatePrivilege(RESOURCE_TYPE.USER)

export const DEVICE_PRIVILEGE = generatePrivilege(RESOURCE_TYPE.DEVICE)

export const EVENT_PRIVILEGE = generatePrivilege(RESOURCE_TYPE.EVENT)

export const OPERATOR_PRIVILEGE = generatePrivilege(RESOURCE_TYPE.OPERATOR)

export const ROLE_PRIVILEGE = generatePrivilege(RESOURCE_TYPE.ROLE)

export const VEHICLE_PRIVILEGE = generatePrivilege(RESOURCE_TYPE.VEHICLE)

export const MANUFACTURER_PRIVILEGE = generatePrivilege(RESOURCE_TYPE.Manufacturer)
