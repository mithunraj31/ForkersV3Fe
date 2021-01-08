<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ this.$t("manufacturer.new.title") }}</h3>
    <manufacturer-form @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import ManufacturerForm from '../components/ManufacturerForm'
import {
  newManufacturer
} from '@/api/manufacturer'

export default {
  name: 'NewManufacturer',
  components: {
    ManufacturerForm
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    onFormSubmit(form) {
      this.loading = true
      newManufacturer(form)
        .then((response) => {
          this.loading = false
          this.$message({
            message: this.$t('message.manufacturerHasBeenCreated'),
            type: 'success'
          })
          this.$router.push('/manufacturers')
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
