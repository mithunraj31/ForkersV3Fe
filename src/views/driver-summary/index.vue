<template>
  <div class="app-container">
    <el-row class="filter-section">
      <el-col :span="20" class="new-driver-button-section">
        <el-checkbox
          v-model="assigned"
          :label="$t('general.assigned')"
          border
          @change="onChecked()"
        />
        <el-checkbox
          v-model="unAssigned"
          :label="$t('general.unAssigned')"
          border
          @change="onChecked()"
        />
      </el-col>
      <el-col :span="4" class="new-driver-button-section">
        <el-button
          v-permission="[systemRole.ADMIN, driverPrivilege.ADD]"
          type="primary"
          @click="$router.push('/drivers/new')"
        >{{ this.$t("driver.new.title") }}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          v-loading="loading"
          :data="drivers"
          border
          style="width: auto"
          size="small"
        >
          <el-table-column prop="id" :label="this.$t('driver.listings.id')" width="90px">
            <template slot-scope="scope">
              <label class="click" @click="driverDetailClick(scope.row.id)">
                {{ scope.row.id }}
              </label>
            </template>
          </el-table-column>
          <el-table-column prop="name" :label="this.$t('driver.listings.name')" />
          <el-table-column
            prop="licenseNo"
            :label="this.$t('driver.listings.licenseNo')"
          />
          <el-table-column
            prop="licenseRenewal"
            :label="this.$t('driver.listings.licensevalidTill')"
          />
          <el-table-column prop="phoneNo" :label="this.$t('driver.listings.phoneNo')" />
          <el-table-column prop="rfid" :label="this.$t('driver.listings.rfid')">
            <template slot-scope="scope">
              <div
                v-if="scope.row.rfid !== null"
                class="click"
                @click="rfidHistoryClick(scope.row.rfid)"
              >
                {{ scope.row.rfid }}
              </div>
              <div v-else>
                {{ $t("rfid.listings.notAssigned") }}
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="this.$t('general.action')" width="400px">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="6">
                  <el-dropdown>
                    <el-button type="info" class="device-summary-btn" size="mini">
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
                            @change="driveClick(drivetimeRange, scope.row.rfid)"
                          />
                        </div>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
                <el-col :span="8">
                  <el-button
                    v-if="scope.row.rfid !== null"
                    type="danger"
                    plain
                    size="mini"
                    @click="removeRFIDClicked(scope.row.id, scope.row.rfid)"
                  >
                    {{ $t("driver.listings.unMapRFID") }}
                  </el-button>
                  <el-button
                    v-if="scope.row.rfid === null"
                    type="primary"
                    plain
                    size="mini"
                    @click.native.prevent="
                      $router.push(`/drivers/${scope.row.id}/assign-rfid`)
                    "
                  >
                    {{ $t("driver.listings.mapRFID") }}
                  </el-button>
                </el-col>
                <el-col :span="4">
                  <el-button
                    v-permission="[systemRole.ADMIN, driverPrivilege.EDIT]"
                    type="primary"
                    size="mini"
                    @click.native.prevent="$router.push(`/drivers/${scope.row.id}/edit`)"
                  >
                    {{ $t("general.edit") }}
                  </el-button>
                </el-col>
                <el-col :span="4">
                  <el-button
                    v-permission="[systemRole.ADMIN, driverPrivilege.DELETE]"
                    type="danger"
                    size="mini"
                    @click="onDeletedriverClicked(scope.row.id)"
                  >
                    {{ $t("general.delete") }}
                  </el-button>
                </el-col>
              </el-row>
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
    </el-row>
  </div>
</template>

<script>
import { fetchDrivers, deleteDriver, removeRFID } from '@/api/driver'
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission'
import checkPermission from '@/utils/permission'
import { SYSTEM_ROLE, DRIVER_PRIVILAGE } from '@/enums'

export default {
  name: 'DriverListings',
  directives: { permission },
  components: {
    Pagination
  },
  props: {
    id: {
      type: Number,
      default() {
        return 0
      }
    }
  },

  data() {
    return {
      drivers: null,
      total: 0,
      unAssigned: true,
      assigned: true,
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
      drivetimeRange: ''
    }
  },

  computed: {
    systemRole() {
      return SYSTEM_ROLE
    },
    hasAdminPermission() {
      return checkPermission([SYSTEM_ROLE.ADMIN])
    },
    driverPrivilege() {
      return DRIVER_PRIVILAGE
    }
  },
  async created() {
    this.listQuery = {
      page: +(this.$route.query.page || this.listQuery.page),
      limit: +(this.$route.query.limit || this.listQuery.limit),
      unAssigned: this.unAssigned,
      assigned: this.assigned
    }
    this.$router.push({
      query: this.listQuery
    })
    await this.fetchListings()
  },
  methods: {
    mapdriversToDataTable(driver) {
      return {
        id: driver.id,
        name: driver.name,
        dob: driver.dob,
        address: driver.address,
        licenseNo: driver.license_no,
        licenseRenewal: driver.license_renewal_date,
        licenseLocation: driver.license_location,
        phoneNo: driver.phone_no,
        rfid: driver.rfid
      }
    },
    async rfidHistoryClick($rfid) {
      this.$router.push(`/rfid/${$rfid}/history`)
    },
    driveClick(drivetimeRange, rfid) {
      this.$router.push(
        `/operator/${rfid}/driveSummary?start=${drivetimeRange[0]}&end=${drivetimeRange[1]}`
      )
    },
    async fetchListings() {
      console.log(this.listQuery)
      console.log(this.assigned)

      let response = null
      this.loading = true
      try {
        response = await fetchDrivers(this.listQuery)
        const { data, total } = response
        this.drivers = data.map(this.mapdriversToDataTable)
        this.total = total
        this.loading = false
        this.$router.push({
          query: this.listQuery
        })
      } catch (exception) {
        this.loading = false
      }
    },
    driverDetailClick(id) {
      this.$router.push(`/drivers/${id}/detail`)
    },
    onDeletedriverClicked(id) {
      let deleteConfirmMessage = this.$t('message.confirmDelete')
      deleteConfirmMessage = String.format(
        deleteConfirmMessage,
        `${this.$t('driver.listings.driverId')}: ${id}`
      )

      this.$confirm(deleteConfirmMessage, this.$t('general.warning'), {
        confirmButtonText: this.$t('general.confirm'),
        cancelButtonText: this.$t('general.cancel'),
        type: 'warning'
      }).then(() => {
        this.deleteConfirmed(id)
      })
    },
    deleteConfirmed(id) {
      deleteDriver(id)
        .then(() => {
          this.$message({
            message: this.$t('message.driverHasBeenDeleted'),
            type: 'success'
          })
          this.fetchListings()
        })
        .catch(() => {
          this.$message({
            message: this.$t('message.somethingWentWrong'),
            type: 'danger'
          })
        })
    },
    async onPaged() {
      await this.fetchListings()
    },
    async onChecked() {
      this.listQuery = {
        page: +(this.$route.query.page || this.listQuery.page),
        limit: +(this.$route.query.limit || this.listQuery.limit),
        unAssigned: this.unAssigned,
        assigned: this.assigned
      }
      this.$router.push({
        query: this.listQuery
      })
      await this.fetchListings()
    },
    removeRFIDClicked($id, $rfid) {
      let deleteConfirmMessage = this.$t('message.confirmRemove')
      deleteConfirmMessage = String.format(
        deleteConfirmMessage,
        `${this.$t('driver.listings.id')}: ${$id}`
      )

      this.$confirm(deleteConfirmMessage, this.$t('general.warning'), {
        confirmButtonText: this.$t('general.confirm'),
        cancelButtonText: this.$t('general.cancel'),
        type: 'warning'
      }).then(() => {
        this.removeRFIDConfirmed($id, $rfid)
      })
    },
    removeRFIDConfirmed($id, $rfid) {
      this.loading = true
      removeRFID($id, $rfid)
        .then(() => {
          this.$message({
            message: this.$t('message.rfidIsRemoved'),
            type: 'success'
          })
          this.fetchListings()
          this.loading = false
        })
        .catch(() => {
          this.loading = false
          this.$message({
            message: this.$t('message.somethingWentWrong'),
            type: 'danger'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
$--color-primary: #005d74;

.device-summary-btn {
  margin-right: 5px;
}
.filter-section {
  margin-bottom: 15px;
}

.new-driver-button-section {
  text-align: right;
}

.click {
  color: $--color-primary;
  cursor: pointer;
}
</style>
