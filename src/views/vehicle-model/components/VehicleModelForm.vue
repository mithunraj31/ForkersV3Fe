<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :rules="formRules" :model="form" label-width="120px">
          <el-form-item :label="$t('vehicleModel.form.manufacturer')" prop="manufacturerId">
            <manufacturer-selector :id="form.manufacturerId ? +form.manufacturerId : 0" @change="onManufacturerChanged" />
          </el-form-item>
          <el-form-item :label="$t('vehicleModel.form.name')" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item :label="$t('vehicleModel.form.seriesName')" prop="seriesName">
            <el-input v-model="form.seriesName" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">{{
              $t("general.save")
            }}</el-button>
            <el-button @click="$router.go(-1)">{{
              $t("general.cancel")
            }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ManufacturerSelector from '@/components/ManufacturerSelector'
import { fetchManufacturers } from '@/api/manufacturer'
export default {
  name: 'VehicleModelForm',
  components: { ManufacturerSelector },
  props: {
    vehicleModel: {
      type: Object,
      default: () => {
        return {
          id: 0,
          name: '',
          description: ''
        }
      }
    }
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.vehicleModelNameRequired')))
      } else {
        callback()
      }
    }

    const validateSeriesName = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.seriesNameRequired')))
      } else {
        callback()
      }
    }

    const validateManufacturerId = (rule, value, callback) => {
      console.log('validateManufacturerId')
      if (!value) {
        callback(new Error(this.$t('message.manufacturerRequired')))
      } else {
        callback()
      }
    }

    return {
      manufacturers: [],
      visible: true,
      loading: false,

      form: {
        id: 0,
        name: '',
        description: '',
        manufacturerId: ''
      },
      dialogVisible: false,
      formRules: {
        name: [{
          required: true,
          trigger: 'blur',
          validator: validateName
        }],
        seriesName: [{
          required: true,
          trigger: 'blur',
          validator: validateSeriesName
        }],
        manufacturerId: [{
          required: true,
          trigger: 'blur',
          validator: validateManufacturerId
        }]
      }
    }
  },
  watch: {
    vehicleModel: function(vehicleModel) {
      this.form.id = vehicleModel.id
      this.form.name = vehicleModel.name
      this.form.seriesName = vehicleModel.seriesName
    }
  },
  async mounted() {
    await this.fetchManufacturerListings()
  },
  methods: {
    async fetchManufacturerListings() {
      this.loading = true
      const { data } = await fetchManufacturers(null, this.manufacturerId)
      this.manufacturers = data
      this.loading = false
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('onFormSubmit', {
            ...this.form
          })
        }
      })
    },
    async onManufacturerChanged(manufacturerId) {
      this.manufacturerId = manufacturerId
      await this.fetchManufacturerListings()
    }
  }
}
</script>

<style lang="scss" scoped></style>
