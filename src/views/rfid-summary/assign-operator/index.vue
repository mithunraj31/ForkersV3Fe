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
            <el-form-item
              :label="this.$t('driver.form.operatorName')"
              prop="name"
            >
              <el-autocomplete
                v-model="selectedId"
                popper-class="my-autocomplete"
                :fetch-suggestions="querySearch"
                :placeholder="$t('general.select')"
                @change="handleSelect"
                @select="handleSelect"
              >
                <template slot-scope="{ item }">
                  <div class="value">
                    {{ item.name }}
                    <span class="link">{{ item.id }}</span>
                  </div>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
        </div>
        <div>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item
                :label="this.$t('driver.form.driverId')"
                prop="operatorId"
              >
                <el-input v-model="form.operatorId" disabled />
              </el-form-item>
            </el-col>
            <el-form-item :label="this.$t('driver.form.dob')" prop="dob">
              <template>
                <el-date-picker v-model="form.dob" type="date" disabled />
              </template>
            </el-form-item>
            <el-col :span="12">
              <el-form-item
                :label="this.$t('driver.form.licenseNo')"
                prop="licenseNo"
              >
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
                  <el-date-picker
                    v-model="form.licenseReceived"
                    type="date"
                    disabled
                  />
                </template>
              </el-form-item>

              <el-form-item
                :label="this.$t('driver.form.licenseRenewal')"
                prop="licenseRenewal"
              >
                <template>
                  <el-date-picker
                    v-model="form.licenseRenewal"
                    type="date"
                    disabled
                  />
                </template>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="this.$t('driver.form.phoneNo')"
                prop="phoneNo"
              >
                <el-input v-model="form.phoneNo" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                :label="this.$t('driver.form.address')"
                prop="address"
              >
                <el-input v-model="form.address" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <el-button type="primary" @click="onSubmit">{{
                  $t("general.save")
                }}</el-button>
                <el-button @click="$router.go(-1)">{{
                  $t("general.cancel")
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
import { assignOperator } from '@/api/rfid'
import { fetchDrivers } from '@/api/driver'

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
          phoneNo: '',
          opIds: []
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

    const validateOperatorName = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.nameRequired')))
      } else {
        callback()
      }
    }

    return {
      form: {
        id: 0,
        rfid: this.$route.params.rfid,
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
      selectedId: '',
      formRules: {
        rfid: [
          {
            required: true,
            trigger: 'blur',
            validator: validaterfid
          }
        ],
        name: [
          {
            required: true,
            trigger: 'blur',
            validator: validateOperatorName
          },
          {
            required: true,
            trigger: 'change',
            validator: validateOperatorName
          }
        ]
      }
    }
  },
  mounted() {
    this.listQuery = {
      limit: 0,
      unAssigned: true,
      assigned: false
    }
    this.fetchListings()
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
    },
    async fetchListings() {
      let response = null
      this.loading = true
      try {
        response = await fetchDrivers(this.listQuery)
        this.opIds = response
        this.loading = false
      } catch (exception) {
        this.loading = false
      }
    },
    querySearch(queryString, cb) {
      var opIds = this.opIds
      var results = queryString
        ? opIds.filter(this.createFilter(queryString))
        : opIds
      // call callback function to return suggestion objects
      cb(results)
    },
    createFilter(queryString) {
      return (opIds) => {
        return (
          opIds.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect(item) {
      this.selectedId = item.name
      this.form.operatorId = item.id
      this.form.name = item.name
      this.form.dob = item.dob
      this.form.address = item.address
      this.form.licenseNo = item.license_no
      this.form.licenseReceived = item.license_received_date
      this.form.licenseRenewal = item.license_renewal_date
      this.form.licenseLocation = item.license_location
      this.form.phoneNo = item.phone_no
    }
  }
}
</script>

<style lang="scss" scoped>
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .value {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .link {
      font-size: 12px;
      color: #a18686;
    }
  }
}
</style>
