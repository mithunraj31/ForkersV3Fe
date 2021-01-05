<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :rules="formRules" :model="form" label-width="150px">
          <el-form-item v-permission="[systemRole.ADMIN]" :label="$t('role.form.companyListings')">
            <el-select v-model="form.customerId" :placeholder="$t('general.select')" @change="onCustomerChanged">
              <el-option
                v-for="item in customers"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-permission="[systemRole.ADMIN]" :label="$t('user.form.sysRole')">
            <el-radio v-model="form.sysRole" :label="systemRole.USER" border>{{ $t('general.user') }}</el-radio>
            <el-radio v-model="form.sysRole" :label="systemRole.ADMIN" border>{{ $t('general.admin') }}</el-radio>
          </el-form-item>
          <el-form-item :label="$t('user.form.firstName')" prop="firstName">
            <el-input v-model="form.firstName" />
          </el-form-item>
          <el-form-item :label="$t('user.form.lastName')" prop="lastName">
            <el-input v-model="form.lastName" />
          </el-form-item>
          <el-form-item :label="$t('user.form.userEmail')" prop="username">
            <el-input v-model="form.username" :disabled="form.id != 0" />
          </el-form-item>
          <el-form-item v-if="!hasAdminPermission || form.customerId > 0" :label="$t('user.form.userRole')" prop="role">
            <el-select v-model="form.roleId" :rules="formRules" filterable :placeholder="$t('user.form.userRole')">
              <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('user.form.groups')">
            <el-collapse accordion>
              <el-collapse-item name="groupListings">
                <template slot="title">
                  <span v-if="form.groupIds != null && form.groupIds.length > 0">
                    <el-tag
                      v-for="tag in selectedGroups"
                      :key="tag.id"
                      class="group-tag"
                      closable
                      type="info"
                      @close="removeGroup(tag.id)"
                    >
                      {{ tag.name }}
                    </el-tag>
                  </span>
                  <span v-else>{{ $t('user.form.pleaseSelectUserGroup') }}</span>
                </template>
                <el-tree
                  ref="tree"
                  :data="groups"
                  node-key="id"
                  default-expand-all
                  :expand-on-click-node="false"
                >
                  <span slot-scope="{ data }" class="custom-tree-node">
                    <span>{{ data.name }}</span>
                    <span>
                      <el-button type="text" size="mini" :disabled="isContainsSelectedGroups(data.id)" @click="onSelectGroup(data)">
                        {{ $t('general.select') }}
                      </el-button>
                    </span>
                  </span>
                </el-tree>
              </el-collapse-item>
            </el-collapse>
          </el-form-item>
          <el-form-item v-if="!visible">
            <el-button type="primary" @click="visible = true">{{
              $t("user.form.changePassword")
            }}</el-button>
          </el-form-item>
          <el-form-item v-if="visible" :label="$t('user.form.userPassword')" prop="password">
            <el-input v-model="form.password" type="password" />
          </el-form-item>
          <el-form-item v-if="visible" :label="$t('user.form.userConfirmPassword')" prop="confirmPassword">
            <el-input v-model="form.confirmPassword" type="password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">{{
              $t("general.save")
            }}</el-button>
            <el-button @click="$router.go(-1)">{{
              $t("general.cancel")
            }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { validEmail } from '@/utils/validate'
import { fetchCustomers, fetchCustomerRoles, fetchCustomerGroups } from '@/api/customer'
import { fetchRoles } from '@/api/role'
import permission from '@/directive/permission/index.js'
import checkPermission from '@/utils/permission'
import { SYSTEM_ROLE } from '@/enums'
import { fetchGroups } from '@/api/group'
import { findNestedObjectById } from '@/utils'

export default {
  name: 'UserForm',
  directives: { permission },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          id: 0,
          firstName: '',
          lastName: '',
          username: '',
          roleId: '',
          password: '',
          confirmPassword: '',
          customerId: '',
          sysRole: SYSTEM_ROLE.USER,
          groupIds: []
        }
      }
    }
  },
  data() {
    const validateFirstName = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.nameRequired')))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.emailRequired')))
      } else if (!validEmail(value)) {
        callback(new Error(this.$t('message.emailNotValid')))
      } else {
        callback()
      }
    }
    const validateRole = (rule, value, callback) => {
      if (value <= 0) {
        callback(new Error(this.$t('message.roleRequired')))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value && this.visible) {
        callback(new Error(this.$t('message.passwordRequired')))
      } else if (value.length < 6 && this.visible) {
        callback(new Error(this.$t('message.invalidLength')))
      } else {
        callback()
      }
    }
    const validateconfirmPassword = (rule, value, callback) => {
      if (!value && this.visible) {
        callback(new Error(this.$t('message.confirmPasswordRequired')))
      } else if (value !== this.form.password && this.visible) {
        callback(new Error(this.$t('message.passwordMismatch')))
      } else {
        callback()
      }
    }

    return {
      visible: true,
      previousEmail: '',
      groups: [],
      form: {
        id: 0,
        firstName: '',
        lastName: '',
        username: '',
        roleId: '',
        password: '',
        confirmPassword: '',
        customerId: '',
        sysRole: SYSTEM_ROLE.USER,
        groupIds: []
      },
      dialogVisible: false,
      customers: [],
      roles: [],
      selectedGroups: [],
      formRules: {
        firstName: [{
          required: true,
          trigger: 'blur',
          validator: validateFirstName
        }],
        email: [{
          required: true,
          trigger: 'blur',
          validator: validateEmail
        }],
        role: [{
          required: true,
          trigger: 'change',
          validator: validateRole
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePassword
        }],
        confirmPassword: [{
          required: true,
          trigger: 'blur',
          validator: validateconfirmPassword
        }]
      }
    }
  },
  computed: {
    systemRole() {
      return SYSTEM_ROLE
    },
    hasAdminPermission() {
      return checkPermission([SYSTEM_ROLE.ADMIN])
    }
  },
  watch: {
    user(newUser, oldUser) {
      this.form.id = newUser.id
      this.form.firstName = newUser.firstName
      this.form.lastName = newUser.lastName
      this.form.username = newUser.username
      this.form.roleId = newUser.roleId
      this.form.customerId = newUser.customerId
      this.form.sysRole = newUser.sysRole
      this.form.groupIds = newUser.groupIds

      this.visible = false
      this.form.password = undefined
      this.onCustomerChanged()
    }
  },
  created() {
    this.onCustomerChanged()
  },
  mounted() {
    if (this.hasAdminPermission) {
      this.fetchCustomerListings()
    }
  },
  methods: {
    async fetchCustomerListings() {
      const { data } = await fetchCustomers()
      this.customers = data
    },
    async fetchRoles() {
      if (this.hasAdminPermission && this.form.customerId) {
        const { data } = await fetchCustomerRoles(this.form.customerId)
        this.roles = data
      } else if (!this.hasAdminPermission) {
        const { data } = await fetchRoles()
        this.roles = data
        if (data && data.length > 0) {
          this.form.customerId = data[0].customer_id
        }
      }
    },
    async fetchGroups() {
      if (this.hasAdminPermission && this.form.customerId) {
        const { data } = await fetchCustomerGroups(this.form.customerId)
        this.groups = data
      } else if (!this.hasAdminPermission) {
        const { data } = await fetchGroups()
        this.groups = data
        if (data && data.length > 0) {
          this.form.customerId = data[0].customer_id
        }
      }

      this.selectedGroups = this.form.groupIds.map(x => {
        let result = null
        for (const obj of this.groups) {
          result = findNestedObjectById(obj, x)
          if (result) {
            break
          }
        }
        return result
      }).filter(x => x != null)
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('onFormSubmit', {
            ...this.form
          })
        }
      })
    },
    async onCustomerChanged() {
      await this.fetchRoles()
      await this.fetchGroups()
    },
    onSelectGroup(data) {
      if (!this.form.groupIds.some(id => id === data.id)) {
        this.selectedGroups.push(data)
        this.form.groupIds.push(data.id)
      }
    },
    isContainsSelectedGroups(groupId) {
      return this.form.groupIds.some(id => id === groupId)
    },
    removeGroup(groupId) {
      this.selectedGroups = this.selectedGroups.filter(x => x.id !== groupId)
      this.form.groupIds = this.form.groupIds.filter(id => id !== groupId)
    }
  }
}
</script>

<style lang="scss" scoped>

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.el-collapse-item__header {
  height: 0 auto;
}

.group-tag {
  margin-right: 2px;
}
</style>
