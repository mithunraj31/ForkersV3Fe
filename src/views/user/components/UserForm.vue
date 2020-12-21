<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :rules="formRules" :model="form" label-width="150px">
          <el-form-item v-permission="[systemRole.ADMIN]" :label="$t('role.form.companyListings')">
            <el-select v-model="form.customerId" :placeholder="$t('general.select')" @change="fetchCustomerRoles">
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
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item v-if="!hasAdminPermission || form.customerId > 0" :label="$t('user.form.userRole')" prop="role">
            <el-select v-model="form.roleId" :rules="formRules" filterable :placeholder="$t('user.form.userRole')">
              <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
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
import { fetchCustomers, fetchCustomerRolesByCustomerId } from '@/api/customer'
import { fetchRoles } from '@/api/role'
import permission from '@/directive/permission/index.js'
import checkPermission from '@/utils/permission'
import { SYSTEM_ROLE } from '@/enums'

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
          roleId: 0,
          password: '',
          confirmPassword: '',
          customerId: '',
          sysRole: SYSTEM_ROLE.USER
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
      form: {
        id: 0,
        firstName: '',
        lastName: '',
        username: '',
        roleId: 0,
        password: '',
        confirmPassword: '',
        customerId: '',
        sysRole: SYSTEM_ROLE.USER
      },
      dialogVisible: false,
      customers: [],
      roles: [],
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
      this.visible = false
      this.fetchRoles()
    }
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
      const { data } = await fetchRoles()
      this.roles = data
      if (data && data.length >= 1) {
        this.form.roleId = data[0].id
      }
    },
    async fetchCustomerRoles() {
      const { data } = await fetchCustomerRolesByCustomerId(this.form.customerId)
      this.roles = data
      if (data && data.length >= 1) {
        this.form.roleId = data[0].id
      }
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('onFormSubmit', {
            ...this.form
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
