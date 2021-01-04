<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      default-expand-all
      :row-class-name="tableRowClassName"
      border
    >
      <el-table-column prop="start" :label="$t('driveSummary.startDatetime')" />
      <el-table-column prop="end" :label="$t('driveSummary.endDatetime')" />
      <el-table-column prop="type" :label="$t('driveSummary.type')" />
      <el-table-column prop="duration" :label="$t('driveSummary.duration')" />
      <el-table-column prop="operator" :label="$t('driveSummary.operations')" />
      <el-table-column :label="$t('driveSummary.operator')">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="navigate(scope.row)"
          >{{ $t('driveSummary.maps') }}</el-button>
        </template>
      </el-table-column>
      <el-table-column :label="$t('general.video')">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="newVideo(scope.row)"
          >{{ $t('general.create') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      :page.sync="page"
      :limit.sync="limit"
      @pagination="onPage"
    />
  </div>
</template>

<script>
import moment from '@/utils/moment'
import Pagination from '@/components/Pagination'

export default {
  name: 'DataTableDrive',
  components: {
    Pagination
  },
  props: {
    deviceId: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      tableData: [],
      total: 0,
      page: 1,
      limit: 10
    }
  },
  computed: {
    currentLocale() {
      return this.$store.state.app.language || 'en'
    }
  },
  watch: {
    data: function(newVal, OldVal) {
      this.processData()
    }
  },
  async mounted() {
    this.processData()
  },
  methods: {
    processData() {
      this.total = this.data.length
      var timeFormat = 'dddd, MMMM Do YYYY, H:mm:ss'
      moment.locale(this.currentLocale)
      if (this.data && this.data.length > 0) {
        for (
          var i = (this.page - 1) * this.limit;
          i < this.data.length && i < this.page * this.limit;
          i++
        ) {
          const driveSummery = this.data[i]
          var row = {
            id: null,
            start: '',
            end: '',
            startDate: '',
            endDate: '',
            type: '',
            duration: '',
            operator: ''
          }
          if (driveSummery.engine_started_at) {
            row.id =
              Math.floor(Math.random() * 100).toString() +
              driveSummery.engine_started_at
            row.start = moment(driveSummery.engine_started_at).format(
              timeFormat
            )
            row.startDate = driveSummery.engine_started_at
            row.type = this.$t('driveSummary.vehicleDrivingData')
            if (driveSummery.engine_stoped_at) {
              row.end = moment(driveSummery.engine_stoped_at).format(
                timeFormat
              )
              row.endDate = driveSummery.engine_stoped_at
              row.duration = moment
                .duration(
                  new Date(driveSummery.engine_stoped_at) -
                    new Date(driveSummery.engine_started_at)
                )
                .format('H:mm:ss')
            }
            row.operator = ''
            // when driver data is found
            if (
              driveSummery.driver_data &&
              driveSummery.driver_data.length > 0
            ) {
              var children = []
              driveSummery.driver_data.forEach((driver) => {
                var child = {}
                if (driver.drive_start_at) {
                  child['id'] =
                    Math.floor(Math.random() * 100).toString() +
                    driver.drive_start_at
                  child['start'] = moment(driver.drive_start_at).format(
                    timeFormat
                  )
                  child['startDate'] = driver.drive_start_at
                  child['type'] = this.$t('driveSummary.operatorDrivingData')
                  child['operator'] = driver.driver_id
                }
                if (driver.drive_ended_at) {
                  child['end'] = moment(driver.drive_ended_at).format(
                    timeFormat
                  )
                  child['endDate'] = driver.drive_ended_at
                  child['duration'] = moment
                    .duration(
                      new Date(driver.drive_ended_at) -
                        new Date(driver.drive_start_at)
                    )
                    .format('H:mm:ss')
                }
                children.push(child)
              })
              row['children'] = children
            }
          }
          this.tableData.push(row)
        }
      }
    },
    tableRowClassName({ row }) {
      if (row.type === this.$t('driveSummary.vehicleDrivingData')) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
    },
    onPage({ page, limit }) {
      this.page = page
      this.limit = limit
      this.tableData = []
      this.processData()
    },
    navigate(data) {
      this.$router.push({
        path: '/devices/' + this.deviceId + '/drive-route',
        query: {
          start: data.startDate,
          end: data.endDate }
      })
    },
    newVideo(row) {
      this.$router.push(`/video/${this.deviceId}/create?start=${row.startDate}&end=${row.endDate}`)
    }
  }
}
</script>
<style>
.el-table .warning-row {
  background: #e5edf5;
}

.el-table .success-row {
  background: #e6f5f0;
}
</style>
