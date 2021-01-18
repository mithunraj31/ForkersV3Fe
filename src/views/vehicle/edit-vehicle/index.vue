<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ this.$t("vehicle.edit.title") }}: {{ $route.params.id }}</h3>
    <vehicle-form :vehicle="vehicle" @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import VehicleForm from '../components/VehicleForm'
import {
  fetchVehicleById,
  editVehicle
} from '@/api/vehicle'

export default {
  name: 'EditVehicle',
  components: {
    VehicleForm
  },
  data() {
    return {
      vehicle: {},
      loading: false
    }
  },
  async mounted() {
    this.loading = true
    try {
      const { data } = await fetchVehicleById(+this.$route.params.id)
      this.vehicle = {
        id: +this.$route.params.id,
        name: data.name,
        description: data.description,
        customerId: data.customer_id
      }
    } catch (err) {
      this.$router.push('/404')
    }
    this.loading = false
  },
  methods: {
    onFormSubmit(form) {
      this.loading = true
      editVehicle(form)
        .then(() => {
          this.loading = false
          this.$message({
            message: this.$t('message.vehicleHasBeenEdited'),
            type: 'success'
          })
          this.$router.push('/vehicles')
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
