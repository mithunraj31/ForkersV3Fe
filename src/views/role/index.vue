<template>
  <div class="app-container">
    <el-row class="filter-section">
      <el-col :span="10">
        <span v-if="!hasAdminPermission">{{ $t('role.listings.total') }}: {{ total }}</span>
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
      <el-col :span="12" class="new-role-button-section">
        <el-button v-permission="[systemRole.ADMIN, rolePrivilege.ADD]" type="primary" @click="$router.push('/roles/new')">{{
          this.$t("role.new.title")
        }}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="roles" border style="width: 100%">
          <el-table-column prop="id" :label="this.$t('role.listings.id')" width="50" />
          <el-table-column prop="name" :label="this.$t('role.listings.name')" />
          <el-table-column :label="this.$t('role.listings.resources')">
            <template slot-scope="scope">
              <el-tag v-for="item of mapBadge(scope.row.privileges)" :key="item" class="privilege-resource">{{ item }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="updated" :label="this.$t('role.listings.updated')" />
          <el-table-column :label="this.$t('general.action')">
            <template slot-scope="scope">
              <el-button
                v-permission="[systemRole.ADMIN, rolePrivilege.EDIT]"
                type="primary"
                size="small"
                @click.native.prevent="
                  $router.push(`/roles/${scope.row.id}/edit`)
                "
              >
                {{ $t("general.edit") }}
              </el-button>
              <el-button
                v-permission="[systemRole.ADMIN, rolePrivilege.DELETE]"
                type="danger"
                size="small"
                @click="onDeleteRoleClicked(scope.row.id)"
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
import {
  fetchRoles,
  deleteRole
} from '@/api/role'
import { fetchCustomerRoles, fetchCustomers } from '@/api/customer'
import Pagination from '@/components/Pagination'
import moment from 'moment'
import permission from '@/directive/permission'
import { SYSTEM_ROLE, ROLE_PRIVILEGE } from '@/enums'
import checkPermission from '@/utils/permission'

export default {
  name: 'RoleListings',
  components: {
    Pagination
  },
  directives: { permission },
  data() {
    return {
      roles: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      loading: false,
      customerId: '',
      customers: []
    }
  },
  computed: {
    systemRole() {
      return SYSTEM_ROLE
    },
    rolePrivilege() {
      return ROLE_PRIVILEGE
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
    mapBadge(privileges) {
      return privileges ? privileges.map(x => {
        if (!x.add && !x.view && !x.edit && !x.delete) {
          return null
        } else {
          const badges = []
          if (x.view) { badges.push(this.$t(`general.view`)) }

          if (x.add) { badges.push(this.$t(`general.add`)) }

          if (x.edit) { badges.push(this.$t(`general.edit`)) }

          if (x.delete) { badges.push(this.$t(`general.delete`)) }

          return this.$t(`role.form.${x.resource}`) + ': ' + badges.join(' ')
        }
      }).filter(x => x !== null) : []
    },
    mapData(role) {
      return {
        id: role.id,
        name: role.name,
        resources: role.role,
        privileges: role.privileges,
        updated: moment(role.updated_at || role.created_at).format('YYYY/MM/DD hh:mm')
      }
    },
    async fetchListings() {
      this.loading = true
      let response = null
      if (this.hasAdminPermission && this.customerId) {
        response = await fetchCustomerRoles(this.customerId, this.listQuery)
      } else {
        response = await fetchRoles(this.listQuery)
      }
      const { data, meta } = response
      this.roles = data.map(this.mapData)
      this.total = meta.total
      this.loading = false
      this.$router.push({
        query: this.listQuery
      })
    },
    onDeleteRoleClicked(id) {
      let deleteConfirmMessage = this.$t('message.confirmDelete')
      deleteConfirmMessage = String.format(
        deleteConfirmMessage,
        `${this.$t('role.listings.id')}: ${id}`
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
      deleteRole(id)
        .then(() => {
          this.$message({
            message: this.$t('message.roleHasBeenDeleted'),
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

.new-role-button-section {
    text-align: right;
}

.privilege-resource {
   margin-bottom: 2.5px;
   margin-right: 2.5px;
}
</style>
