<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ this.$t("rfid.new.assignOperator") }}</h3>
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :rules="formRules" :model="form" label-width="120px">
          <el-form-item :label="this.$t('rfid.form.rfid')" prop="rfid">
            <el-input v-model="form.rfid" disabled />
          </el-form-item>
          <el-form-item :label="this.$t('driver.form.driverId')" prop="operatorId">
            <el-input v-model="form.operatorId" />
          </el-form-item>
          <div v-if="form.operatorId">
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
          </div>
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

    const validateOperatorId = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.driverIdRequired')))
      } else if (value) {
        fetchDriverById(value)
          .then((response) => {
            if (!response) {
              callback(new Error(this.$t('message.driverIdNotFound')))
            } else {
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
        operatorId: ''
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
            trigger: 'blur',
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
