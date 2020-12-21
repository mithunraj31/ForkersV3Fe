<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <h3>{{ this.$t("rfid.new.operatorHistory") }}</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          v-loading="loading"
          :data="rfidHistoryDatas"
          stripe
          border
          style="width: auto"
        >
          <el-table-column prop="rfid" :label="this.$t('rfid.listings.rfid')" />
          <el-table-column prop="operatorId" :label="this.$t('driver.listings.driverId')">
            <template slot-scope="scope">
              <label class="click" @click="driverDetailClick(scope.row.operatorId)">
                {{ scope.row.operatorId }}
              </label>
            </template>
          </el-table-column>
          <el-table-column
            prop="assignedFrom"
            :label="this.$t('rfid.listings.assignedFrom')"
          />
          <el-table-column
            prop="assignedTill"
            :label="this.$t('rfid.listings.assignedTill')"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.assignedTill === null">
                <Span>~</Span>
              </div>
              {{ scope.row.assignedTill }}
            </template>
          </el-table-column>
          <el-table-column :label="this.$t('general.action')">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.assignedTill === null"
                type="info"
                size="small"
                @click.native.prevent="
                  $router.push(
                    `/operator/${scope.row.rfid}/driveSummary?start=${scope.row.assignedFrom}&end=${today}`
                  )
                "
              >
                {{ $t("device.drive") }}
              </el-button>
              <el-button
                v-if="scope.row.assignedTill !== null"
                type="info"
                size="small"
                @click.native.prevent="
                  $router.push(
                    `/operator/${scope.row.rfid}/driveSummary?start=${scope.row.assignedFrom}&end=${scope.row.assignedTill}`
                  )
                "
              >
                {{ $t("device.drive") }}
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
import { findrfIdHistory } from '@/api/rfid-history'

import Pagination from '@/components/Pagination'

export default {
  name: 'RfidHistory',
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
      rfidHistoryDatas: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      loading: false,
      today: Date.now()
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
    mapRfidHistoryToDataTable(rfid) {
      return {
        id: rfid.id,
        rfid: rfid.rfid,
        operatorId: rfid.operator_id,
        assignedFrom: rfid.assigned_from,
        assignedTill: rfid.assigned_till
      }
    },
    async fetchListings() {
      let response = null
      this.loading = true
      response = await findrfIdHistory(+this.$route.params.rfid, this.listQuery)
      const { data, total } = response
      this.rfidHistoryDatas = data.map(this.mapRfidHistoryToDataTable)
      this.total = total
      this.loading = false
      this.$router.push({
        query: this.listQuery
      })
    },
    async onPaged() {
      await this.fetchListings()
    },
    driverDetailClick(id) {
      this.$router.push(`/drivers/${id}/detail`)
    }
  }
}
</script>

<style lang="scss" scoped>
.click {
  color: blue;
  cursor: pointer;
}
</style>
