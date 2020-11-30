<template>
  <el-card class="box-card" shadow="always">
    <el-col :span="24">
      <el-table
        v-loading="loading"
        :data="events"
        border
        size="small"
        style="width: 100%"
      >
        <el-table-column label="EventId" prop="eventId" width="200">
          <template slot-scope="scope">
            <label class="click" @click="eventClick(scope.row.eventId)">
              {{ scope.row.eventId }}
            </label>
          </template>
        </el-table-column>
        <el-table-column label="DeviceId" prop="deviceId" />
        <el-table-column label="Type" prop="type">
          <template slot-scope="scope">
            {{ typeName(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column label="Video" prop="video">
          <template slot-scope="scope">
            <div
              v-if="scope.row.video"
              class="click"
              @click="videoClick(scope.row.eventId)"
            >
              <i class="el-icon-video-camera-solid" />
              <span>Available</span>
            </div>
            <div v-else class="unclick">
              <i class="el-icon-video-camera-solid" />
              <span>Processing</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Company" prop="company" />
      </el-table>
      <pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="onPaged"
      />
    </el-col>
  </el-card>
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

  async mounted() {
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
        eventId: event.eventId,
        deviceId: event.deviceId,
        type: event.type,
        video: event.video.convertedVideoUrl,
        company: event.username
      }
    },

    eventClick(eventId) {
      this.$router.push(`/eventSummary/${eventId}/event-detail`)
    },

    videoClick(eventId) {
      this.$router.push(`/eventSummary/${eventId}/event-video`)
    },

    eventDetails(val) {
      this.$router.push(`/eventSummary/${val.eventId}/event-detail`)
    },
    async fetchListings() {
      let response = null
      this.loading = true
      response = await fetchEvents(this.listQuery)
      const datas = response.data
      this.total = datas.length
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

.box-card {
  width: 100%;
}
</style>
