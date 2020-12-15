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
          <el-table-column prop="rfid" :label="this.$t('rfid.listings.rfid')" />
          <el-table-column prop="createdBy" :label="this.$t('rfid.listings.createdBy')" />
          <el-table-column
            prop="assignStatus"
            :label="this.$t('rfid.listings.assignStatus')"
          />
          <el-table-column :label="this.$t('general.action')">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click.native.prevent="$router.push(`/rfid/${scope.row.id}/edit`)"
              >
                {{ $t("general.edit") }}
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="onDeleterfidClicked(scope.row.id)"
              >
                {{ $t("general.delete") }}
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
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js'

export default {
  name: 'RfidListings',
  components: {
    Pagination
  },
  directives: {
    permission
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
      loading: false
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
        assignStatus: rfid.assign_status
      }
    },
    async fetchListings() {
      let response = null
      this.loading = true
      response = await fetchRfid(this.listQuery)
      const { data, total } = response
      this.rfidDatas = data.map(this.mapRfidToDataTable)
      this.total = total
      this.loading = false
      this.$router.push({
        query: this.listQuery
      })
    },
    rfidClick(rfid) {
      this.$router.push(`/operator/${rfid}/driveSummary`)
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
</style>
