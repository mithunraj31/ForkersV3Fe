<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ this.$t("driver.new.title") }}</h3>
    <driver-form @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import DriverForm from '../components/DriverForm'
import { newDriver } from '@/api/driver'

export default {
  name: 'Newdriver',
  components: {
    DriverForm
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    onFormSubmit(form) {
      this.loading = true
      newDriver(form)
        .then((response) => {
          this.loading = false
          this.$message({
            message: this.$t('message.driverHasBeenCreated'),
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
