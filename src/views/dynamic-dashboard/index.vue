<template>
  <div class="app-container">
    <el-row>
      <el-col class="tool-bar" :span="24">
        <el-button @click="dialogFormVisible = true" type="primary">New chart</el-button>
        <el-button @click="isEditable = !isEditable" type="warning">edit mode: {{ isEditable? 'On': 'Off' }}</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col class="col-layout">
        <el-card class="box-card" shadow="never">
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
      <draggable v-model="charts" :options="{disabled : !isEditable}" v-bind:class="{ 'editable': isEditable }">
         <el-col
            v-for="chart in charts"
            :key="chart.id"
            class="col-layout"
            :span="chart.size">
        <el-card class="box-card" :shadow="isEditable ? 'hover': 'never'">
          <el-button v-if="isEditable" class= "delete-chart" type="danger" @click="onDeleteChartClicked(chart.id)">X</el-button>
          <component :is="chart.chartKey" :id="chart.id" :api="chart.api" :title="chart.title" />
        </el-card>
      </el-col>
      </draggable>

    </el-row>
      <el-dialog title="New Chart" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="chart name" :label-width="formLabelWidth">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="template" :label-width="formLabelWidth">
            <el-select v-model="form.template" placeholder="Please select a chart templete">
              <el-option  v-for="temp in chartTemplates"
              :key="temp.component" :label="temp.name" :value="temp.component"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="size" :label-width="formLabelWidth">
            <el-select v-model="form.size" placeholder="Please select a chart size">
              <el-option label="Extra large" :value="24"></el-option>
              <el-option label="Large" :value="18"></el-option>
              <el-option label="Meduim" :value="12"></el-option>
              <el-option label="Small" :value="6"></el-option>
              <el-option label="Extra small" :value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="addNewChart">Confirm</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import draggable from 'vuedraggable'
import { CHART_COMPONENT, CHART_SIZE } from '@/enums/chart'

import OperatorEventSummary from '@/components/Charts/OperatorEventSummary'
import VehicleEventSummary from '@/components/Charts/VehicleEventSummary'
import VehicleGroupEventSummary from '@/components/Charts/VehicleGroupEventSummary'
import AllPeriodOperatorEventSummary from '@/components/Charts/AllPeriodOperatorEventSummary'
import AllPeriodVehicleEventSummary from '@/components/Charts/AllPeriodVehicleEventSummary'
import VehicleGroupEventWithRunningHours from '@/components/Charts/VehicleGroupEventWithRunningHours'
import AlarmVehicleGroup from '@/components/Charts/AlarmVehicleGroup'
import OperatorDrivingTime from '@/components/Charts/OperatorDrivingTime'
import VehicleMaintenance from '@/components/Charts/VehicleMaintenance'


export default {
  name: 'Dashboard',
  components: {
    OperatorDrivingTime,
    VehicleMaintenance,
    VehicleGroupEventWithRunningHours,
    AlarmVehicleGroup,
    draggable,
    OperatorEventSummary,
    VehicleEventSummary,
    VehicleGroupEventSummary,
    AllPeriodOperatorEventSummary,
    AllPeriodVehicleEventSummary
  },
  data() {
    return {
       dialogFormVisible: false,
        form: {
          name: '',
          template: null,
          size: CHART_SIZE.EXTRA_LARGE
        },
        formLabelWidth: '120px',
      isEditable: false,
      chartTemplates: [
        {
          name: 'B1) オペレータ毎のアラーム数・種別と稼働時間​​',
          component: CHART_COMPONENT.OPERATOR_EVENT_SUMMARY,
          api: '/data-summary/event/operators?start=2020-11-01&end=2021-01-25&operator_ids=3,4,5'
        },
        {
          name: 'B2) 車両毎のアラーム数・種別と稼働時間',
          component: CHART_COMPONENT.VEHICLE_EVENT_SUMMARY,
          api: '/data-summary/event/vehicles?start=2020-11-01&end=2021-01-25&vehicle_ids=2'
        },
        {
          name: 'B3) 車両グループ毎のアラーム数・種別と稼働時間​',
          component: CHART_COMPONENT.VEHICLE_GROUP_EVENT_SUMMARY,
          api: '/data-summary/event/vehicle-groups?start=2020-11-01&end=2021-01-25&group_ids=83,84,86,107,92,107'
        },
        {
          name: 'C1) 期間毎の全オペレータのアラーム総数・種別と総稼働時間​',
          component: CHART_COMPONENT.ALL_PERIOD_OPERATOR_EVENT_SUMMARY,
          api: '/data-summary/alarms/operators?start=2021-01-18&end=2021-01-22'
        },
        {
          name: 'C2) 期間毎の全車両のアラーム総数・種別と総稼働時間​',
          component: CHART_COMPONENT.ALL_PERIOD_VEHICLE_EVENT_SUMMARY,
          api: '/data-summary/alarms/vehicles?start=2021-01-18&end=2021-01-22'
        },
        {
          name: '期間毎の車両グループ毎のアラーム数と全車両グループの総稼働時間​',
          component: CHART_COMPONENT.ALARM_VEHICLE_GROUP,
          api: '/data-summary/alarms/vehicle'
        },
        {
          name: '期間毎の車両グループ毎のアラーム数と全車両グループの総稼働時間​',
          component: CHART_COMPONENT.VEHICLE_GROUP_EVENT_WITH_RUNNING_HOURS,
          api: '/data-summary/alarms/vehicle',
        },
        {
          name: '車両のメンテナンス情報​',
          component: CHART_COMPONENT.OPERATOR_DRIVING_TIME,
          api: '/data-summary/operator-driving-time',
        },
        {
          name: 'オペレータ毎の連続安全運転時間​',
          component: CHART_COMPONENT.VEHICLE_MAINTENANCE,
          api: '/data-summary/vehicle-group-maintenance',
        },
      ],
      charts: [
        {
          id: 1,
          chartKey: CHART_COMPONENT.OPERATOR_EVENT_SUMMARY,
          size: CHART_SIZE.MEDUIM,
          api: '/data-summary/event/operators?start=2020-11-01&&end=2021-01-25&operator_ids=3,4,5'
        },
        {
          id: 5,
          chartKey: CHART_COMPONENT.VEHICLE_EVENT_SUMMARY,
          size: CHART_SIZE.MEDUIM,
          api: '/data-summary/event/vehicles?start=2020-11-01&end=2021-01-25&vehicle_ids=2'
        },
        {
          id: 6,
          chartKey: CHART_COMPONENT.VEHICLE_GROUP_EVENT_SUMMARY,
          size: CHART_SIZE.EXTRA_LARGE,
          api: '/data-summary/event/vehicle-groups?start=2020-11-01&end=2021-01-25&group_ids=83,84,86,107,92,107'
        },
        {
          id: 7,
          chartKey: CHART_COMPONENT.ALL_PERIOD_OPERATOR_EVENT_SUMMARY,
          size: CHART_SIZE.EXTRA_LARGE,
          api: '/data-summary/alarms/operators?start=2021-01-18&end=2021-01-22'
        },
        {
          id: 8,
          chartKey: CHART_COMPONENT.ALL_PERIOD_VEHICLE_EVENT_SUMMARY,
          size: CHART_SIZE.EXTRA_LARGE,
          api: '/data-summary/alarms/vehicles?start=2021-01-18&end=2021-01-22'
        },
        // {
        //   id: 2,
        //   chartKey: CHART_COMPONENT.ALARM_VEHICLE_GROUP,
        //   size: CHART_SIZE.MEDUIM,
        //   api: '/data-summary/alarms/vehicle'
        // },
        // {
        //   id: 10,
        //   chartKey: CHART_COMPONENT.VEHICLE_GROUP_EVENT_WITH_RUNNING_HOURS,
        //   size: CHART_SIZE.MEDUIM,
        //   api: '/data-summary/alarms/vehicle',
        // },
        {
          id: 3,
          chartKey: CHART_COMPONENT.OPERATOR_DRIVING_TIME,
          size: CHART_SIZE.MEDUIM,
          api: '/data-summary/operator-driving-time',
        },
        {
          id: 4,
          chartKey: CHART_COMPONENT.VEHICLE_MAINTENANCE,
          size: CHART_SIZE.MEDUIM,
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
  created() {},
  methods: {
    addNewChart() {
      const template = this.chartTemplates.filter(x => x.component === this.form.template)[0]
      this.charts.unshift({
          id: Math.floor(Math.random() * 1000000),
          chartKey: template.component,
          size: this.form.size,
          api: template.api,
          title: this.form.name
        })
      this.form = {
        name: '',
        template: null,
        size: 24
      }
      this.dialogFormVisible  = false
    },
    onDeleteChartClicked(id) {
      let deleteConfirmMessage = this.$t('message.confirmDelete')
      const selectedChart = this.charts.filter(x => x.id === id)[0]
      deleteConfirmMessage = String.format(
        deleteConfirmMessage,
        selectedChart.title || selectedChart.id
      )

      this.$confirm(deleteConfirmMessage, this.$t('general.warning'), {
        confirmButtonText: this.$t('general.confirm'),
        cancelButtonText: this.$t('general.cancel'),
        type: 'warning'
      }).then(() => {
        this.deleteChart(id)
      })
    },
    deleteChart(id) {
      console.log(this.charts)
       this.charts = this.charts.filter(x => x.id !== id)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-col {
  margin-bottom: 5px !important;
}
.editable {
  .el-card {
    &:active {
      cursor: grabbing !important;
    }
    &:hover {
      cursor: grab;
    }

  }
}
.delete-chart {
    float:right;
    position:relative;
    margin-top:-20px;
    margin-right: -20px;
    font-weight: bold;

    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
    animation-iteration-count:infinite;
}

.tool-bar {
  text-align: right;
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
