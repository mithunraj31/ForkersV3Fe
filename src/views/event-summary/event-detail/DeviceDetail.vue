<template>
  <el-card class="box-card">
    <el-table
      v-loading="detailLoading"
      :data="event"
      border
      size="small"
      style="width: 100%"
    >
      <el-table-column :label="this.$t('event.title')" prop="key" width="200">
        <template slot-scope="scope">
          <label>
            {{ $t(`event.${scope.row.key}`) }}
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
    return {
      event: null,
      detailLoading: false,
      mapEventsToDataTable(event) {
        return [
          {
            key: 'deviceId',
            value: event.device_id
          },
          {
            key: 'eventId',
            value: event.event_id
          },
          {
            key: 'type',
            value: event.type
          },
          {
            key: 'driverId',
            value: event.driver_id
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
    await this.getEventDetail()
  },
  methods: {
    async getEventDetail() {
      this.detailLoading = true
      const { data } = await fetchEventsById(this.$route.params.eventId)
      this.event = this.mapEventsToDataTable(data)
      this.detailLoading = false
    }
  }
}
</script>

<style>
</style>
