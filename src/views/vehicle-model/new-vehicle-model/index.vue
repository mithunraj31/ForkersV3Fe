<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ this.$t("vehicleModel.new.title") }}</h3>
    <vehicle-model-form @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import VehicleModelForm from '../components/VehicleModelForm'
import { newVehicleModels } from '@/api/vehicle-model'

export default {
  name: 'NewVehicleModel',
  components: {
    VehicleModelForm
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    onFormSubmit(form) {
      this.loading = true
      newVehicleModels(form)
        .then((response) => {
          this.loading = false
          this.$message({
            message: this.$t('message.vehicleModelHasBeenCreated'),
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
