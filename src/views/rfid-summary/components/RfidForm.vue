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
          <el-form-item :label="this.$t('rfid.form.rfid')" prop="id">
            <el-input v-model="form.id" />
          </el-form-item>
          <el-form-item
            :label="this.$t('rfid.form.customer')"
            prop="customerId"
          >
            <el-input v-model="form.customerId" />
          </el-form-item>
          <el-form-item :label="this.$t('rfid.form.group')" prop="groupId">
            <el-input v-model="form.groupId" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="this.onSubmit">{{
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
export default {
  name: 'RfidForm',
  props: {
    rfidData: {
      type: Object,
      default: () => {
        return {
          id: 0,
          customerId: '',
          groupId: '',
          createdBy: ''
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
    const validateGroupId = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.groupRequired')))
      } else {
        callback()
      }
    }

    return {
      form: {
        id: '',
        customerId: '',
        groupId: ''
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
        ],
        groupId: [
          {
            required: true,
            trigger: 'blur',
            validator: validateGroupId
          }
        ]
      }
    }
  },
  watch: {
    rfidData: function(newRfid, oldRfid) {
      this.form.operatorId = newRfid.operatorId
      this.form.id = newRfid.id
      this.form.customerId = newRfid.customerId
      this.form.groupId = newRfid.groupId
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
