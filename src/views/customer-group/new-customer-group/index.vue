<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ this.$t("customer.new.title") }}</h3>
    <customer-group-form @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import CustomerGroupForm from '../components/CustomerGroupForm'
import {
  newCustomer
} from '@/api/customer'

export default {
  name: 'NewCustomer',
  components: {
    CustomerGroupForm
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    onFormSubmit(form) {
      this.loading = true
      newCustomer(form)
        .then((response) => {
          this.loading = false
          this.$message({
            message: this.$t('message.customerHasBeenCreated'),
            type: 'success'
          })
          this.$router.push('/customers')
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
