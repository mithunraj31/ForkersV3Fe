<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ this.$t("driver.new.assignRfid") }}</h3>
    <el-row>
      <el-form ref="form" :rules="formRules" :model="form" label-width="120px">
        <div>
          <el-col :span="12">
            <el-form-item :label="this.$t('driver.listings.id')" prop="id">
              <el-input v-model="form.id" disabled />
            </el-form-item>
            <el-form-item :label="this.$t('rfid.form.rfid')" prop="rfid">
              <el-input v-model="form.rfid" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="this.onSubmit">{{
                $t("general.save")
              }}</el-button>
              <el-button @click="$router.go(-1)">{{ $t("general.cancel") }}</el-button>
            </el-form-item>
          </el-col>
        </div>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { assignRfid } from '@/api/driver'

export default {
  name: 'AssignRfid',
  props: {
    operatorData: {
      type: Object,
      default: () => {
        return {
          id: 0,
          rfid: ''
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
        callback(new Error(this.$t('message.driverIdrequired')))
      } else {
        callback()
      }
    }

    return {
      form: {
        id: +this.$route.params.id,
        rfid: ''
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

  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          console.log(this.form)
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
