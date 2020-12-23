<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :rules="formRules" :model="form" label-width="120px">
          <el-form-item :label="$t('group.form.name')" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item :label="$t('group.form.description')" prop="description">
            <el-input v-model="form.description" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button
              v-permission="[systemRole.ADMIN, groupPrivilege.EDIT]"
              size="mini"
              type="primary"
              @click="onSubmit"
            >{{
              $t("general.save")
            }}</el-button>
            <el-button size="mini" @click="onCancel">{{
              $t("general.cancel")
            }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import checkPermission from '@/utils/permission'
import { SYSTEM_ROLE, GROUP_PRIVILEGE } from '@/enums'

export default {
  name: 'CustomerGroupForm',
  directives: {
    permission
  },
  props: {
    group: {
      type: Object,
      default: () => {
        return {
          id: 0,
          name: '',
          description: ''
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
      visible: true,
      form: {
        id: 0,
        name: '',
        description: ''
      },
      dialogVisible: false,
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
    group: function(newGroup, oldCustomer) {
      this.form.id = newGroup.id
      this.form.name = newGroup.name
      this.form.description = newGroup.description
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('onFormSubmit', {
            ...this.form
          })
        }
      })
    },
    onCancel() {
      this.$emit('onCancel')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
