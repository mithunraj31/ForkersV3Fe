<template>
  <div class="app-container">
    <el-row :gutter="5">
      <el-col class="col-layout">
        <el-card class="box-card">
          <h3>オペレータ毎の総アラーム数、総稼働時間、運転スコア（リスト表示）​</h3>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="operatorName" :label="'オペレータ'" />
            <el-table-column prop="alarmCount" :label="'合計アラーム数'" />
            <el-table-column prop="totalDrivingTime" :label="'総運転時間'" />
            <el-table-column prop="drivingScore" :label="'ドライビングスコア​'" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col
        v-for="chart in charts"
        :key="chart.id"
        class="col-layout"
        :span="chart.size"
      >
        <el-card class="box-card">
          <component :is="chart.chartKey" :id="chart.id" :api="chart.api" :title="chart.title" />
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
import LevelChartTemp2 from '@/components/Vitualization/LevelChart/temp2'
import LevelChartTemp3 from '@/components/Vitualization/LevelChart/temp3'
import LevelChartTemp4 from '@/components/Vitualization/LevelChart/temp4'
import LevelChartTemp5 from '@/components/Vitualization/LevelChart/temp5'

import SetsChartTemp2 from '@/components/Vitualization/SetsChart/temp2'

import OperatorDrivingTime from '@/components/Charts/OperatorDrivingTime'
import VehicleMaintenance from '@/components/Charts/VehicleMaintenance'


export default {
  name: 'Dashboard',
  components: { SetsChart, RegularBarChart, LevelChart,
    LevelChartTemp2, LevelChartTemp3, LevelChartTemp4, LevelChartTemp5,
    SetsChartTemp2, OperatorDrivingTime, VehicleMaintenance },
  data() {
    return {
      charts: [
        {
          id: 5,
          chartKey: 'level-chart-temp-2',
          size: CHART_SIZE.EXTRA_LARGE
        },
        {
          id: 1,
          chartKey: CHART_COMPONENT.LEVEL_CHART,
          size: CHART_SIZE.EXTRA_LARGE
        },
        {
          id: 6,
          chartKey: 'level-chart-temp-3',
          size: CHART_SIZE.EXTRA_LARGE
        },
        {
          id: 7,
          chartKey: 'level-chart-temp-4',
          size: CHART_SIZE.EXTRA_LARGE
        },
        {
          id: 8,
          chartKey: 'level-chart-temp-5',
          size: CHART_SIZE.EXTRA_LARGE
        },
        {
          id: 2,
          chartKey: CHART_COMPONENT.SETS_CHART,
          size: CHART_SIZE.EXTRA_LARGE
        },
        {
          id: 10,
          chartKey: 'sets-chart-temp-2',
          size: CHART_SIZE.EXTRA_LARGE
        },
        {
          id: 3,
          chartKey: CHART_COMPONENT.OPERATOR_DRIVING_TIME,
          size: CHART_SIZE.EXTRA_LARGE,
          api: '/data-summary/operator-driving-time',
        },
        {
          id: 4,
          chartKey: CHART_COMPONENT.VEHICLE_MAINTENANCE,
          size: CHART_SIZE.EXTRA_LARGE,
          api: '/data-summary/vehicle-group-maintenance',
        }
      ],
      tableData: [
        {
          operatorName: 'A',
          alarmCount: 10,
          totalDrivingTime: '10’54’’​',
          drivingScore: 2
        },
        {
          operatorName: 'B',
          alarmCount: 25,
          totalDrivingTime: '58’06’’​',
          drivingScore: 2
        },
        {
          operatorName: 'C',
          alarmCount: 8,
          totalDrivingTime: '23’48’’​',
          drivingScore: 2
        },
        {
          operatorName: 'D',
          alarmCount: 9,
          totalDrivingTime: '5’12’’​',
          drivingScore: 2
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
