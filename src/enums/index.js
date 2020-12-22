function generatePrivilege(moduleName) {
  return Object.freeze({
    ADD: `${moduleName}:add`,
    EDIT: `${moduleName}:edit`,
    DELETE: `${moduleName}:delete`,
    VIEW: `${moduleName}:delete`
  })
}

export const RESOURCE_TYPE = Object.freeze({
  GROUP: 'group',
  USER: 'user',
  CUSTOMER: 'customer',
  ROLE: 'role',
  DEVICE: 'device',
  EVENT: 'event',
  OPERATOR: 'operator'
})

export const SYSTEM_ROLE = Object.freeze({
  ADMIN: 'admin',
  USER: 'user'
})

export const RFID_PRIVILAGE = generatePrivilege('rfid')
export const DRIVER_PRIVILAGE = generatePrivilege('driver')
