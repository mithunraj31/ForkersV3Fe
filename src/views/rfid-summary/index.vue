<template>
  <div class="app-container">
    <el-row class="filter-section">
      <el-col :span="10">
        <span
          v-if="!hasAdminPermission"
        >{{ $t("rfid.listings.total") }}: {{ total }}</span>
        <company-selector v-if="hasAdminPermission" @change="onCustomerChanged" />
      </el-col>
      <el-col :span="10" class="new-rfid-button-section">
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
      <el-col :span="4" class="new-rfid-button-section">
        <el-button
          v-permission="[systemRole.ADMIN, rfidPrivilege.ADD]"
          type="primary"
          @click="$router.push('/rfid/new')"
        >{{ this.$t("rfid.new.title") }}</el-button>
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
          <el-table-column prop="id" :label="this.$t('rfid.listings.id')">
            <template slot-scope="scope">
              <div class="click" @click="rfidHistoryClick(scope.row.id)">
                {{ scope.row.id }}
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="customerName" :label="this.$t('rfid.form.customer')" />
          <el-table-column prop="operator" :label="this.$t('driver.listings.driverId')">
            <template slot-scope="scope">
              <div
                v-if="scope.row.operatorId !== null"
                class="click"
                @click="driverDetailClick(scope.row.operatorId)"
              >
                {{ scope.row.operatorName }}
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
                            @change="driveClick(drivetimeRange, scope.row.id)"
                          />
                        </div>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
                <el-col :span="10">
                  <el-button
                    v-if="scope.row.operatorId !== null"
                    type="danger"
                    plain
                    size="mini"
                    @click="removeOperatorClicked(scope.row.id, scope.row.operatorId)"
                  >
                    {{ $t("rfid.listings.unMapOperator") }}
                  </el-button>
                  <el-button
                    v-if="scope.row.operatorId === null"
                    type="primary"
                    plain
                    size="mini"
                    @click.native.prevent="
                      $router.push(`/rfid/${scope.row.id}/assign-operator`)
                    "
                  >
                    {{ $t("rfid.listings.mapOperator") }}
                  </el-button>
                </el-col>
                <el-col :span="4">
                  <el-button
                    v-permission="[systemRole.ADMIN, rfidPrivilege.EDIT]"
                    type="primary"
                    size="mini"
                    @click.native.prevent="$router.push(`/rfid/${scope.row.id}/edit`)"
                  >
                    {{ $t("general.edit") }}
                  </el-button>
                </el-col>
                <el-col :span="4">
                  <el-button
                    v-permission="[systemRole.ADMIN, rfidPrivilege.DELETE]"
                    type="danger"
                    size="mini"
                    @click="onDeleterfidClicked(scope.row.id)"
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
import { fetchRfid, deleteRfid, removeOperator } from '@/api/rfid'
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission'
import checkPermission from '@/utils/permission'
import { SYSTEM_ROLE, RFID_PRIVILAGE } from '@/enums'
import CompanySelector from '@/components/CompanySelector'

export default {
  name: 'RfidListings',
  components: {
    Pagination,
    CompanySelector
  },
  directives: { permission },
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
      drivetimeRange: '',
      customerId: ''
    }
  },

  computed: {
    systemRole() {
      return SYSTEM_ROLE
    },
    hasAdminPermission() {
      return checkPermission([SYSTEM_ROLE.ADMIN])
    },
    rfidPrivilege() {
      return RFID_PRIVILAGE
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
    mapRfidToDataTable(rfid) {
      return {
        id: rfid.id,
        customerName: rfid.customer.name,
        customerId: rfid.customer.id,
        operatorName: rfid.operator_name,
        operatorId: rfid.operator_id
      }
    },
    async fetchListings() {
      let response = null
      this.loading = true
      try {
        response = await fetchRfid(this.listQuery, this.customerId)
        const { data, total } = response
        this.rfidDatas = data.map(this.mapRfidToDataTable)
        this.total = total
        this.loading = false
        this.$router.push({
          query: this.listQuery
        })
      } catch (exception) {
        console.log(exception)
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
    async rfidHistoryClick($rfid) {
      this.$router.push(`/rfid/${$rfid}/history`)
    },
    removeOperatorClicked($rfid, $operatorId) {
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
        this.removeOperatorConfirmed($rfid, $operatorId)
      })
    },
    removeOperatorConfirmed($rfid, $operatorId) {
      this.loading = true
      removeOperator($rfid, $operatorId)
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
    },
    async onCustomerChanged(customerId) {
      this.customerId = customerId
      await this.fetchListings()
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
