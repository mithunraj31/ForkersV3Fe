<template>
  <div class="app-container">
    <el-row class="filter-section">
      <el-col :span="10" class="new-customer-button-section">
        <company-selector @change="onCustomerChanged" />
      </el-col>
      <el-col :span="14" class="new-manufacturer-button-section">
        <el-button type="primary" @click="$router.push('/manufacturers/new')">{{
          this.$t("manufacturer.new.title")
        }}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="manufacturers" border style="width: 100%">
          <el-table-column prop="id" :label="this.$t('manufacturer.listings.id')" width="50" />
          <el-table-column prop="name" :label="this.$t('manufacturer.listings.name')" />
          <el-table-column prop="description" :label="this.$t('manufacturer.listings.description')" />
          <el-table-column prop="updated" :label="this.$t('manufacturer.listings.updated')" />
          <el-table-column :label="this.$t('general.action')">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click.native.prevent="
                  $router.push(`/manufacturers/${scope.row.id}/edit`)
                "
              >
                {{ $t("general.edit") }}
              </el-button>
              <el-button type="danger" size="small" @click="onDeleteClicked(scope.row.id)">
                {{ $t("general.delete") }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="onPaged" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  fetchManufacturers,
  deleteManufacturer
} from '@/api/manufacturer'
import Pagination from '@/components/Pagination'
import moment from 'moment'
import permission from '@/directive/permission/index.js'
import CompanySelector from '@/components/CompanySelector'

export default {
  name: 'ManufacturerListings',
  components: {
    CompanySelector,
    Pagination
  },
  directives: {
    permission
  },
  data() {
    return {
      manufacturers: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      loading: false,
      customerId: 0
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
      const datetime = moment(data.updated_at || data.created_at).format('YYYY/MM/DD hh:mm:ss')
      return {
        id: data.id,
        name: data.name,
        description: data.description,
        updated: datetime
      }
    },
    async fetchListings() {
      this.loading = true
      const { data, meta } = await fetchManufacturers(this.listQuery, this.customerId)
      this.manufacturers = data.map(this.mapData)
      this.total = meta.total
      this.loading = false
      this.$router.push({
        query: this.listQuery
      })
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
      deleteManufacturer(id)
        .then(() => {
          this.$message({
            message: this.$t('message.userHasBeenDeleted'),
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
    async onCustomerChanged(customerId) {
      this.customerId = customerId
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
