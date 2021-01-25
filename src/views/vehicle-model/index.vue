<template>
  <div class="app-container">
    <el-row class="filter-section">
      <el-col :span="10">
        <manufacturer-selector @change="onManufacturerChanged" />
      </el-col>
      <el-col :span="14" class="new-manufacturer-button-section">
        <el-button type="primary" @click="$router.push('/vehicle-models/new')">{{
          this.$t("vehicleModel.new.title")
        }}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="vehicleModels" border style="width: 100%">
          <el-table-column
            prop="id"
            :label="this.$t('vehicleModel.listings.id')"
            width="50"
          />
          <el-table-column prop="name" :label="this.$t('vehicleModel.listings.name')" />
          <el-table-column
            prop="seriesName"
            :label="this.$t('vehicleModel.listings.seriesName')"
          />
          <el-table-column
            prop="updated"
            :label="this.$t('vehicleModel.listings.updated')"
          />
          <el-table-column :label="this.$t('general.action')">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click.native.prevent="
                  $router.push(`/vehicle-models/${scope.row.id}/edit`)
                "
              >
                {{ $t("general.edit") }}
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="onDeleteClicked(scope.row.id)"
              >
                {{ $t("general.delete") }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="onPaged"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchVehicleModels, deleteVehicleModel } from '@/api/vehicle-model'
import Pagination from '@/components/Pagination'
import moment from 'moment'
import permission from '@/directive/permission/index.js'
import ManufacturerSelector from '@/components/ManufacturerSelector'

export default {
  name: 'VehicleModelsListings',
  components: {
    Pagination,
    ManufacturerSelector
  },
  directives: {
    permission
  },
  data() {
    return {
      vehicleModels: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      loading: false,
      manufacturerId: 0
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
    mapData(data) {
      const datetime = moment(data.updated_at || data.created_at).format(
        'YYYY/MM/DD hh:mm:ss'
      )
      return {
        id: data.id,
        name: data.model_name,
        seriesName: data.series_name,
        updated: datetime
      }
    },
    async fetchListings() {
      this.loading = true
      try {
        const { data, total } = await fetchVehicleModels(
          this.listQuery,
          this.manufacturerId
        )
        this.vehicleModels = data.map(this.mapData)
        this.total = total
      } catch (ex) {
        this.vehicleModels = []
        console.log(ex)
        this.total = 0
      } finally {
        this.loading = false
        this.$router.push({
          query: this.listQuery
        })
      }
    },
    onDeleteClicked(id) {
      let deleteConfirmMessage = this.$t('message.confirmDelete')
      deleteConfirmMessage = String.format(
        deleteConfirmMessage,
        `${this.$t('user.listings.userId')}: ${id}`
      )

      this.$confirm(deleteConfirmMessage, this.$t('general.warning'), {
        confirmButtonText: this.$t('general.confirm'),
        cancelButtonText: this.$t('general.cancel'),
        type: 'warning'
      }).then(() => {
        this.deleteConfirmed(id)
      })
    },
    deleteConfirmed(id) {
      deleteVehicleModel(id)
        .then(() => {
          this.$message({
            message: this.$t('message.vehicleModelHasBeenDeleted'),
            type: 'success'
          })
          this.fetchListings()
        })
        .catch(() => {
          this.$message({
            message: this.$t('message.somethingWentWrong'),
            type: 'danger'
          })
        })
    },
    async onPaged() {
      await this.fetchListings()
    },
    async onManufacturerChanged(manufacturerId) {
      this.manufacturerId = manufacturerId
      await this.fetchListings()
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-section {
  margin-bottom: 15px;
}

.new-manufacturer-button-section {
  text-align: right;
}
</style>
