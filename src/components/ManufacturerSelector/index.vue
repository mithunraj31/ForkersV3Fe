<template>
  <div>
    <el-select v-model="manufacturerId" :disabled="loading" :placeholder="$t('general.select')" @change="onManufacturerChanged">
      <el-option
        v-for="item in manufacturers"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
  </div>
</template>

<script>
import { fetchManufacturers } from '@/api/manufacturer'
export default {
  name: 'ManufacturerSelector',
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
      manufacturers: [],
      manufacturerId: ''
    }
  },
  watch: {
    id(newId) {
      this.manufacturerId = newId || ''
    }
  },
  async mounted() {
    await this.fetchData()
  },
  methods: {
    async fetchData() {
      this.loading = true
      const { data } = await fetchManufacturers()
      this.manufacturers = data
      this.loading = false
    },
    onManufacturerChanged() {
      this.$emit('change', this.manufacturerId)
    }
  }
}
</script>

<style scoped></style>
