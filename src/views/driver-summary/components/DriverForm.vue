<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :rules="formRules" :model="form" label-width="120px">
          <el-form-item :label="this.$t('driver.form.driverId')" prop="operatorId">
            <el-input v-model="form.operatorId" />
          </el-form-item>
          <el-form-item :label="this.$t('driver.form.name')" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item :label="this.$t('driver.form.dob')" prop="dob">
            <template>
              <el-date-picker v-model="form.dob" type="date" />
            </template>
          </el-form-item>
          <el-form-item :label="this.$t('driver.form.address')" prop="address">
            <el-input v-model="form.address" />
          </el-form-item>
          <el-form-item :label="this.$t('driver.form.licenseNo')" prop="licenseNo">
            <el-input v-model="form.licenseNo" />
          </el-form-item>

          <el-form-item
            :label="this.$t('driver.form.licenseReceived')"
            prop="licenseReceived"
          >
            <template>
              <el-date-picker v-model="form.licenseReceived" type="date" />
            </template>
          </el-form-item>

          <el-form-item
            :label="this.$t('driver.form.licenseRenewal')"
            prop="licenseRenewal"
          >
            <template>
              <el-date-picker v-model="form.licenseRenewal" type="date" />
            </template>
          </el-form-item>

          <el-form-item
            :label="this.$t('driver.form.licenseLocation')"
            prop="licenseLocation"
          >
            <el-input v-model="form.licenseLocation" />
          </el-form-item>
          <el-form-item :label="this.$t('driver.form.phoneNo')" prop="phoneNo">
            <el-input v-model="form.phoneNo" />
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
  name: 'DriverForm',
  props: {
    driver: {
      type: Object,
      default: () => {
        return {
          id: 0,
          operatorId: '',
          name: '',
          dob: '',
          adress: '',
          licenseNo: '',
          licenseReceived: '',
          licenseRenewal: '',
          licenseLocation: '',
          phoneNo: ''
        }
      }
    }
  },
  data() {
    const validateOperatorId = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.driverIdRequired')))
      } else {
        callback()
      }
    }
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.nameRequired')))
      } else {
        callback()
      }
    }
    const validateDOB = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.dobRequired')))
      } else {
        callback()
      }
    }
    const validateLicenseNo = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.licenseNoRequired')))
      } else {
        callback()
      }
    }
    const validateLicenseReceived = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.licenseReceivedDateRequired')))
      } else {
        callback()
      }
    }
    const validateLicenseRenewal = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.licenseRenewalDateRequired')))
      } else {
        callback()
      }
    }
    const validateAddress = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.addressRequired')))
      } else {
        callback()
      }
    }
    const validateLicenseLocation = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.licenseLocationRequired')))
      } else {
        callback()
      }
    }
    const validatePhoneNumber = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.phoneNumberRequired')))
      } else {
        callback()
      }
    }
    return {
      form: {
        id: 0,
        operatorId: '',
        name: '',
        dob: '',
        address: '',
        licenseNo: '',
        licenseReceived: '',
        licenseRenewal: '',
        licenseLocation: '',
        phoneNo: ''
      },
      dialogVisible: false,
      formRules: {
        operatorId: [
          {
            required: true,
            trigger: 'blur',
            validator: validateOperatorId
          }
        ],
        name: [
          {
            required: true,
            trigger: 'blur',
            validator: validateName
          }
        ],
        dob: [
          {
            required: true,
            trigger: 'blur',
            validator: validateDOB
          }
        ],
        address: [
          {
            required: true,
            trigger: 'blur',
            validator: validateAddress
          }
        ],
        licenseNo: [
          {
            required: true,
            trigger: 'blur',
            validator: validateLicenseNo
          }
        ],
        licenseReceived: [
          {
            required: true,
            trigger: 'blur',
            validator: validateLicenseReceived
          }
        ],
        licenseRenewal: [
          {
            required: true,
            trigger: 'blur',
            validator: validateLicenseRenewal
          }
        ],
        licenseLocation: [
          {
            required: true,
            trigger: 'blur',
            validator: validateLicenseLocation
          }
        ],
        phoneNo: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePhoneNumber
          }
        ]
      }
    }
  },
  watch: {
    driver: function(newDriver, oldDriver) {
      this.form.id = newDriver.id
      this.form.operatorId = newDriver.operatorId
      this.form.name = newDriver.name
      this.form.dob = newDriver.dob
      this.form.address = newDriver.address
      this.form.licenseNo = newDriver.licenseNo
      this.form.licenseReceived = newDriver.licenseReceived
      this.form.licenseRenewal = newDriver.licenseRenewal
      this.form.licenseLocation = newDriver.licenseLocation
      this.form.phoneNo = newDriver.phoneNo
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
