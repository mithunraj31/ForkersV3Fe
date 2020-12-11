<template>
  <div class="app-container">
    <el-row v-loading="loading">
      <time-line
        v-if="!loading"
        :drive-summery="driveSummery"
        :header="header"
        :events="events"
        :operator-id="operatorId"
      />
    </el-row>
    <h3>{{ operatorId }}の走行データ</h3>
    <el-row>
      <data-table-drive :data="driveSummery" />
    </el-row>
    <h3>{{ operatorId }}のイベント</h3>
    <el-row>
      <data-table-events :data="events" />
    </el-row>
  </div>
</template>

<script>
import { fetchOperatorDriveSummary, fetchOperatorEvents } from '@/api/operator'
import TimeLine from './components/TimeLine'
import DataTableDrive from './components/DataTableDrive'
import DataTableEvents from './components/DataTableEvents'
import moment from '@/utils/moment'

export default {
  name: 'OperatorDriveSummery',
  components: {
    TimeLine,
    DataTableDrive,
    DataTableEvents
  },
  props: {
    operatorId: { type: String, default: '' },
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
      loading: false,
      duration: 0
    }
  },
  computed: {
    currentLocale() {
      return this.$store.state.app.language || 'en'
    }
  },
  async mounted() {
    if (this.operatorId && this.start && this.end) {
      moment.locale(this.currentLocale)
      await this.fetchData()
      await this.getEventData()
    }
  },
  methods: {
    async fetchData() {
      this.loading = true
      const data = await fetchOperatorDriveSummary(this.operatorId, this.start, this.end)
      this.driveSummery = data.data
      this.duration = data.duration
      this.makeHeader()
      this.loading = false
    },
    async getEventData() {
      this.loading = true
      const data = await fetchOperatorEvents(
        this.operatorId,
        this.start,
        this.end
      )
      this.events = data.data

      this.loading = false
    },
    makeHeader() {
      var timeFormat = 'dddd, MMMM Do YYYY, H:mm:ss'
      this.header.headline = this.operatorId + 'の走行データ'
      this.header.subtitle =
        '<p> ' +
        moment(this.start).format(timeFormat) +
        ' - ' +
        moment(this.end).format(timeFormat) +
        '</p><p>' +
        this.driveSummery.length +
        'オペレーターの走行データが見つかりました</p>' +
        '</p>Total Duration: ' + moment.duration(this.duration, 'seconds').format('H:mm:ss') + '</p>'
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
