<template>
  <div>
    <h3>{{ title }}</h3>
    <sets-chart
      :id="id"
      :key-pair-value="keyPairValue"
      :line-key-pair-value="lineKeyPairValue"
      :line-options="lineOptions"
      :y-axis-options="yAxisOptions"
      :x-axis-options="xAxisOptions"
    />
  </div>
</template>

<script>
import { httpGet } from '@/api'
import { SetsChart } from '@/components/Vitualization'

export default {
  name: 'VehicleGroupEventWithRunningHours',
  components: { SetsChart },
  props: {
    title: {
      type: String,
      default() {
        return this.$t('chart.vehicleGroupEventWithRunningHours.title')
      }
    },
    api: {
      type: String,
      default() {
        return ''
      }
    },
    id: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      keyPairValue: [],
      lineKeyPairValue: [],
      lineOptions: {
        label: this.$t('chart.vehicleGroupEventWithRunningHours.yAxisLabel'),
        prefix: '',
        suffix: ''
      },
      yAxisOptions: {
        label: '稼働時間​',
        prefix: '',
        suffix: '時間'
      },
      xAxisOptions: {
        label: this.$t('chart.vehicleGroupEventWithRunningHours.xAxisLabel'),
        prefix: '',
        suffix: ''
      }
    }
  },
  watch: {
    async api() {
      await this.fetchData()
    }
  },
  async created() {
    if (this.api) {
      await this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      const { data } = await httpGet(this.api)

      this.keyPairValue = data.map(m => {
        return {
          key: m.summary_date,
          value: m.groups.map(x => {
            return {
              key: x.vehicle_group.name,
              value: +x.running_time
            }
          })
        }
      })
      this.lineKeyPairValue = data.map(m => {
        return {
          key: m.summary_date,
          value: m.groups.map(x => x.alarm_count).reduce((a, b) => a + b, 0)
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
