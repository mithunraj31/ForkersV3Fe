<template>
  <div class="app-container">
    <el-row class="filter-section">
      <el-col :span="24" class="new-role-button-section">
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
import Pagination from '@/components/Pagination'
import moment from 'moment'
import permission from '@/directive/permission'
import { SYSTEM_ROLE, ROLE_PRIVILEGE } from '@/enums'

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
      loading: false
    }
  },
  computed: {
    systemRole() {
      return SYSTEM_ROLE
    },
    rolePrivilege() {
      return ROLE_PRIVILEGE
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
    mapData(role) {
      return {
        id: role.id,
        name: role.name,
        resources: role.role,
        updated: moment(role.updated_at || role.created_at).format('YYYY/MM/DD hh:mm')
      }
    },
    async fetchListings() {
      this.loading = true
      const { data, meta } = await fetchRoles(null, this.listQuery)
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
</style>
