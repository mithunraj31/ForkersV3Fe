<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="Table View" name="first">User</el-tab-pane>
    <el-tab-pane label="Maps View" name="second">Config</el-tab-pane>
    <el-tab-pane label="Statistic view" name="third">Role</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
