<template>
  <div class="app-container">
    <el-row :gutter="5">
      <el-col
        v-for="chart in charts"
        :key="chart.id"
        class="col-layout"
        :span="chart.size"
      >
        <el-card class="box-card">
          <component :is="chart.chartKey" :id="chart.id" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  SetsChart,
  RegularBarChart,
  LevelChart
} from '@/components/Vitualization'
import { CHART_COMPONENT, CHART_SIZE } from '@/enums/chart'

export default {
  name: 'Dashboard',
  components: { SetsChart, RegularBarChart, LevelChart },
  data() {
    return {
      charts: [
        {
          id: 1,
          chartKey: CHART_COMPONENT.LEVEL_CHART,
          size: CHART_SIZE.LARGE
        },
        {
          id: 2,
          chartKey: CHART_COMPONENT.SETS_CHART,
          size: CHART_SIZE.LARGE
        },
        {
          id: 3,
          chartKey: CHART_COMPONENT.REGULAR_BAR_CHART,
          size: CHART_SIZE.LARGE
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.el-col {
  margin-bottom: 5px !important;
}
</style>
