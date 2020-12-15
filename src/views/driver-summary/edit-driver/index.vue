<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ this.$t("driver.edit.title") }}: {{ $route.params.id }}</h3>
    <driver-form :driver="driver" @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import DriverForm from '../components/DriverForm'
import { fetchDriverById, editDriver } from '@/api/driver'

export default {
  name: 'EditDriver',
  components: {
    DriverForm
  },
  data() {
    return {
      driver: {},
      loading: false
    }
  },
  async mounted() {
    this.loading = true
    try {
      const { data } = await fetchDriverById(+this.$route.params.id)
      this.driver = {
        id: +this.$route.params.id,
        driverId: data.driver_id,
        name: data.name,
        dob: data.dob,
        address: data.address,
        licenseNo: data.license_no,
        licenseReceived: data.license_received_date,
        licenseRenewal: data.license_renewal_date,
        licenseLocation: data.license_location,
        phoneNo: data.phone_no
      }
    } catch (err) {
      this.$router.push('/404')
    }
    this.loading = false
  },
  methods: {
    onFormSubmit(form) {
      this.loading = true
      editDriver(form)
        .then(() => {
          this.loading = false
          this.$message({
            message: this.$t('message.driverHasBeenEdited'),
            type: 'success'
          })
          this.$router.push('/drivers')
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
