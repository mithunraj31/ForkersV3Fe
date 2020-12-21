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
          <el-form-item :label="this.$t('rfid.form.rfid')" prop="rfid">
            <el-input v-model="form.rfid" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="this.onSubmit">{{
              this.$t("general.save")
            }}</el-button>
            <el-button
              v-if="form.currentOperatorId === 0"
              type="primary"
              size="small"
              @click.native.prevent="
                $router.push(`/rfid/${form.rfid}/assign-operator`)
              "
            >
              {{ $t("rfid.listings.mapOperator") }}
            </el-button>
            <el-button
              v-if="form.currentOperatorId !== 0"
              type="danger"
              size="small"
              @click="removeOperatorClicked(form.rfid)"
            >
              {{ $t("rfid.listings.unMapOperator") }}
            </el-button>
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
import { removeOperator } from '@/api/rfid-history'
export default {
  name: 'RfidForm',
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

    return {
      form: {
        id: 0,
        rfid: '',
        currentOperatorId: ''
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
      this.form.currentOperatorId = newDriver.currentOperatorId
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
    },
    removeOperatorClicked($rfid) {
      let deleteConfirmMessage = this.$t('message.confirmRemove')
      deleteConfirmMessage = String.format(
        deleteConfirmMessage,
        `${this.$t('rfid.listings.rfid')}: ${$rfid}`
      )

      this.$confirm(deleteConfirmMessage, this.$t('general.warning'), {
        confirmButtonText: this.$t('general.confirm'),
        cancelButtonText: this.$t('general.cancel'),
        type: 'warning'
      }).then(() => {
        this.removeOperatorConfirmed($rfid)
      })
    },
    removeOperatorConfirmed($rfid) {
      this.loading = true
      removeOperator($rfid)
        .then(() => {
          this.$message({
            message: this.$t('message.operatorIsRemoved'),
            type: 'success'
          })
          this.$router.push(`/rfid`)
        })
        .catch(() => {
          this.loading = false
          this.$message({
            message: this.$t('message.somethingWentWrong'),
            type: 'danger'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
