<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :rules="formRules" :model="form" label-width="120px">
          <el-form-item :label="this.$t('driver.form.driverId')" prop="rfid">
            <el-input v-model="form.rfid" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="this.onSubmit">{{
              this.$t("general.save")
            }}</el-button>
            <el-button @click="$router.go(-1)">{{ this.$t("general.cancel") }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'RfidForm',
  props: {
    rfidData: {
      type: Object,
      default: () => {
        return {
          id: 0,
          rfid: '',
          assignStatus: '',
          createdBy: ''
        }
      }
    }
  },
  data() {
    const validaterfid = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.rfidRequired')))
      } else {
        callback()
      }
    }

    return {
      form: {
        id: 0,
        rfid: ''
      },
      dialogVisible: false,
      formRules: {
        rfid: [
          {
            required: true,
            trigger: 'blur',
            validator: validaterfid
          }
        ]
      }
    }
  },
  watch: {
    rfidData: function(newDriver, oldDriver) {
      this.form.id = newDriver.id
      this.form.rfid = newDriver.rfid
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

<style lang="scss" scoped></style>
