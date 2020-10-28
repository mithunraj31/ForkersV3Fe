<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="vehicles" border style="width: 100%">
          <el-table-column prop="id" :label="this.$t('vehicle.id')" width="300" />
          <el-table-column prop="name" :label="this.$t('vehicle.status')" />
        </el-table>
        <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="onPaged" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  fetchStatus
} from '@/api/vehicle'
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js'

export default {
  name: 'VehicleTable',
  components: {
    Pagination
  },
  directives: {
    permission
  },
  props: {
    vehicleId: {
      type: Number,
      default() {
        return 0
      }
    }
  },

  data() {
    return {
      vehicles: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      loading: false
    }
  },

  async created() {
    this.listQuery = {
      page: +(this.$route.query.page || this.listQuery.page),
      limit: +(this.$route.query.limit || this.listQuery.limit)
    }
    this.$router.push({
      query: this.listQuery
    })
    await this.fetchListings()
  },
  methods: {
    mapVehiclesToDataTable(vehicle) {
      return {
        id: vehicle.id,
        status: vehicle.status
      }
    },
    async fetchListings() {
      let response = null
      this.loading = true
      response = await fetchStatus(this.listQuery)
      const {
        data
      } = response
      this.vehicles = data.map(this.mapVehiclesToDataTable)
      this.total = data.length
      this.loading = false
      this.$router.push({
        query: this.listQuery
      })
    },

    async onPaged() {
      await this.fetchListings()
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-section {
    margin-bottom: 15px;
}
</style>
