<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ this.$t("manufacturer.edit.title") }}: {{ $route.params.id }}</h3>
    <manufacturer-form :manufacturer="manufacturer" @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import ManufacturerForm from '../components/ManufacturerForm'
import {
  fetchManufacturerById,
  editManufacturer
} from '@/api/manufacturer'

export default {
  name: 'EditManufacturer',
  components: {
    ManufacturerForm
  },
  data() {
    return {
      manufacturer: {},
      loading: false
    }
  },
  async mounted() {
    this.loading = true
    try {
      const { data } = await fetchManufacturerById(+this.$route.params.id)
      this.manufacturer = {
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
      editManufacturer(form)
        .then(() => {
          this.loading = false
          this.$message({
            message: this.$t('message.manufacturerHasBeenEdited'),
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
