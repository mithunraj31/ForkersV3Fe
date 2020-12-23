<template>
  <div class="app-container">
    <el-row class="filter-section">
      <el-col :span="10">
        <span v-if="!hasAdminPermission">{{ $t('user.listings.total') }}: {{ total }}</span>
        <el-select
          v-else
          v-model="customerId"
          :placeholder="$t('general.select')"
          @change="fetchListings"
        >
          <el-option
            v-for="item in customers"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-col>
      <el-col :span="14" class="new-user-button-section">
        <el-button v-permission="[systemRole.ADMIN, userPrivilege.ADD]" type="primary" @click="$router.push('/users/new')">{{
          this.$t("user.new.title")
        }}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="users" border style="width: 100%">
          <el-table-column prop="id" :label="this.$t('user.listings.userId')" width="50" />
          <el-table-column prop="name" :label="this.$t('user.listings.userName')" />
          <el-table-column prop="email" :label="this.$t('user.listings.userEmail')" />
          <el-table-column prop="role" :label="this.$t('user.listings.userRole')">
            <template slot-scope="scope">
              {{ scope.row.role }}
            </template>
          </el-table-column>
          <el-table-column prop="updated" :label="this.$t('user.listings.userUpdated')" />
          <el-table-column :label="this.$t('general.action')">
            <template slot-scope="scope">
              <el-button
                v-permission="[systemRole.ADMIN, userPrivilege.EDIT]"
                type="primary"
                size="small"
                @click.native.prevent="
                  $router.push(`/users/${scope.row.id}/edit`)
                "
              >
                {{ $t("general.edit") }}
              </el-button>
              <el-button
                v-permission="[systemRole.ADMIN, userPrivilege.DELETE]"
                type="danger"
                size="small"
                @click="onDeleteUserClicked(scope.row.id)"
              >
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
import { fetchUsers, deleteUser } from '@/api/user'
import { fetchCustomers, fetchCustomerUsers } from '@/api/customer'
import Pagination from '@/components/Pagination'
import moment from 'moment'
import { SYSTEM_ROLE, USER_PRIVILEGE } from '@/enums'
import checkPermission from '@/utils/permission'
import permission from '@/directive/permission'

export default {
  name: 'UserListings',
  components: {
    Pagination
  },
  directives: { permission },
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
      customers: [],
      users: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      loading: false,
      customerId: ''
    }
  },
  computed: {
    systemRole() {
      return SYSTEM_ROLE
    },
    userPrivilege() {
      return USER_PRIVILEGE
    },
    hasAdminPermission() {
      return checkPermission([SYSTEM_ROLE.ADMIN])
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

    if (this.hasAdminPermission) {
      const { data } = await fetchCustomers()
      this.customers = data
    }
    await this.fetchListings()
  },
  methods: {
    mapUsersToDataTable(user) {
      return {
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.username,
        role: user.role ? user.role.name : '',
        updated: moment(user.updated_at || user.created_at).format('YYYY/MM/DD hh:mm')
      }
    },
    async fetchListings() {
      this.loading = true
      let response = null
      if (this.hasAdminPermission && this.customerId) {
        response = await fetchCustomerUsers(this.customerId, this.listQuery)
      } else {
        response = await fetchUsers(this.listQuery)
      }
      const { data, meta } = response
      this.users = data.map(this.mapUsersToDataTable)
      this.total = meta.total
      this.loading = false
      this.$router.push({
        query: this.listQuery
      })
    },
    onDeleteUserClicked(id) {
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
      deleteUser(id)
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
