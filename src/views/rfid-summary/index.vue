<template>
  <div class="app-container">
    <el-row class="filter-section">
      <el-col :span="24" class="new-rfid-button-section">
        <el-button type="primary" @click="$router.push('/rfid/new')">{{
          this.$t("rfid.new.title")
        }}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          v-loading="loading"
          :data="rfidDatas"
          stripe
          border
          style="width: auto"
          size="small"
        >
          <el-table-column prop="id" :label="this.$t('rfid.listings.id')" width="35px" />
          <el-table-column prop="rfid" :label="this.$t('rfid.listings.rfid')">
            <template slot-scope="scope">
              <div class="click" @click="rfidHistoryClick(scope.row.rfid)">
                {{ scope.row.rfid }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createdBy" :label="this.$t('rfid.listings.createdBy')" />
          <el-table-column
            prop="currentOperatorId"
            :label="this.$t('rfid.listings.assignStatus')"
          >
            <template slot-scope="scope">
              <div
                v-if="scope.row.currentOperatorId !== 0"
                class="click"
                @click="driverDetailClick(scope.row.currentOperatorId)"
              >
                {{ $t("rfid.listings.assigned") }}
              </div>
              <div v-else>
                {{ $t("rfid.listings.notAssigned") }}
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="this.$t('general.action')" width="400px">
            <template slot-scope="scope">
              <el-dropdown>
                <el-button type="info" class="device-summary-btn" size="mini">
                  {{ $t("device.drive") }}<i class="el-icon-arrow-down el-icon--right" />
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
              <el-button
                type="primary"
                plain
                size="small"
                @click.native.prevent="$router.push(`/rfid/${scope.row.id}/edit`)"
              >
                {{ $t("general.edit") }}
              </el-button>
              <el-button
                type="danger"
                plain
                size="small"
                @click="onDeleterfidClicked(scope.row.id)"
              >
                {{ $t("general.delete") }}
              </el-button>
              <el-button
                v-if="scope.row.currentOperatorId !== 0"
                type="danger"
                size="small"
                @click="removeOperatorClicked(scope.row.rfid)"
              >
                {{ $t("rfid.listings.unMapOperator") }}
              </el-button>
              <el-button
                v-if="scope.row.currentOperatorId === 0"
                type="primary"
                size="small"
                @click.native.prevent="
                  $router.push(`/rfid/${scope.row.rfid}/assign-operator`)
                "
              >
                {{ $t("rfid.listings.mapOperator") }}
              </el-button>
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
import { fetchRfid, deleteRfid } from '@/api/rfid'
import { removeOperator } from '@/api/rfid-history'

import Pagination from '@/components/Pagination'

export default {
  name: 'RfidListings',
  components: {
    Pagination
  },
  props: {
    operatorId: {
      type: Number,
      default() {
        return 0
      }
    }
  },

  data() {
    return {
      rfidDatas: null,
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
      drivetimeRange: ''
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
    await this.fetchListings()
  },
  methods: {
    mapRfidToDataTable(rfid) {
      return {
        id: rfid.id,
        rfid: rfid.rfid,
        createdBy: rfid.createdBy,
        currentOperatorId: rfid.current_operator_id
      }
    },
    async fetchListings() {
      let response = null
      this.loading = true
      try {
        response = await fetchRfid(this.listQuery)
        const { data, total } = response
        this.rfidDatas = data.map(this.mapRfidToDataTable)
        this.total = total
        this.loading = false
        this.$router.push({
          query: this.listQuery
        })
      } catch (exception) {
        this.loading = false
      }
    },
    rfidClick(rfid) {
      this.$router.push(`/operator/${rfid}/driveSummary`)
    },
    driverDetailClick(id) {
      this.$router.push(`/drivers/${id}/detail`)
    },
    driveClick(drivetimeRange, rfid) {
      this.$router.push(
        `/operator/${rfid}/driveSummary?start=${drivetimeRange[0]}&end=${drivetimeRange[1]}`
      )
    },
    onDeleterfidClicked(id) {
      let deleteConfirmMessage = this.$t('message.confirmDelete')
      deleteConfirmMessage = String.format(
        deleteConfirmMessage,
        `${this.$t('rfid.listings.rfid')}: ${id}`
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
      deleteRfid(id)
        .then(() => {
          this.$message({
            message: this.$t('message.rfidHasBeenDeleted'),
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
    async rfidHistoryClick($rfid) {
      this.$router.push(`/rfid/${$rfid}/history`)
    },
    removeOperatorClicked($rfid) {
      let deleteConfirmMessage = this.$t('message.confirmRemove')
      deleteConfirmMessage = String.format(
        deleteConfirmMessage,
        `${this.$t('rfid.listings.rfid')}: ${$rfid}`
      )

      this.$confirm(deleteConfirmMessage, this.$t('general.warning'), {
        confirmButtonText: this.$t('general.confirm'),
        cancelButtonText: this.$t('general.cancel'),
        type: 'warning'
      }).then(() => {
        this.removeOperatorConfirmed($rfid)
      })
    },
    removeOperatorConfirmed($rfid) {
      this.loading = true
      removeOperator($rfid)
        .then(() => {
          this.$message({
            message: this.$t('message.operatorIsRemoved'),
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
.filter-section {
  margin-bottom: 15px;
}

.new-rfid-button-section {
  text-align: right;
}

.click {
  color: blue;
  cursor: pointer;
}

.device-summary-btn {
  margin-right: 5px;
}
</style>
