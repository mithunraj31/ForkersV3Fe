<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ this.$t("vehicle.new.title") }}</h3>
    <vehicle-form @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import VehicleForm from '../components/VehicleForm'
import {
  newVehicle
} from '@/api/vehicle'

export default {
  name: 'NewVehicle',
  components: {
    VehicleForm
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    onFormSubmit(form) {
      this.loading = true
      newVehicle(form)
        .then((response) => {
          this.loading = false
          this.$message({
            message: this.$t('message.vehicleHasBeenCreated'),
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
