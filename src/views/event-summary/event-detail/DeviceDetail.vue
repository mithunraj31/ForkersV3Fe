<template>
  <div class="app-container">
    <div v-for="item in events" :key="item.key">
      <el-row>
        <el-col
          :span="3"
        ><div class="grid-content bg-purple" align="middle">
          <label> {{ item.key }}</label>
        </div>
        </el-col>
        <el-col
          :span="12"
        ><div class="grid-content bg-purple-light" align="middle">
          {{ item.value }}
        </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { fetchEventsById } from '@/api/event'
export default {
  name: 'DeviceDetail',
  data() {
    return {
      events: null,
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
            key: 'video_id',
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
      let response = null
      this.loading = true
      response = await fetchEventsById(this.$route.params.eventId)
      const datas = response.data
      this.events = datas.map(this.mapEventsToDataTable)
      this.events = this.events[0]
      this.loading = false
    }
  }
}
</script>

<style>
.el-row {
  margin-bottom: 10px;
}
.el-col {
  border-radius: 2px;
}

.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 2px;
  min-height: 10px;
}
.row-bg {
  padding: 0;
  background-color: #f9fafc;
}
</style>
