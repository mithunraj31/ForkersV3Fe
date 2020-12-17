<template>
  <div class="app-container">
    <el-table v-loading="detailLoading" :data="driver" border stripe style="width: 100%">
      <el-table-column :label="this.$t('event.title')" prop="key" width="200">
        <template slot-scope="scope">
          <label>
            {{ $t(`driver.form.${scope.row.key}`) }}
          </label>
        </template>
      </el-table-column>
      <el-table-column :label="this.$t('event.value')" prop="value" />
    </el-table>
    <div v-if="driver" class="app-container">
      <el-button
        type="primary"
        size="small"
        @click.native.prevent="$router.push(`/drivers/${id}/edit`)"
      >
        {{ $t("general.edit") }}
      </el-button>
      <el-button @click="$router.go(-1)">{{ this.$t("general.back") }}</el-button>
    </div>
  </div>
</template>

<script>
import { fetchDriverById } from '@/api/driver'
export default {
  name: 'DriverDetail',
  data() {
    return {
      id: this.$route.params.id,
      driver: null,
      detailLoading: false,
      mapEventsToDataTable(data) {
        return [
          {
            key: 'name',
            value: data.name
          },
          {
            key: 'dob',
            value: data.dob
          },
          {
            key: 'address',
            value: data.address
          },
          {
            key: 'licenseNo',
            value: data.license_no
          },
          {
            key: 'licenseReceived',
            value: data.license_received_date
          },
          {
            key: 'licenseRenewal',
            value: data.license_renewal_date
          },
          {
            key: 'licenseLocation',
            value: data.license_location
          },
          {
            key: 'phoneNo',
            value: data.phone_no
          }
        ]
      }
    }
  },
  async mounted() {
    await this.getDriverDetail()
  },
  methods: {
    async getDriverDetail() {
      this.detailLoading = true
      const { data } = await fetchDriverById(this.$route.params.id)
      this.driver = this.mapEventsToDataTable(data)
      this.detailLoading = false
    }
  }
}
</script>

<style></style>
