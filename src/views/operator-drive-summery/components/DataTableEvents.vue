<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      default-expand-all
      stripe
    >
      <el-table-column prop="date" label="Date" />
      <el-table-column label="Type">
        <template slot-scope="scope">
          <i :class="scope.row.icon" />
          <span style="margin-left: 10px">{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operator" label="Operator" />
    </el-table>
    <pagination
      :total="total"
      :page.sync="page"
      :limit.sync="limit"
      :auto-scroll="false"
      @pagination="onPage"
    />
  </div>
</template>

<script>
import moment from '@/utils/moment'
import Pagination from '@/components/Pagination'

export default {
  name: 'DataTableEvents',
  components: {
    Pagination
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      tableData: [],
      total: 0,
      page: 1,
      limit: 10
    }
  },
  computed: {
    currentLocale() {
      return this.$store.state.app.language || 'en'
    }
  },
  watch: {
    data: function(newVal, OldVal) {
      this.processData()
    }
  },
  async mounted() {
    this.processData()
  },
  methods: {
    processData() {
      this.total = this.data.length
      var timeFormat = 'dddd, MMMM Do YYYY, H:mm:ss'
      moment.locale(this.currentLocale)
      if (this.data && this.data.length > 0) {
        for (
          var i = (this.page - 1) * this.limit;
          i < this.data.length && i < this.page * this.limit;
          i++
        ) {
          const driveSummery = this.data[i]
          var row = {
            id: null,
            type: '',
            operator: '',
            date: '',
            icon: ''
          }

          row.id = driveSummery.event_id
          row.date = moment(driveSummery.time).format(timeFormat)
          row.operator = driveSummery.driver_id
          var eventType = 'Unknown'
          var icon = ''
          switch (driveSummery.type) {
            case 16:
              eventType = 'Acceleration'
              icon = 'fas fa-shipping-fast'
              break
            case 17:
              eventType = 'Deceleration'
              icon = 'fas fa-parking'
              break
            case 14:
              eventType = 'Button'
              icon = 'fas fa-hand-point-down'
              break
            case 20:
              eventType = 'Impact'
              icon = 'fas fa-car'
              break
            case 21:
              eventType = 'Turn Left'
              icon = 'fas fa-arrow-left'
              break
            case 22:
              eventType = 'Turn Right'
              icon = 'fas fa-arrow-right'
              break
            case 23:
              eventType = 'Clip'
              icon = 'fas fa-video'
              break
            default:
            // code block
          }
          row.type = eventType
          row.icon = icon
          this.tableData.push(row)
        }
      }
    },
    onPage({ page, limit }) {
      this.page = page
      this.limit = limit
      this.tableData = []
      this.processData()
    }
  }
}
</script>
<style>
</style>
