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
      <el-table-column label="Title" prop="key" width="200">
        <template slot-scope="scope">
          <label>
            {{ scope.row.key }}
          </label>
        </template>
      </el-table-column>
      <el-table-column label="Value" prop="value" />
    </el-table>
  </el-card>
</template>

<script>
import { fetchEventsById } from '@/api/event'
export default {
  name: 'DeviceDetail',
  data() {
    return {
      events: null,
      detailLoading: false,
      mapEventsToDataTable(event) {
        return [
          {
            key: 'DeviceId',
            value: event.device_id
          },
          {
            key: 'EventId',
            value: event.event_id
          },
          {
            key: 'driverId',
            value: event.driver_id
          },
          {
            key: 'type',
            value: event.type
          },
          {
            key: 'latitude',
            value: event.latitude
          },
          {
            key: 'longitude',
            value: event.longitude
          },
          {
            key: 'gx',
            value: event.gx
          },
          {
            key: 'gy',
            value: event.gy
          },
          {
            key: 'gz',
            value: event.gz
          },
          {
            key: 'roll',
            value: event.roll
          },
          {
            key: 'pitch',
            value: event.pitch
          },
          {
            key: 'yaw',
            value: event.yaw
          },
          {
            key: 'status',
            value: event.status
          },
          {
            key: 'direction',
            value: event.direction
          },
          {
            key: 'speed',
            value: event.speed
          },
          {
            key: 'videoId',
            value: event.video_id
          },
          {
            key: 'time',
            value: event.time
          },
          {
            key: 'username',
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
