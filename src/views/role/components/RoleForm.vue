<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :rules="formRules" :model="form" label-width="150px">
          <el-form-item v-permission="['admin']" :label="$t('role.form.companyListings')">
            <el-select v-model="form.customerId" :placeholder="$t('general.select')">
              <el-option
                v-for="item in customers"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('role.form.name')" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item :label="$t('role.form.description')" prop="description">
            <el-input v-model="form.description" type="textarea" />
          </el-form-item>
          <el-row>
            <el-col :span="12" :offset="4">
              <h5 style="padding-left: 15px">{{ $t('role.form.resources') }}</h5>
            </el-col>
          </el-row>
          <el-form-item v-for="type in resourceTypes" :key="type" :label="$t(`role.form.${type}`)">
            <el-checkbox-group v-model="resources[type]">
              <el-checkbox-button v-for="privilege in privileges" :key="privilege" :label="privilege">{{ $t(`general.${privilege}`) }}</el-checkbox-button>
            </el-checkbox-group>
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
import { fetchCustomers } from '@/api/customer'
import { RESOURCE_TYPE, SYSTEM_ROLE } from '@/enums'
import permission from '@/directive/permission'
import checkPermission from '@/utils/permission'

export default {
  name: 'RoleForm',
  directives: { permission },
  props: {
    role: {
      type: Object,
      default: () => {
        return {
          id: 0,
          name: '',
          description: '',
          resources: {},
          customerId: '',
          privileges: []
        }
      }
    }
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.nameRequired')))
      } else {
        callback()
      }
    }

    return {
      form: {
        id: 0,
        name: '',
        description: '',
        resources: {},
        customerId: '',
        privileges: []
      },
      resources: {
        device: [],
        group: [],
        customer: [],
        user: [],
        role: [],
        event: [],
        operator: []
      },
      customers: [],
      formRules: {
        name: [{
          required: true,
          trigger: 'blur',
          validator: validateName
        }]
      }
    }
  },
  computed: {
    resourceTypes() {
      return Object.entries(RESOURCE_TYPE).map((entry) => entry[1])
    },
    privileges() {
      return ['view', 'add', 'edit', 'delete']
    },
    roleResources() {
      return this.resourceTypes.map(type => {
        return {
          resource: type,
          add: this.resources[type].includes('add'),
          view: this.resources[type].includes('view'),
          edit: this.resources[type].includes('edit'),
          delete: this.resources[type].includes('delete')
        }
      })
    },
    hasAdminPermission() {
      return checkPermission([SYSTEM_ROLE.ADMIN])
    }
  },
  watch: {
    role: function(newRole, oldRole) {
      this.form.id = newRole.id
      this.form.name = newRole.name
      this.form.description = newRole.description
      newRole.privileges.map(p => {
        const privileageFacts = []
        if (p.add) {
          privileageFacts.push('add')
        }

        if (p.view) {
          privileageFacts.push('view')
        }

        if (p.edit) {
          privileageFacts.push('edit')
        }

        if (p.delete) {
          privileageFacts.push('delete')
        }

        this.resources[p.resource] = privileageFacts
      })
      this.form.customerId = newRole.customerId
    }
  },
  async mounted() {
    if (this.hasAdminPermission) {
      const { data } = await fetchCustomers()
      this.customers = data
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.privileges = this.roleResources
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
