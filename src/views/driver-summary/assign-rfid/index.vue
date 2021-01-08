<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ this.$t("driver.new.assignRfid") }}</h3>
    <el-row>
      <el-form ref="form" :rules="formRules" :model="form" label-width="120px">
        <div>
          <el-row>
            <el-col :span="7">
              <el-form-item :label="this.$t('driver.listings.id')" prop="id">
                <el-input v-model="form.id" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item :label="$t('driver.listings.customer')">
                <company-selector v-if="hasAdminPermission" @change="onCustomerChanged" />
              </el-form-item>
              <el-form-item :label="this.$t('rfid.form.rfid')" prop="rfid">
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
                      {{ item.id }}
                      <span class="link">{{ item.customer_id }}</span>
                    </div>
                  </template>
                </el-autocomplete>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">{{
                  $t("general.save")
                }}</el-button>
                <el-button @click="$router.go(-1)">{{ $t("general.cancel") }}</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { fetchRfid } from '@/api/rfid'
import { assignRfid } from '@/api/driver'
import permission from '@/directive/permission'
import { SYSTEM_ROLE } from '@/enums'
import CompanySelector from '@/components/CompanySelector'
import checkPermission from '@/utils/permission'

export default {
  name: 'AssignRfid',
  directives: { permission },
  components: {
    CompanySelector
  },
  props: {
    operatorData: {
      type: Object,
      default: () => {
        return {
          id: '',
          rfid: {}
        }
      }
    }
  },
  data() {
    const validaterfid = (rule, value, callback) => {
      if (!this.customerId) {
        callback(new Error(this.$t('message.selectCustomer')))
      }
      if (!value) {
        callback(new Error(this.$t('message.rfidRequired')))
      } else {
        callback()
      }
    }

    const validateOperatorId = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.driverIdrequired')))
      } else {
        callback()
      }
    }

    return {
      form: {
        id: +this.$route.params.id,
        rfid: 0
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
          },
          {
            required: true,
            trigger: 'change',
            validator: validaterfid
          }
        ],
        id: [
          {
            required: true,
            trigger: 'blur',
            validator: validateOperatorId
          }
        ]
      }
    }
  },
  computed: {
    systemRole() {
      return SYSTEM_ROLE
    },
    hasAdminPermission() {
      return checkPermission([SYSTEM_ROLE.ADMIN])
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
          assignRfid(this.form)
            .then((response) => {
              this.loading = false
              this.$message({
                message: this.$t('message.rfidHasAssigned'),
                type: 'success'
              })
              this.$router.push('/drivers')
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
        response = await fetchRfid(this.listQuery, this.customerId)
        this.opIds = response
        this.loading = false
      } catch (exception) {
        this.loading = false
      }
    },
    querySearch(queryString, cb) {
      var opIds = this.opIds
      var results = queryString ? opIds.filter(this.createFilter(queryString)) : opIds
      // call callback function to return suggestion objects
      cb(results)
    },
    createFilter(queryString) {
      return (opIds) => {
        return opIds.id.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    handleSelect(item) {
      this.selectedId = item.id
      this.form.rfid = item.id
    },
    async onCustomerChanged(customerId) {
      this.customerId = customerId
      this.selectedId = ''
      this.form.rfid = ''
      await this.fetchListings()
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
