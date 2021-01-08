<template>
  <div class="app-container">
    <el-row>
      <el-form
        ref="form"
        :rules="formRules"
        :model="form"
        label-width="120px"
        size="mini"
      >
        <el-col :span="10">
          <el-form-item
            :label="$t('vehicleModel.form.manufacturer')"
            prop="manufacturerId"
          >
            <manufacturer-selector
              :id="form.manufacturerId ? +form.manufacturerId : 0"
              @change="onManufacturerChanged"
            />
          </el-form-item>
          <el-form-item :label="$t('vehicleModel.form.name')" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item :label="$t('vehicleModel.form.seriesName')" prop="seriesName">
            <el-input v-model="form.seriesName" />
          </el-form-item>
          <el-form-item :label="$t('vehicleModel.form.modelName')" prop="modelName">
            <el-input v-model="form.modelName" />
          </el-form-item>
          <el-form-item :label="$t('vehicleModel.form.powerType')" prop="powerType">
            <el-input v-model="form.powerType" />
          </el-form-item>
          <el-form-item
            :label="$t('vehicleModel.form.structuralMethod')"
            prop="structuralMethod"
          >
            <el-input v-model="form.structuralMethod" />
          </el-form-item>
          <el-form-item :label="$t('vehicleModel.form.engineModel')" prop="engineModel">
            <el-input v-model="form.engineModel" />
          </el-form-item>
          <el-form-item :label="$t('vehicleModel.form.ratedLoad')" prop="ratedLoad">
            <el-input v-model="form.ratedLoad" />
          </el-form-item>
          <el-form-item :label="$t('vehicleModel.form.forkLength')" prop="forkLength">
            <el-input v-model="form.forkLength" />
          </el-form-item>
          <el-form-item :label="$t('vehicleModel.form.forkWidth')" prop="forkWidth">
            <el-input v-model="form.forkWidth" />
          </el-form-item>
          <el-form-item :label="$t('vehicleModel.form.standardLift')" prop="standardLift">
            <el-input v-model="form.standardLift" />
          </el-form-item>
          <el-form-item :label="$t('vehicleModel.form.maximumLift')" prop="maximumLift">
            <el-input v-model="form.maximumLift" />
          </el-form-item>
          <el-form-item
            :label="$t('vehicleModel.form.batteryVoltage')"
            prop="batteryVoltage"
          >
            <el-input v-model="form.batteryVoltage" />
          </el-form-item>
          <el-form-item
            :label="$t('vehicleModel.form.batteryCapacity')"
            prop="batteryCapacity"
          >
            <el-input v-model="form.batteryCapacity" />
          </el-form-item>
        </el-col>
        <el-col :span="10" align="right">
          <el-form-item
            :label="$t('vehicleModel.form.fuelTankCapcity')"
            prop="fuelTankCapcity"
          >
            <el-input v-model="form.fuelTankCapcity" />
          </el-form-item>
          <el-form-item :label="$t('vehicleModel.form.bodyWeight')" prop="bodyWeight">
            <el-input v-model="form.bodyWeight" />
          </el-form-item>
          <el-form-item :label="$t('vehicleModel.form.bodyLength')" prop="bodyLength">
            <el-input v-model="form.bodyLength" />
          </el-form-item>
          <el-form-item :label="$t('vehicleModel.form.bodyWidth')" prop="bodyWidth">
            <el-input v-model="form.bodyWidth" />
          </el-form-item>
          <el-form-item
            :label="$t('vehicleModel.form.headGuardHeight')"
            prop="headGuardHeight"
          >
            <el-input v-model="form.headGuardHeight" />
          </el-form-item>
          <el-form-item
            :label="$t('vehicleModel.form.minTurningRadius')"
            prop="minTurningRadius"
          >
            <el-input v-model="form.minTurningRadius" />
          </el-form-item>
          <el-form-item
            :label="$t('vehicleModel.form.refLoadCenter')"
            prop="refLoadCenter"
          >
            <el-input v-model="form.refLoadCenter" />
          </el-form-item>
          <el-form-item
            :label="$t('vehicleModel.form.tireSizeFrontWheel')"
            prop="tireSizeFrontWheel"
          >
            <el-input v-model="form.tireSizeFrontWheel" />
          </el-form-item>
          <el-form-item
            :label="$t('vehicleModel.form.tireSizeRearWheel')"
            prop="tireSizeRearWheel"
          >
            <el-input v-model="form.tireSizeRearWheel" />
          </el-form-item>
          <el-form-item :label="$t('vehicleModel.form.remarks')" prop="remarks">
            <el-input v-model="form.remarks" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">{{
              $t("general.save")
            }}</el-button>
            <el-button @click="$router.go(-1)">{{ $t("general.cancel") }}</el-button>
          </el-form-item>
        </el-col>
      </el-form>
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
          seriesName: '',
          modelName: '',
          powerType: '',
          structuralMethod: '',
          engineModel: '',
          ratedLoad: '',
          forkLength: '',
          forkWidth: '',
          standardLift: '',
          maximumLift: '',
          batteryVoltage: '',
          batteryCapacity: '',
          fuelTankCapcity: '',
          bodyWeight: '',
          bodyLength: '',
          bodyWidth: '',
          headGuardHeight: '',
          minTurningRadius: '',
          refLoadCenter: '',
          tireSizeFrontWheel: '',
          tireSizeRearWheel: '',
          remarks: ''
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
        manufacturerId: '',
        seriesName: '',
        modelName: '',
        powerType: '',
        structuralMethod: '',
        engineModel: '',
        ratedLoad: '',
        forkLength: '',
        forkWidth: '',
        standardLift: '',
        maximumLift: '',
        batteryVoltage: '',
        batteryCapacity: '',
        fuelTankCapcity: '',
        bodyWeight: '',
        bodyLength: '',
        bodyWidth: '',
        headGuardHeight: '',
        minTurningRadius: '',
        refLoadCenter: '',
        tireSizeFrontWheel: '',
        tireSizeRearWheel: '',
        remarks: ''
      },
      dialogVisible: false,
      formRules: {
        name: [
          {
            required: true,
            trigger: 'blur',
            validator: validateName
          }
        ],
        seriesName: [
          {
            required: true,
            trigger: 'blur',
            validator: validateSeriesName
          }
        ],
        manufacturerId: [
          {
            required: true,
            trigger: 'blur',
            validator: validateManufacturerId
          }
        ]
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
