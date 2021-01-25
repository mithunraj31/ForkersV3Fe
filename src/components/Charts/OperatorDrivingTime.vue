<template>
  <div>
    <h3>{{ title }}</h3>
    <regular-bar-chart
      :id="id"
      :key-pair-value="keyPairValue"
      :x-axis-label="xAxisLabel"
      :y-axis-label="yAxisLabel"
    />
  </div>
</template>

<script>
import { httpGet } from '@/api'
import { RegularBarChart } from '@/components/Vitualization'

export default {
  name: 'OperatorDrivingTime',
  components: { RegularBarChart },
  props: {
    title: {
      type: String,
      default() {
        return this.$t('chart.operatorDrivingTime.title')
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
      yAxisLabel: this.$t('chart.operatorDrivingTime.yAxisLabel'),
      xAxisLabel: this.$t('chart.operatorDrivingTime.xAxisLabel')
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
          key: m.operator.name,
          value: +m.driving_time
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
