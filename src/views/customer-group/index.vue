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
          v-permission="[systemRole.ADMIN, groupPrivilege.ADD]"
          class="new-group-btn"
          type="primary"
          @click="newGroup(null)"
        >{{ $t('group.new.title') }}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-input
              v-model="filterText"
              :placeholder="$t('group.filterPlaceholder')"
            />
          </div>
          <el-tree
            ref="tree"
            v-loading="loading"
            :data="groups"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            draggable
            :filter-node-method="filterNode"
            @node-drop="handleDrop"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span @click="onGroupClicked(data.id)">{{ data.name }}</span>
              <span>
                <el-button
                  :disabled="!checkPermission([systemRole.ADMIN, groupPrivilege.ADD])"
                  type="text"
                  size="mini"
                  @click="newGroup(data.id)"
                >
                  {{ $t('group.append') }}
                </el-button>
                <el-button
                  :disabled="node.childNodes.length > 0 || !checkPermission([systemRole.ADMIN, groupPrivilege.DELETE])"
                  type="text"
                  size="mini"
                  @click="removeGroup(data.id)"
                >
                  {{ $t('group.delete') }}
                </el-button>
              </span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
      <el-col v-if="groupId" :span="14" :offset="1">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t('group.id') }}: {{ groupId }}</span>
          </div>
          <customer-group-form :group="groupData" @onFormSubmit="onSubmit" @onCancel="onClear" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  fetchCustomerGroups,
  fetchCustomers
} from '@/api/customer'
import { deleteGroup, newGroup, fetchGroupById, fetchGroups, editGroup } from '@/api/group'
import permission from '@/directive/permission/index.js'
import checkPermission from '@/utils/permission'
import { SYSTEM_ROLE, GROUP_PRIVILEGE } from '@/enums'
import CustomerGroupForm from './components/CustomerGroupForm'

export default {
  name: 'CustomerGroupListings',
  directives: {
    permission
  },
  components: {
    CustomerGroupForm
  },
  data() {
    return {
      groups: [],
      loading: false,
      customerId: '',
      customers: [],
      groupId: '',
      groupData: {},
      formLoading: false,
      filterText: ''
    }
  },
  computed: {
    systemRole() {
      return SYSTEM_ROLE
    },
    hasAdminPermission() {
      return checkPermission([SYSTEM_ROLE.ADMIN])
    },
    groupPrivilege() {
      return GROUP_PRIVILEGE
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  async mounted() {
    if (this.hasAdminPermission) {
      await this.fetchCustomers()
      if (this.customers && this.customers.length > 0) {
        this.customerId = this.customers[0].id
        await this.fetchCustomerGroups()
      }
    } else {
      await this.fetchCustomerGroups()
    }
  },
  methods: {
    checkPermission,
    async fetchCustomers() {
      const { data } = await fetchCustomers()
      this.customers = data
    },
    async fetchCustomerGroups() {
      this.loading = true
      this.groupId = ''
      if (this.hasAdminPermission) {
        const { data } = await fetchCustomerGroups(this.customerId)
        this.groups = data
      } else {
        const { data } = await fetchGroups()
        this.groups = data
      }
      this.loading = false
    },

    removeGroup(id) {
      let deleteConfirmMessage = this.$t('message.confirmDelete')
      deleteConfirmMessage = String.format(
        deleteConfirmMessage,
        `${this.$t('group.id')}: ${id}`
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
      deleteGroup(id)
        .then(async() => {
          this.$message({
            message: this.$t('message.groupHasBeenDeleted'),
            type: 'success'
          })
          await this.fetchCustomerGroups()
        })
        .catch(() => {
          this.$message({
            message: this.$t('message.somethingWentWrong'),
            type: 'danger'
          })
        })
    },
    async newGroup(parentId = null) {
      await newGroup({
        name: this.$t('group.newest'),
        description: '',
        customerId: this.customerId,
        parentId
      })

      setTimeout(this.fetchCustomerGroups, 500)
    },
    async handleDrop(draggingNode, dropNode) {
      const group = {
        id: draggingNode.data.id,
        name: draggingNode.data.name,
        description: draggingNode.data.description,
        customerId: draggingNode.data.customer_id,
        parentId: dropNode.data.id
      }
      await this.onSubmit(group)
    },
    async onGroupClicked(id) {
      this.groupId = id
      this.formLoading = true
      const { data } = await fetchGroupById(this.groupId)
      this.groupData = {
        id: data.id,
        name: data.name,
        description: data.description,
        customerId: data.customer_id,
        parentId: data.fetchCustomerGroupsparent_id
      }
      this.formLoading = false
    },
    async onSubmit(form) {
      await editGroup(form)
      await this.fetchCustomerGroups()
    },
    async onClear() {
      await this.fetchCustomerGroups()
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
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
