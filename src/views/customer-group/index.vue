<template>
  <div class="app-container">
    <el-row class="filter-section">
      <el-col :span="24" class="new-customer-group-button-section">
        <el-button type="primary" @click="$router.push('./groups/new')">{{
          this.$t("customerGroup.new.title")
        }}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="group" border style="width: 100%">
          <el-table-column prop="id" :label="this.$t('customerGroup.listings.id')" width="50" />
          <el-table-column prop="name" :label="this.$t('customerGroup.listings.name')" />
          <el-table-column prop="stkUser" :label="this.$t('customerGroup.listings.stkUser')" />
          <el-table-column prop="updated" :label="this.$t('customerGroup.listings.updated')" />
          <el-table-column :label="this.$t('general.action')">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click.native.prevent="
                  $router.push(`./groups/${scope.row.id}/edit`)
                "
              >
                {{ $t("general.edit") }}
              </el-button>
              <el-button type="danger" size="small" @click="onDeleteGroupClicked(scope.row.id)">
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
  fetchCustomerGroups,
  deleteCustomerGroup
} from '@/api/customer'
import Pagination from '@/components/Pagination'
import moment from 'moment'
import permission from '@/directive/permission/index.js'

export default {
  name: 'CustomerGroupListings',
  components: {
    Pagination
  },
  directives: {
    permission
  },
  data() {
    return {
      groups: null,
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
    mapData(data) {
      const datetime = moment(data.updated_at).format('YYYY/MM/DD hh:mm')
      return {
        id: data.id,
        name: data.name,
        stkUser: data.stk_user,
        updated: datetime === 'Invalid date' ? '' : datetime
      }
    },
    async fetchListings() {
      this.loading = true
      const { data, meta } = await fetchCustomerGroups(this.listQuery)

      this.groups = data.map(this.mapData)
      this.total = meta.total
      this.loading = false
      this.$router.push({
        query: this.listQuery
      })
    },
    onDeleteGroupClicked(id) {
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
      deleteCustomerGroup(id)
        .then(() => {
          this.$message({
            message: this.$t('message.customerGroupHasBeenDeleted'),
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
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-section {
    margin-bottom: 15px;
}

.new-customer-group-button-section {
    text-align: right;
}
</style>
