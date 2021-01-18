<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form
          ref="form"
          :rules="formRules"
          :model="form"
          label-width="120px"
        >
          <el-form-item
            v-if="hasAdminPermission"
            :label="this.$t('rfid.form.customer')"
          >
            <company-selector @change="onCustomerChange" />
          </el-form-item>
          <el-form-item :label="this.$t('rfid.form.rfid')" prop="id">
            <el-input v-model="form.id" :disabled="disabled" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">{{
              this.$t("general.save")
            }}</el-button>
            <el-button @click="$router.go(-1)">{{
              this.$t("general.cancel")
            }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CompanySelector from '@/components/CompanySelector'
import permission from '@/directive/permission'
import checkPermission from '@/utils/permission'
import { SYSTEM_ROLE } from '@/enums'

export default {
  name: 'RfidForm',
  components: { CompanySelector },
  directives: { permission },
  props: {
    rfidData: {
      type: Object,
      default: () => {
        return {
          id: 0,
          customerId: '',
          disabled: false
        }
      }
    }
  },
  data() {
    const validateId = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.rfidRequired')))
      } else {
        callback()
      }
    }
    const validateCustomerId = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.customerRequired')))
      } else {
        callback()
      }
    }

    return {
      form: {
        id: '',
        customerId: ''
      },
      dialogVisible: false,
      formRules: {
        id: [
          {
            required: true,
            trigger: 'blur',
            validator: validateId
          }
        ],
        customerId: [
          {
            required: true,
            trigger: 'blur',
            validator: validateCustomerId
          }
        ]
      },
      disabled: false
    }
  },
  computed: {
    hasAdminPermission() {
      return checkPermission([SYSTEM_ROLE.ADMIN])
    }
  },
  watch: {
    rfidData: function(newRfid, oldRfid) {
      this.form.id = newRfid.id
      this.form.operatorId = newRfid.operatorId
      this.form.customerId = newRfid.customerId
      this.disabled = newRfid.disabled
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
    onCustomerChange(customerId) {
      this.form.customerId = customerId
    }
  }
}
</script>
