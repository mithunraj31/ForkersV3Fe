<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="users" border style="width: 100%">
          <el-table-column prop="id" :label="this.$t('user.listings.userId')" width="50" />
          <el-table-column prop="name" :label="this.$t('user.listings.userName')" />
          <el-table-column prop="vehicle" :label="this.$t('user.listings.userVehicle')" />
          <el-table-column prop="running" :label="this.$t('user.listings.userRunning')" />
          <el-table-column :label="this.$t('general.action')">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-video-camera"
                @click.native.prevent="
                  $router.push(`/events/${scope.row.id}/event`)
                "
              />
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
  fetchUsers
} from '@/api/user'
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js'

export default {
  name: 'UserListings',
  components: {
    Pagination
  },
  directives: {
    permission
  },
  props: {
    userId: {
      type: Number,
      default() {
        return 0
      }
    }
  },

  data() {
    return {
      users: null,
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
    mapUsersToDataTable(user) {
      return {
        id: user.id,
        name: user.name,
        vehicle: user.vehicle,
        running: user.running
      }
    },
    async fetchListings() {
      let response = null
      this.loading = true
      response = await fetchUsers(this.listQuery)
      const {
        data
      } = response
      this.users = data.map(this.mapUsersToDataTable)
      this.total = data.length
      this.loading = false
      this.$router.push({
        query: this.listQuery
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-section {
    margin-bottom: 15px;
}

.new-user-button-section {
    text-align: right;
}
</style>
