import request from '@/utils/request'

export function fetchVehicleModels(listQuery, manufacturerId = null) {
  let params = ''
  if (listQuery) {
    params = `?perPage=${listQuery.limit}&page=${listQuery.page}`
  } else {
    params = `?perPage=${1000}`
  }

  if (manufacturerId) {
    params += `&manufacturer_id=${manufacturerId}`
  }
  return request({
    url: `/vehicles/models/all${params}`,
    method: 'get'
  })
}

export function fetchVehicleModelById(id) {
  return request({
    url: `/vehicles/models/${id}`,
    method: 'get'
  })
}

export function newVehicleModels(data) {
  return request({
    url: '/vehicles/models',
    method: 'post',
    data: {
      name: data.name,
      description: data.description,
      manufacturer_id: data.manufacturerId,
      series_name: data.seriesName,
      model_name: data.modelName,
      power_type: data.powerType,
      structural_method: data.structuralMethod,
      engine_model: data.engineModel,
      rated_load: data.ratedLoad,
      fork_length: data.forkLength,
      fork_width: data.forkWidth,
      standard_lift: data.standardLift,
      maximum_lift: data.maximumLift,
      battery_voltage: data.batteryVoltage,
      battery_capacity: data.batteryCapacity,
      fuel_tank_capacity: data.fuelTankCapacity,
      body_weight: data.bodyWeight,
      body_length: data.bodyLength,
      body_width: data.bodyWidth,
      head_guard_height: data.headGuardHeight,
      min_turning_radius: data.minTurningRadius,
      ref_load_center: data.refLoadCenter,
      tire_size_front_wheel: data.tireSizeFrontWheel,
      tire_size_rear_wheel: data.tireSizeRearWheel,
      remarks: data.remarks
    }
  })
}

export function editVehicleModel(data) {
  return request({
    url: `/vehicles/models/${data.id}`,
    method: 'put',
    data: {
      name: data.name,
      description: data.description,
      manufacturer_id: data.manufacturerId,
      series_name: data.seriesName,
      model_name: data.modelName,
      power_type: data.powerType,
      structural_method: data.structuralMethod,
      engine_model: data.engineModel,
      rated_load: data.ratedLoad,
      fork_length: data.forkLength,
      fork_width: data.forkWidth,
      standard_lift: data.standardLift,
      maximum_lift: data.maximumLift,
      battery_voltage: data.batteryVoltage,
      battery_capacity: data.batteryCapacity,
      fuel_tank_capacity: data.fuelTankCapacity,
      body_weight: data.bodyWeight,
      body_length: data.bodyLength,
      body_width: data.bodyWidth,
      head_guard_height: data.headGuardHeight,
      min_turning_radius: data.minTurningRadius,
      ref_load_center: data.refLoadCenter,
      tire_size_front_wheel: data.tireSizeFrontWheel,
      tire_size_rear_wheel: data.tireSizeRearWheel,
      remarks: data.remarks
    }
  })
}

export function deleteVehicleModel(id) {
  return request({
    url: `/vehicles/models/${id}`,
    method: 'delete'
  })
}
