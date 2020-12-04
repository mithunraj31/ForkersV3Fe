<template>
  <div class="app-container">
    <el-col :span="24">
      <el-table
        v-loading="loading"
        :data="devices"
        border
        size="small"
        stripe
        style="width: 100%"
      >
        <el-table-column :label="this.$t('device.deviceId')" prop="deviceId" />
        <el-table-column :label="this.$t('device.driverId')" prop="driverId" />
        <el-table-column :label="this.$t('device.type')" prop="type">
          <template slot-scope="scope">
            {{ scope.row.type }}
          </template>
        </el-table-column>
        <el-table-column :label="this.$t('device.userName')" prop="userName" />
        <el-table-column :label="this.$t('general.action')" width="300">
          <template slot-scope="scope">
            <el-dropdown>
              <el-button type="primary" class="device-summary-btn" size="mini">
                {{ $t("device.drive")
                }}<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown" size="mini">
                <el-dropdown-item>
                  <div class="block">
                    <el-date-picker
                      v-model="drivetimeRange"
                      type="datetimerange"
                      :picker-options="pickerOptions"
                      range-separator="~"
                      :start-placeholder="$t('general.begin')"
                      :end-placeholder="$t('general.end')"
                      align="right"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      @change="driveClick(drivetimeRange, scope.row.deviceId)"
                    />
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown>
              <el-button size="mini">
                {{ $t("device.route")
                }}<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown" size="mini">
                <el-dropdown-item>
                  <div class="block">
                    <el-date-picker
                      v-model="routetimeRange"
                      type="datetimerange"
                      :picker-options="pickerOptions"
                      range-separator="~"
                      :start-placeholder="$t('general.begin')"
                      :end-placeholder="$t('general.end')"
                      align="middle"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      @change="routeClick(routetimeRange, scope.row.deviceId)"
                    />
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown>
              <el-button size="mini" type="primary" plain class="video-btn">
                {{ $t("device.video")
                }}<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown" size="mini">
                <el-dropdown-item>
                  <div class="block">
                    <el-date-picker
                      v-model="videotimeRange"
                      type="datetimerange"
                      :picker-options="pickerOptions"
                      range-separator="~"
                      :start-placeholder="$t('general.begin')"
                      :end-placeholder="$t('general.end')"
                      align="right"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      @change="videoClick(videotimeRange, scope.row.deviceId)"
                    />
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="onPaged"
      />
    </el-col>
  </div>
</template>

<script>
import { fetchDevices } from '@/api/device'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      devices: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      loading: false,
      pickerOptions: {
        shortcuts: [
          {
            text: this.$t('general.thisHour'),
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 1)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: this.$t('general.toDay'),
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setHours(0)
              start.setMinutes(0)
              start.setSeconds(0)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: this.$t('general.thisWeek'),
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: this.$t('general.thisMonth'),
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      drivetimeRange: '',
      routetimeRange: '',
      videotimeRange: '',
      start: '',
      end: ''
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
    mapDatasToDataTable(device) {
      return {
        deviceId: device.device_id,
        driverId: device.driver_id,
        type: device.type,
        status: device.status,
        userName: device.user_name
      }
    },

    driveClick(drivetimeRange, deviceId) {
      this.start = drivetimeRange[0]
      this.end = drivetimeRange[1]
      this.$router.push(
        `/devices/${deviceId}/drive-summary?start=${this.start}&end=${this.end}`
      )
    },

    routeClick(routetimeRange, deviceId) {
      this.$router.push(
        `/devices/${deviceId}/drive-route?start=${routetimeRange[0]}&end=${routetimeRange[1]}`
      )
    },

    videoClick(videotimeRange, deviceId) {
      this.$router.push(
        `/video/${deviceId}/create?start=${videotimeRange[0]}&end=${videotimeRange[1]}`
      )
    },

    async fetchListings() {
      let response = null
      this.loading = true
      response = await fetchDevices()
      const datas = response.data
      this.devices = datas.map(this.mapDatasToDataTable)
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

.device-summary-btn {
  margin-right: 5px;
}

.video-btn {
  margin-left: 5px;
}
</style>
