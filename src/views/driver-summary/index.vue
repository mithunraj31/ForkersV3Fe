<template>
  <div class="app-container">
    <el-row class="filter-section">
      <el-col :span="24" class="new-driver-button-section">
        <el-button type="primary" @click="$router.push('/drivers/new')">{{
          this.$t("driver.new.title")
        }}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          v-loading="loading"
          :data="drivers"
          stripe
          border
          style="width: auto"
          size="small"
        >
          <el-table-column prop="id" :label="this.$t('driver.listings.id')" />
          <el-table-column prop="name" :label="this.$t('driver.listings.name')">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ $t("driver.listings.name") }}: {{ scope.row.name }}</p>
                <p>{{ $t("driver.form.address") }}: {{ scope.row.address }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="dob"
            :label="this.$t('driver.listings.age')"
            width="50px"
          >
            <template slot-scope="scope">
              {{ calculateAge(scope.row.dob) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="licenseNo"
            :label="this.$t('driver.listings.licenseNo')"
          />
          <el-table-column
            prop="licenseRenewal"
            :label="this.$t('driver.listings.licensevalidTill')"
          />
          <el-table-column prop="phoneNo" :label="this.$t('driver.listings.phoneNo')" />
          <el-table-column :label="this.$t('general.action')">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click.native.prevent="$router.push(`/drivers/${scope.row.id}/edit`)"
              >
                {{ $t("general.edit") }}
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="onDeletedriverClicked(scope.row.id)"
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
import { fetchDrivers, deleteDriver } from '@/api/driver'
import moment from '@/utils/moment'
import Pagination from '@/components/Pagination'

export default {
  name: 'DriverListings',
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
    mapdriversToDataTable(driver) {
      return {
        id: driver.id,
        name: driver.name,
        dob: driver.dob,
        address: driver.address,
        licenseNo: driver.license_no,
        licenseRenewal: driver.license_renewal_date,
        licenseLocation: driver.license_location,
        phoneNo: driver.phone_no
      }
    },
    async fetchListings() {
      let response = null
      this.loading = true
      response = await fetchDrivers(this.listQuery)
      const { data, total } = response
      this.drivers = data.map(this.mapdriversToDataTable)
      this.total = total
      this.loading = false
      this.$router.push({
        query: this.listQuery
      })
    },
    driverClick(id) {
      this.$router.push(`/operator/${id}/driveSummary`)
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
    calculateAge(dob) {
      var age = moment().diff(dob, 'years')
      return age
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-section {
  margin-bottom: 15px;
}

.new-driver-button-section {
  text-align: right;
}

.click {
  color: blue;
  cursor: pointer;
}
</style>
