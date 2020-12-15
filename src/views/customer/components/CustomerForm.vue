<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :rules="formRules" :model="form" label-width="120px">
          <el-form-item :label="$t('customer.form.name')" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item :label="$t('customer.form.description')" prop="description">
            <el-input v-model="form.description" type="textarea" />
          </el-form-item>
          <el-form-item :label="$t('customer.form.stkUser')" prop="stkUser">
            <el-input v-model="form.stkUser" />
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
export default {
  name: 'UserForm',
  props: {
    customer: {
      type: Object,
      default: () => {
        return {
          id: 0,
          name: '',
          description: '',
          stkUser: ''
        }
      }
    }
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.userNameRequired')))
      } else {
        callback()
      }
    }

    const validateStkUser = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.stkUserRequired')))
      } else {
        callback()
      }
    }

    return {
      visible: true,
      form: {
        id: 0,
        name: '',
        description: '',
        stkUser: ''
      },
      dialogVisible: false,
      formRules: {
        name: [{
          required: true,
          trigger: 'blur',
          validator: validateName
        }],
        stkUser: [{
          required: true,
          trigger: 'blur',
          validator: validateStkUser
        }]
      }
    }
  },
  watch: {
    customer: function(newCustomer, oldCustomer) {
      this.form.id = newCustomer.id
      this.form.name = newCustomer.name
      this.form.description = newCustomer.description
      this.form.stkUser = newCustomer.stkUser
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
