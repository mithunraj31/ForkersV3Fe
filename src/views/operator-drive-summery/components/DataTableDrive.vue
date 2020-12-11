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
      <el-table-column prop="duration" label="Duration" />
      <el-table-column prop="device" label="Device" />
      <el-table-column label="Operations">
        <template slot-scope="scope">
          <el-button

            size="mini"
            @click="navigate(scope.row)"
          >Map</el-button>
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
            duration: '',
            device: ''
          }
          if (driveSummery.drive_started_at) {
            row.id =
              Math.floor(Math.random() * 100).toString() +
              driveSummery.drive_started_at
            row.start = moment(driveSummery.drive_started_at).format(
              timeFormat
            )
            row.startDate = driveSummery.drive_started_at
            if (driveSummery.drive_stoped_at) {
              row.end = moment(driveSummery.drive_stoped_at).format(
                timeFormat
              )
              row.endDate = driveSummery.drive_stoped_at
              row.duration = moment
                .duration(
                  new Date(driveSummery.drive_stoped_at) -
                    new Date(driveSummery.drive_started_at)
                )
                .format('H:mm:ss')
            }
            row.device = driveSummery.device_id
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
      console.log(data)
      this.$router.push({
        path: '/devices/' + data.device + '/drive-route',
        query: {
          start: data.startDate,
          end: data.endDate }
      })
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
