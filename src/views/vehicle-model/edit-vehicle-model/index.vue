<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ this.$t("vehicleModel.edit.title") }}: {{ $route.params.id }}</h3>
    <vehicle-model-form :vehicle-model="vehicleModel" @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import VehicleModelForm from '../components/VehicleModelForm'
import {
  editVehicleModel,
  fetchVehicleModelById
} from '@/api/vehicle-model'

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
        name: data.name
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
