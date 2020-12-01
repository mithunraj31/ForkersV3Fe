<template>
  <el-card class="box-card">
    <el-table
      v-loading="detailLoading"
      :data="events"
      border
      size="small"
      stripe
      style="width: 100%"
    >
      <el-table-column :label="this.$t('event.title')" prop="key" width="200">
        <template slot-scope="scope">
          <label>
            {{ scope.row.key }}
          </label>
        </template>
      </el-table-column>
      <el-table-column :label="this.$t('event.value')" prop="value" />
    </el-table>
  </el-card>
</template>

<script>
import { fetchEventsById } from '@/api/event'
export default {
  name: 'DeviceDetail',
  data() {
    const deviceIdColumn = this.$t('event.deviceId')
    const eventIdColumn = this.$t('event.eventId')
    const typeColumn = this.$t('event.type')
    const driverIdColumn = this.$t('event.driverId')
    const latitudeColumn = this.$t('event.latitude')
    const longitudeColumn = this.$t('event.longitude')
    const gxColumn = this.$t('event.gx')
    const gyColumn = this.$t('event.gy')
    const gzColumn = this.$t('event.gz')
    const rollColumn = this.$t('event.roll')
    const pitchColumn = this.$t('event.pitch')
    const yawColumn = this.$t('event.yaw')
    const statusColumn = this.$t('event.status')
    const directionColumn = this.$t('event.direction')
    const speedColumn = this.$t('event.speed')
    const videoIdColumn = this.$t('event.videoId')
    const timeColumn = this.$t('event.time')
    const usernameColumn = this.$t('event.username')
    return {
      events: null,
      detailLoading: false,
      mapEventsToDataTable(event) {
        return [
          {
            key: deviceIdColumn,
            value: event.device_id
          },
          {
            key: eventIdColumn,
            value: event.event_id
          },
          {
            key: driverIdColumn,
            value: event.driver_id
          },
          {
            key: typeColumn,
            value: event.type
          },
          {
            key: latitudeColumn,
            value: event.latitude
          },
          {
            key: longitudeColumn,
            value: event.longitude
          },
          {
            key: gxColumn,
            value: event.gx
          },
          {
            key: gyColumn,
            value: event.gy
          },
          {
            key: gzColumn,
            value: event.gz
          },
          {
            key: rollColumn,
            value: event.roll
          },
          {
            key: pitchColumn,
            value: event.pitch
          },
          {
            key: yawColumn,
            value: event.yaw
          },
          {
            key: statusColumn,
            value: event.status
          },
          {
            key: directionColumn,
            value: event.direction
          },
          {
            key: speedColumn,
            value: event.speed
          },
          {
            key: videoIdColumn,
            value: event.video_id
          },
          {
            key: timeColumn,
            value: event.time
          },
          {
            key: usernameColumn,
            value: event.username
          }
        ]
      }
    }
  },
  async mounted() {
    await this.fetchListings()
  },
  methods: {
    async fetchListings() {
      this.detailLoading = true
      let response = null
      this.loading = true
      response = await fetchEventsById(this.$route.params.eventId)
      const datas = response.data
      this.events = datas.map(this.mapEventsToDataTable)
      this.events = this.events[0]
      this.detailLoading = false
    }
  }
}
</script>

<style>
</style>
