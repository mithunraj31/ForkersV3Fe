<template>
  <div>
    <h3>{{ title }}</h3>
    <stack-chart
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
import StackChart from '@/components/Vitualization/StackChart'
import { httpGet } from '@/api'

export default {
  name: 'OperatorEventSummary',
  components: { StackChart },
  props: {
    title: {
      type: String,
      default() {
        return this.$t('chart.operatorEventSummary.title')
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
        label: '稼働時間',
        prefix: '',
        suffix: ''
      },
      yAxisOptions: {
        label: 'イベント数​',
        prefix: '',
        suffix: '時間'
      },
      xAxisOptions: {
        label: '',
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
      this.keyPairValue = data.map(x => {
        return {
          key: x.operator.name,
          value: [
            {
              key: 'handleLeft',
              value: x.event_summary['handle_left']
            },
            {
              key: 'handleRight',
              value: x.event_summary['handle_right']
            },
            {
              key: 'acceleration​',
              value: x.event_summary['acceleration​']
            },
            {
              key: 'deacceleration',
              value: x.event_summary['deacceleration​']
            },
            {
              key: 'accident',
              value: x.event_summary['accident']
            }
          ]
        }
      })

      this.lineKeyPairValue = data.map(m => {
        return {
          key: m.operator.name,
          value: m.running_time
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
