<template>
  <el-col :span="24">
    <el-table v-loading="loading" :data="events" style="width: 100%" @row-click="eventDetails">
      <el-table-column label="EventId" prop="eventId" width="350" />
      <el-table-column label="DeviceId" prop="deviceId" />
      <el-table-column label="Type" prop="type">
        <template slot-scope="scope">
          {{ typeName(scope.row.type) }}
        </template>
      </el-table-column>
      <el-table-column label="Video" prop="video">
        <template v-if="scope.row" slot-scope="scope">
          <i class="el-icon-video-camera-solid" />
        </template>
      </el-table-column>
      <el-table-column label="Company" prop="company" />
    </el-table>
    <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="onPaged" />
  </el-col>
</template>

<script>
import { fetchEvents } from '@/api/event'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      events: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      loading: false
    }
  },
  computed: {
    videoIcon() {
      return (video) => {
        if (video) {
          return 'true'
        }
      }
    },
    typeName() {
      return (type) => {
        switch (type) {
          case 0:
            return this.$t('Manual')
          case 1:
            return this.$t('Time')
          case 2:
            return this.$t('Motion')
          case 3:
            return this.$t('Speed')
          case 4:
            return this.$t('Gsensor')
          case 5:
            return this.$t('Temperature')
          case 6:
            return this.$t('Alaram' + '1')
          case 7:
            return this.$t('Alaram' + '2')
          case 8:
            return this.$t('Alaram' + '3')
          case 9:
            return this.$t('Alaram' + '4')
          case 10:
            return this.$t('Alaram' + '5')
          case 11:
            return this.$t('Alaram' + '6')
          case 12:
            return this.$t('Alaram' + '7')
          case 13:
            return this.$t('Alaram' + '8')
          case 14:
            return this.$t('Button')
          case 15:
            return this.$t('RFID')
          case 16:
            return this.$t('Accelerate')
          case 17:
            return this.$t('Deceleration')
          case 18:
            return this.$t('TurnAngle')
          case 19:
            return this.$t('TurnGyroscope')
          case 20:
            return this.$t('Impact')
          case 21:
            return this.$t('TurnLeft​')
          case 22:
            return this.$t('TurnRight')
          case 23:
            return this.$t('clip')
          default:
            return this.$t('none')
        }
      }
    }
  },

  async created() {
    this.listQuery = {
      page: +(this.$route.query.page || this.listQuery.page),
      limit: +(this.$route.query.limit || this.listQuery.limit)
    }
    this.$router.push({
      query: this.listQuery
    })
    await this.fetchListings(this.listQuery)
  },

  methods: {
    mapEventsToDataTable(event) {
      return {
        eventId: event.event_id,
        deviceId: event.device_id,
        type: event.type,
        video: event.video_id,
        company: event.username
      }
    },

    eventDetails(val) {
      this.$router.push(`/eventSummary/${val.eventId}/event-detail`)
    },
    async fetchListings() {
      let response = null
      this.loading = true
      response = await fetchEvents(this.listQuery)
      const datas = response.data.data
      this.total = response.data.total
      this.events = datas.map(this.mapEventsToDataTable)
      this.loading = false
      this.$router.push({
        query: this.listQuery
      })
    },

    async onPaged() {
      await this.fetchListings()
    }
  }
}
</script>

<style>
.click {
  color: blue;
  cursor: pointer;
}
</style>
