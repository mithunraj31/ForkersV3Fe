<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :rules="formRules" :model="form" label-width="120px">
          <el-form-item :label="$t('manufacturer.form.name')" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item :label="$t('manufacturer.form.description')" prop="description">
            <el-input v-model="form.description" type="textarea" />
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
  name: 'ManufacturerForm',
  props: {
    manufacturer: {
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
        callback(new Error(this.$t('message.manufacturerRequired')))
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
  watch: {
    manufacturer: function(manufacturer) {
      this.form.id = manufacturer.id
      this.form.name = manufacturer.name
      this.form.description = manufacturer.description
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
