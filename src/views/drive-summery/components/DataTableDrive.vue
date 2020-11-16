<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      default-expand-all
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="start" label="Start" />
      <el-table-column prop="end" label="End" />
      <el-table-column prop="type" label="Type" />
      <el-table-column prop="duration" label="Duration" />
      <el-table-column prop="operator" label="Operator" />
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
import moment from 'moment'
import Pagination from '@/components/Pagination'
moment.duration.fn.format = function(input) {
  var output = input
  var milliseconds = this.asMilliseconds()
  var totalMilliseconds = 0
  var replaceRegexps = {
    years: /Y(?!Y)/g,
    months: /M(?!M)/g,
    weeks: /W(?!W)/g,
    days: /D(?!D)/g,
    hours: /H(?!H)/g,
    minutes: /m(?!m)/g,
    seconds: /s(?!s)/g,
    milliseconds: /S(?!S)/g
  }
  var matchRegexps = {
    years: /Y/g,
    months: /M/g,
    weeks: /W/g,
    days: /D/g,
    hours: /H/g,
    minutes: /m/g,
    seconds: /s/g,
    milliseconds: /S/g
  }
  for (var r in replaceRegexps) {
    if (replaceRegexps[r].test(output)) {
      var as = 'as' + r.charAt(0).toUpperCase() + r.slice(1)
      var value = Math.floor(
        moment.duration(milliseconds - totalMilliseconds)[as]()
      ).toString()
      var replacements = output.match(matchRegexps[r]).length - value.length
      output = output.replace(replaceRegexps[r], value)

      while (replacements > 0 && replaceRegexps[r].test(output)) {
        output = output.replace(replaceRegexps[r], '0')
        replacements--
      }
      output = output.replace(matchRegexps[r], '')

      var temp = {}
      temp[r] = value
      totalMilliseconds += moment.duration(temp).asMilliseconds()
    }
  }
  return output
}
export default {
  name: 'DataTableDrive',
  components: {
    Pagination
  },
  props: {
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
      moment.locale('ja')
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
            row.type = '車両の走行データ'
            if (driveSummery.engine_stoped_at) {
              row.end = moment(driveSummery.engine_stoped_at).format(
                timeFormat
              )
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
                  child['type'] = 'オペレーターの走行データ'
                  child['operator'] = driver.driver_id
                }
                if (driver.drive_ended_at) {
                  child['end'] = moment(driver.drive_ended_at).format(
                    timeFormat
                  )
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
      if (row.type === '車両の走行データ') {
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
