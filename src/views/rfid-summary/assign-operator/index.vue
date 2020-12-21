<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ this.$t("rfid.new.assignOperator") }}</h3>
    <el-row>
      <el-form ref="form" :rules="formRules" :model="form" label-width="120px">
        <div>
          <el-col :span="12">
            <el-form-item :label="this.$t('rfid.form.rfid')" prop="rfid">
              <el-input v-model="form.rfid" disabled />
            </el-form-item>
            <el-form-item :label="this.$t('driver.form.driverId')" prop="operatorId">
              <el-input v-model="form.operatorId" />
            </el-form-item>
          </el-col>
        </div>
        <div>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item :label="this.$t('driver.form.name')" prop="name">
                <el-input v-model="form.name" disabled />
              </el-form-item>
            </el-col>
            <el-form-item :label="this.$t('driver.form.dob')" prop="dob">
              <template>
                <el-date-picker v-model="form.dob" type="date" disabled />
              </template>
            </el-form-item>
            <el-col :span="12">
              <el-form-item :label="this.$t('driver.form.licenseNo')" prop="licenseNo">
                <el-input v-model="form.licenseNo" disabled />
              </el-form-item>

              <el-form-item
                :label="this.$t('driver.form.licenseLocation')"
                prop="licenseLocation"
              >
                <el-input v-model="form.licenseLocation" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                :label="this.$t('driver.form.licenseReceived')"
                prop="licenseReceived"
              >
                <template>
                  <el-date-picker v-model="form.licenseReceived" type="date" disabled />
                </template>
              </el-form-item>

              <el-form-item
                :label="this.$t('driver.form.licenseRenewal')"
                prop="licenseRenewal"
              >
                <template>
                  <el-date-picker v-model="form.licenseRenewal" type="date" disabled />
                </template>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="this.$t('driver.form.phoneNo')" prop="phoneNo">
                <el-input v-model="form.phoneNo" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="this.$t('driver.form.address')" prop="address">
                <el-input v-model="form.address" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <el-button type="primary" @click="this.onSubmit">{{
                  this.$t("general.save")
                }}</el-button>
                <el-button @click="$router.go(-1)">{{
                  this.$t("general.cancel")
                }}</el-button>
              </el-form-item>
            </el-col>
          </el-col>
        </div>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { assignOperator } from '@/api/rfid-history'
import { fetchDriverById } from '@/api/driver'

export default {
  name: 'AssignRfid',
  props: {
    rfidData: {
      type: Object,
      default: () => {
        return {
          id: 0,
          rfid: '',
          currentOperatorId: 0,
          name: '',
          dob: '',
          address: '',
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
    const validaterfid = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.rfidRequired')))
      } else {
        callback()
      }
    }

    const validateOperatorId = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.driverIdRequired')))
      } else if (value) {
        fetchDriverById(value)
          .then((response) => {
            if (!response) {
              callback(new Error(this.$t('message.driverIdNotFound')))
            } else {
              this.form.name = response.data.name
              this.form.dob = response.data.dob
              this.form.address = response.data.address
              this.form.licenseNo = response.data.license_no
              this.form.licenseReceived = response.data.license_received_date
              this.form.licenseRenewal = response.data.license_renewal_date
              this.form.licenseLocation = response.data.license_location
              this.form.phoneNo = response.data.phone_no
              callback()
            }
          })
          .catch(() => {
            callback(new Error(this.$t('message.driverIdNotFound')))
          })
      } else {
        callback()
      }
    }

    return {
      form: {
        id: 0,
        rfid: +this.$route.params.rfid,
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
      loading: false,
      formRules: {
        rfid: [
          {
            required: true,
            trigger: 'blur',
            validator: validaterfid
          }
        ],
        operatorId: [
          {
            required: true,
            trigger: 'change',
            validator: validateOperatorId
          }
        ]
      }
    }
  },

  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          assignOperator(this.form)
            .then((response) => {
              this.loading = false
              this.$message({
                message: this.$t('message.operatorHasAssigned'),
                type: 'success'
              })
              this.$router.push('/rfid')
            })
            .catch(() => {
              this.loading = false
              this.$message({
                message: this.$t('message.somethingWentWrong'),
                type: 'error'
              })
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
