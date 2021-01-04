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
        <el-table-column :label="this.$t('event.eventId')" prop="eventId">
          <template slot-scope="scope">
            <label class="click" @click="eventClick(scope.row.eventId)">
              {{ scope.row.eventId }}
            </label>
          </template>
        </el-table-column>
        <el-table-column :label="this.$t('event.deviceId')" prop="deviceId" />
        <el-table-column :label="this.$t('event.type')" prop="type">
          <template slot-scope="scope">
            {{ typeName(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column :label="this.$t('event.video')" prop="video">
          <template slot-scope="scope">
            <div
              v-if="scope.row.video"
              class="click"
              @click="videoClick(scope.row.eventId)"
            >
              <i class="el-icon-video-camera-solid" />
              <span>{{ scope.row.videoUrl }}/{{ scope.row.cameras }}
                {{ $t("video.available") }}</span>
            </div>
            <div v-else>
              <i class="el - icon - video - camera - solid" />
              <span v-if="scope.row.cameras == 0">
                {{ $t("video.noCamera") }}</span>
              <span
                v-else
              >{{ scope.row.videoUrl }}/{{ scope.row.cameras }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="this.$t('event.company')" prop="company" />
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
            return this.$t('type.Manual')
          case 1:
            return this.$t('type.Time')
          case 2:
            return this.$t('type.Motion')
          case 3:
            return this.$t('type.Speed')
          case 4:
            return this.$t('type.Gsensor')
          case 5:
            return this.$t('type.Temperature')
          case 6:
            return this.$t('type.Alaram') + '1'
          case 7:
            return this.$t('type.Alaram') + '2'
          case 8:
            return this.$t('type.Alaram') + '3'
          case 9:
            return this.$t('type.Alaram') + '4'
          case 10:
            return this.$t('type.Alaram') + '5'
          case 11:
            return this.$t('type.Alaram') + '6'
          case 12:
            return this.$t('type.Alaram') + '7'
          case 13:
            return this.$t('type.Alaram') + '8'
          case 14:
            return this.$t('type.Button')
          case 15:
            return this.$t('type.RFID')
          case 16:
            return this.$t('type.Accelerate')
          case 17:
            return this.$t('type.Deceleration')
          case 18:
            return this.$t('type.TurnAngle')
          case 19:
            return this.$t('type.TurnGyroscope')
          case 20:
            return this.$t('type.Impact')
          case 21:
            return this.$t('type.TurnLeft')
          case 22:
            return this.$t('type.TurnRight')
          case 23:
            return this.$t('type.clip')
          default:
            return this.$t('type.none')
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
        eventId: event.event_id,
        deviceId: event.device_id,
        type: event.type,
        video: event.video.converted_video_url,
        company: event.username,
        cameras: event.number_of_cameras,
        videoUrl: event.video.video_urls.length
      }
    },

    eventClick(eventId) {
      localStorage.setItem('Tab', 'first')
      this.$router.push(`/event-summary/${eventId}/event-detail`)
    },

    videoClick(eventId) {
      localStorage.setItem('Tab', 'third')
      this.$router.push(`/event-summary/${eventId}/event-detail`)
    },

    async fetchListings() {
      let response = null
      this.loading = true
      response = await fetchEvents(this.listQuery)
      const datas = response.data
      this.total = response.total
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

<style lang="scss">
$--color-primary: #005D74;

.click {
  color: $--color-primary;
  cursor: pointer;
}

.box-card {
  width: 100%;
}
</style>
