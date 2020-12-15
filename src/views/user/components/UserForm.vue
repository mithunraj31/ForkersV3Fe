<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :rules="formRules" :model="form" label-width="120px">
          <el-form-item :label="$t('user.form.firstName')" prop="firstName">
            <el-input v-model="form.firstName" />
          </el-form-item>
          <el-form-item :label="$t('user.form.lastName')" prop="lastName">
            <el-input v-model="form.lastName" />
          </el-form-item>
          <el-form-item :label="$t('user.form.userEmail')" prop="email">
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item :label="$t('user.form.userRole')" prop="role">
            <el-select v-model="form.role" :rules="formRules" filterable :placeholder="$t('user.form.userRole')">
              <el-option :label="$t('general.admin')" value="admin" />
              <el-option :label="$t('general.user')" value="user" />
              <el-option :label="$t('general.readOnly')" value="read-only" />
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
import {
  validEmail
} from '@/utils/validate'
import {
  isEmailAlreadyRegistered
} from '@/api/user'

export default {
  name: 'UserForm',
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          id: 0,
          name: '',
          email: '',
          role: 'user',
          password: '',
          confirmPassword: ''
        }
      }
    }
  },
  data() {
    // const validateName = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error(this.$t('message.userNameRequired')))
    //   } else {
    //     callback()
    //   }
    // }
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.emailRequired')))
      } else if (!validEmail(value)) {
        callback(new Error(this.$t('message.emailNotValid')))
      } else if (
        this.previousEmail === '' ||
                (this.previousEmail !== '' && this.previousEmail !== value)
      ) {
        isEmailAlreadyRegistered(value)
          .then((response) => {
            if (response.is_exists) {
              callback(new Error(this.$t('message.emailAlreadyRegistered')))
            } else {
              callback()
            }
          })
          .catch(() => {
            callback(new Error(this.$t('message.somethingWentWrong')))
          })
      } else {
        callback()
      }
    }
    const validateRole = (rule, value, callback) => {
      if (!value) {
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
        // name: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: ''
      },
      dialogVisible: false,
      formRules: {
        // name: [{
        //   required: true,
        //   trigger: 'blur',
        //   validator: validateName
        // }],
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
  watch: {
    user: function(newUser, oldUser) {
      this.form.id = newUser.id
      // this.form.name = newUser.name
      this.form.email = newUser.email
      this.form.role = newUser.role
      this.visible = false
      this.previousEmail = newUser.email
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
