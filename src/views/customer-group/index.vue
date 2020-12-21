<template>
  <div class="app-container">
    <el-row class="filter-section">
      <el-col :span="12" class="new-customer-group-button-section">
        <el-select
          v-model="customerId"
          v-permission="[systemRole.ADMIN]"
          :placeholder="$t('general.select')"
          @change="fetchCustomerGroups"
        >
          <el-option
            v-for="item in customers"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-button
          v-if="customers.length > 0"
          class="new-group-btn"
          type="primary"
          @click="newGroup"
        >New group</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-tree
          v-loading="loading"
          :data="groups"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>{{ node.name }}</span>
            <span>
              <el-button type="text" size="mini" @click="() => append(data)">
                Append
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => remove(node, data)"
              >
                Delete
              </el-button>
            </span>
          </span>
        </el-tree>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  fetchCustomerGroups,
  deleteCustomerGroup,
  fetchCustomers
} from '@/api/customer'
import { newGroup } from '@/api/group'
import moment from 'moment'
import permission from '@/directive/permission/index.js'
import { SYSTEM_ROLE } from '@/enums'

export default {
  name: 'CustomerGroupListings',
  directives: {
    permission
  },
  data() {
    return {
      groups: [],
      loading: false,
      customerId: '',
      customers: []
    }
  },
  computed: {
    systemRole() {
      return SYSTEM_ROLE
    }
  },
  async mounted() {
    await this.fetchCustomers()
    if (this.customers && this.customers.length > 0) {
      this.customerId = this.customers[0].id
      await this.fetchCustomerGroups()
    }
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
    async fetchCustomers() {
      const { data } = await fetchCustomers()
      this.customers = data
    },
    async fetchCustomerGroups() {
      this.loading = true
      const { data } = await fetchCustomerGroups(this.customerId)
      this.groups = data
      this.loading = false
    },
    append(data) {
      const newChild = { name: this.$t('group.new.tile'), children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex((d) => d.id === data.id)
      children.splice(index, 1)
    },

    async newGroup() {
      await newGroup({
        name: this.$t('group.new.title'),
        description: '',
        customerId: this.customerId,
        parentId: null
      })
      await this.fetchCustomerGroups()
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-section {
  margin-bottom: 15px;
}
.new-group-btn {
  margin-left: 10px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
