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
    const validateModelName = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.Required')))
      } else {
        callback()
      }
    }
    const validatePowerType = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.powerTypeRequired')))
      } else {
        callback()
      }
    }
    const validateStructuralMethod = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.structuralMethodRequired')))
      } else {
        callback()
      }
    }
    const validateEngineModel = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.engineModelRequired')))
      } else {
        callback()
      }
    }
    const validateRatedLoad = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.ratedLoadRequired')))
      } else {
        callback()
      }
    }
    const validateForkLength = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.forkLengthRequired')))
      } else {
        callback()
      }
    }
    const validateForkWidth = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.forkWidthRequired')))
      } else {
        callback()
      }
    }
    const validateStandardLift = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.standardLiftRequired')))
      } else {
        callback()
      }
    }
    const validateMaximumLift = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.maximumLiftRequired')))
      } else {
        callback()
      }
    }
    const validateBatteryVoltage = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.batteryVoltageRequired')))
      } else {
        callback()
      }
    }
    const validateBatteryCapacity = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.batteryCapacityRequired')))
      } else {
        callback()
      }
    }
    const validateFuelTankCapcity = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.fuelTankCapcityRequired')))
      } else {
        callback()
      }
    }
    const validateBodyWeight = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.bodyWeightRequired')))
      } else {
        callback()
      }
    }
    const validateBodyLength = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.bodyLengthRequired')))
      } else {
        callback()
      }
    }
    const validateBodyWidth = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.bodyWidthRequired')))
      } else {
        callback()
      }
    }
    const validateHeadGuardHeight = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.headGuardHeightRequired')))
      } else {
        callback()
      }
    }
    const validateMinTurningRadius = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.minTurningRadiusRequired')))
      } else {
        callback()
      }
    }
    const validateRefLoadCenter = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.refLoadCenterRequired')))
      } else {
        callback()
      }
    }
    const validateTireSizeFrontWheel = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.tireSizeFrontWheelRequired')))
      } else {
        callback()
      }
    }
    const validateTireSizeRearWheel = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.tireSizeRearWheelRequired')))
      } else {
        callback()
      }
    }
    const validateRemarks = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.remarksRequired')))
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
        ],
        modelName: [
          {
            required: true,
            trigger: 'blur',
            validator: validateModelName
          }
        ],
        powerType: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePowerType
          }
        ],
        structuralMethod: [
          {
            required: true,
            trigger: 'blur',
            validator: validateStructuralMethod
          }
        ],
        engineModel: [
          {
            required: true,
            trigger: 'blur',
            validator: validateEngineModel
          }
        ],
        ratedLoad: [
          {
            required: true,
            trigger: 'blur',
            validator: validateRatedLoad
          }
        ],
        forkLength: [
          {
            required: true,
            trigger: 'blur',
            validator: validateForkLength
          }
        ],
        forkWidth: [
          {
            required: true,
            trigger: 'blur',
            validator: validateForkWidth
          }
        ],
        standardLift: [
          {
            required: true,
            trigger: 'blur',
            validator: validateStandardLift
          }
        ],
        maximumLift: [
          {
            required: true,
            trigger: 'blur',
            validator: validateMaximumLift
          }
        ],
        batteryVoltage: [
          {
            required: true,
            trigger: 'blur',
            validator: validateBatteryVoltage
          }
        ],
        batteryCapacity: [
          {
            required: true,
            trigger: 'blur',
            validator: validateBatteryCapacity
          }
        ],
        fuelTankCapcity: [
          {
            required: true,
            trigger: 'blur',
            validator: validateFuelTankCapcity
          }
        ],
        bodyWeight: [
          {
            required: true,
            trigger: 'blur',
            validator: validateBodyWeight
          }
        ],
        bodyLength: [
          {
            required: true,
            trigger: 'blur',
            validator: validateBodyLength
          }
        ],
        bodyWidth: [
          {
            required: true,
            trigger: 'blur',
            validator: validateBodyWidth
          }
        ],
        headGuardHeight: [
          {
            required: true,
            trigger: 'blur',
            validator: validateHeadGuardHeight
          }
        ],
        minTurningRadius: [
          {
            required: true,
            trigger: 'blur',
            validator: validateMinTurningRadius
          }
        ],
        refLoadCenter: [
          {
            required: true,
            trigger: 'blur',
            validator: validateRefLoadCenter
          }
        ],
        tireSizeFrontWheel: [
          {
            required: true,
            trigger: 'blur',
            validator: validateTireSizeFrontWheel
          }
        ],
        tireSizeRearWheel: [
          {
            required: true,
            trigger: 'blur',
            validator: validateTireSizeRearWheel
          }
        ],
        remarks: [
          {
            required: true,
            trigger: 'blur',
            validator: validateRemarks
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
      this.form.modelName = vehicleModel.modelName
      this.form.powerType = vehicleModel.powerType
      this.form.structuralMethod = vehicleModel.structuralMethod
      this.form.engineModel = vehicleModel.engineModel
      this.form.ratedLoad = vehicleModel.ratedLoad
      this.form.forkLength = vehicleModel.forkLength
      this.form.forkWidth = vehicleModel.forkWidth
      this.form.standardLift = vehicleModel.standardLift
      this.form.maximumLift = vehicleModel.maximumLift
      this.form.batteryVoltage = vehicleModel.batteryVoltage
      this.form.batteryCapacity = vehicleModel.batteryCapacity
      this.form.fuelTankCapcity = vehicleModel.fuelTankCapcity
      this.form.bodyWeight = vehicleModel.bodyWeight
      this.form.bodyLength = vehicleModel.bodyLength
      this.form.bodyWidth = vehicleModel.bodyWidth
      this.form.headGuardHeight = vehicleModel.headGuardHeight
      this.form.minTurningRadius = vehicleModel.minTurningRadius
      this.form.refLoadCenter = vehicleModel.refLoadCenter
      this.form.tireSizeFrontWheel = vehicleModel.tireSizeFrontWheel
      this.form.tireSizeRearWheel = vehicleModel.tireSizeRearWheel
      this.form.remarks = vehicleModel.remarks
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
