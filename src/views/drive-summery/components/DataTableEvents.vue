<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      default-expand-all
      stripe
    >
      <el-table-column prop="date" :label="$t('driveSummary.datetime')" />
      <el-table-column :label="$t('driveSummary.type')">
        <template slot-scope="scope">
          <i :class="scope.row.icon" />
          <span style="margin-left: 10px">{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operator" :label="$t('driveSummary.operator')" />
      <el-table-column :label="$t('general.video')">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.video"
            icon="fas fa-play"
            size="mini"
            @click="navigateToVideo(scope.row)"
          />
          <template v-if="!scope.row.video">
            <i class="fas fa-clock" />
            <span style="margin-left: 10px">{{ scope.row.videoStatus }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column :label="$t('driveSummary.maps')">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.map"
            icon="fa fa-map-marked-alt"
            size="mini"
            @click="navigateToMap(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column :label="$t('driveSummary.eventLabel')">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.map"
            icon="fa fa-info"
            size="mini"
            @click="navigateToEvent(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      :page.sync="page"
      :limit.sync="limit"
      :auto-scroll="false"
      @pagination="onPage"
    />
  </div>
</template>

<script>
import moment from 'moment'
import Pagination from '@/components/Pagination'

export default {
  name: 'DataTableEvents',
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
          const eventSummery = this.data[i]
          var row = {
            id: null,
            type: '',
            operator: '',
            date: '',
            icon: '',
            video: false,
            videoStatus: '',
            map: false
          }

          row.id = eventSummery.event_id
          row.date = moment(eventSummery.time).format(timeFormat)
          row.operator = eventSummery.driver_id
          var eventType = 'Unknown'
          var icon = ''
          switch (eventSummery.type) {
            case 16:
              eventType = this.$t('type.Acceleration')// 'Acceleration'
              icon = 'fas fa-shipping-fast'
              break
            case 17:
              eventType = this.$t('type.Deceleration') // 'Deceleration'
              icon = 'fas fa-parking'
              break
            case 14:
              eventType = this.$t('type.Button') // 'Button'
              icon = 'fas fa-hand-point-down'
              break
            case 20:
              eventType = this.$t('type.Impact')// 'Impact'
              icon = 'fas fa-car'
              break
            case 21:
              eventType = this.$t('type.TurnLeft')// 'Turn Left'
              icon = 'fas fa-arrow-left'
              break
            case 22:
              eventType = this.$t('type.TurnRight') // 'Turn Right'
              icon = 'fas fa-arrow-right'
              break
            case 23:
              eventType = this.$t('type.clip')// 'Clip'
              icon = 'fas fa-video'
              break
            default:
            // code block
          }
          if (eventSummery.video) {
            if (eventSummery.video.converted_video_url) {
              row.video = true
            }
            row.videoStatus = eventSummery.video.video_urls
              ? eventSummery.video.video_urls.length
              : 0
            row.videoStatus += '/' + eventSummery.number_of_cameras
          } else {
            row.videoStatus = 'N/A'
          }
          if (eventSummery.sensor_value.latitude !== 0) {
            row.map = true
          }

          row.type = eventType
          row.icon = icon
          this.tableData.push(row)
        }
      }
    },
    onPage({ page, limit }) {
      this.page = page
      this.limit = limit
      this.tableData = []
      this.processData()
    },
    navigateToMap(data) {
      this.$router.push({
        path: '/eventSummary/' + data.id + '/event-map'
      })
    },
    navigateToVideo(data) {
      this.$router.push({
        path: '/eventSummary/' + data.id + '/event-video'
      })
    },
    navigateToEvent(data) {
      this.$router.push({
        path: '/eventSummary/' + data.id + '/event-detail'
      })
    }
  }
}
</script>
<style>
</style>
