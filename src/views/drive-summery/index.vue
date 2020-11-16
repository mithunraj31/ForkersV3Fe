<template>
  <div class="app-container">
    <el-row v-loading="loading">
      <time-line
        v-if="!loading"
        :drive-summery="driveSummery"
        :header="header"
        :events="events"
      />
    </el-row>
    <h3>{{ deviceId }}の走行データ</h3>
    <el-row>
      <data-table-drive :data="driveSummery" />
    </el-row>
    <h3>{{ deviceId }}のイベント</h3>
    <el-row>
      <data-table-events :data="events" />
    </el-row>
  </div>
</template>

<script>
import { fetchDriveSummery, fetchEventsByDeviceIdAndTime } from '@/api/device'
import TimeLine from './components/TimeLine'
import DataTableDrive from './components/DataTableDrive'
import DataTableEvents from './components/DataTableEvents'

export default {
  name: 'DriveSummery',
  components: {
    TimeLine,
    DataTableDrive,
    DataTableEvents
  },
  props: {
    deviceId: { type: String, default: '' },
    start: { type: String, default: '' },
    end: { type: String, default: '' }
  },
  data() {
    return {
      driveSummery: [],
      events: [],
      header: {
        headline: '',
        subtitle: ''
      },
      loading: false
    }
  },
  async mounted() {
    console.log(this.deviceId, this.start, this.end)
    if (this.deviceId && this.start && this.end) {
      await this.fetchData()
      await this.getEventData()
    }
  },
  methods: {
    async fetchData() {
      this.loading = true
      const data = await fetchDriveSummery(this.deviceId, this.start, this.end)
      this.driveSummery = data
      this.makeHeader()
      this.loading = false
    },
    async getEventData() {
      this.loading = true
      const data = await fetchEventsByDeviceIdAndTime(
        this.deviceId,
        this.start,
        this.end
      )
      this.events = data.data

      this.loading = false
    },
    makeHeader() {
      let operatorSessionCount = 0
      this.driveSummery.forEach((drive) => {
        if (drive.driver_data) {
          operatorSessionCount += drive.driver_data.length
        }
      })
      this.header.headline = this.deviceId + 'の走行データ'
      this.header.subtitle =
        '<p> ' +
        this.start +
        ' - ' +
        this.end +
        '</p><p>' +
        this.driveSummery.length +
        '車両の走行データと ' +
        operatorSessionCount +
        'オペレーターの走行データが見つかりました</p>'
      // this.header.subtitle = "hellow";
    }
  }
}
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  z-index: 400;
}

body {
  margin: 0;
}
</style>
