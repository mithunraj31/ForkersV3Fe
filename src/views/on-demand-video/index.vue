<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="VideoRange">
      <el-radio-group v-model="form.resource">
        <el-radio label="From Start" />
        <el-radio label="From End" />
        <el-radio label="Custom" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Time Range">
      <el-date-picker
        v-model="value1"
        type="datetimerange"
        range-separator="To"
        start-placeholder="Start Time"
        end-placeholder="End Time"
      />
    </el-form-item>
    <el-form-item>
      <el-button disabled type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        resource: ''
      },
      value1: [new Date(2020, 12, 2, 13, 55), new Date(2020, 12, 2, 14)]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
