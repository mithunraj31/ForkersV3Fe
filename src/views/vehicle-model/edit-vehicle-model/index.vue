<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ this.$t("vehicleModel.edit.title") }}: {{ $route.params.id }}</h3>
    <vehicle-model-form :vehicle-model="vehicleModel" @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import VehicleModelForm from '../components/VehicleModelForm'
import { editVehicleModel, fetchVehicleModelById } from '@/api/vehicle-model'

export default {
  name: 'EditVehicleModel',
  components: {
    VehicleModelForm
  },
  data() {
    return {
      vehicleModel: {},
      loading: false
    }
  },
  async mounted() {
    this.loading = true
    try {
      const { data } = await fetchVehicleModelById(+this.$route.params.id)
      this.vehicleModel = {
        id: +this.$route.params.id,
        manufacturerId: data.manufacturer_id,
        seriesName: data.series_name,
        modelName: data.model_name,
        powerType: data.power_type,
        structuralMethod: data.structural_method,
        engineModel: data.engine_model,
        ratedLoad: data.rated_load,
        forkLength: data.fork_length,
        forkWidth: data.fork_width,
        standardLift: data.standard_lift,
        maximumLift: data.maximum_lift,
        batteryVoltage: data.battery_voltage,
        batteryCapacity: data.battery_capacity,
        fuelTankCapacity: data.fuel_tank_capacity,
        bodyWeight: data.body_weight,
        bodyLength: data.body_length,
        bodyWidth: data.body_width,
        headGuardHeight: data.head_guard_height,
        minTurningRadius: data.min_turning_radius,
        refLoadCenter: data.ref_load_center,
        tireSizeFrontWheel: data.tire_size_front_wheel,
        tireSizeRearWheel: data.tire_size_rear_wheel,
        remarks: data.remarks
      }
    } catch (err) {
      this.$router.push('/404')
    }
    this.loading = false
  },
  methods: {
    onFormSubmit(form) {
      this.loading = true
      editVehicleModel(form)
        .then(() => {
          this.loading = false
          this.$message({
            message: this.$t('message.vehicleModelHasBeenEdited'),
            type: 'success'
          })
          this.$router.push('/vehicle-models')
        })
        .catch(() => {
          this.loading = false
          this.$message({
            message: this.$t('message.somethingWentWrong'),
            type: 'error'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
