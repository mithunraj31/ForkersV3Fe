<template>
  <div>
    <el-select v-model="customerId" :disabled="loading" :placeholder="$t('general.select')" @change="onCustomerChanged">
      <el-option
        v-for="item in customers"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
  </div>
</template>

<script>
import { fetchCustomers } from '@/api/customer'
export default {
  name: 'CompanySelector',
  props: {
    id: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  data() {
    return {
      loading: false,
      customers: [],
      customerId: ''
    }
  },
  watch: {
    id(newId) {
      this.customerId = newId
    }
  },
  async mounted() {
    await this.fetchData()
  },
  methods: {
    async fetchData() {
      this.loading = true
      const { data } = await fetchCustomers()
      this.customers = data
      this.loading = false
    },
    onCustomerChanged() {
      this.$emit('change', this.customerId)
    }
  }
}
</script>

<style scoped></style>
