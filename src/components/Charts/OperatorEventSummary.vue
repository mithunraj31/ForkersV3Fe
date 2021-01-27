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
      if (!data && data.length === 0) {
        return
      }
      const strJson = JSON.stringify(data)
      const jsonData = JSON.parse(strJson)

      this.keyPairValue = jsonData.map(x => {
        const eventSummery = x.event_summery
        return {
          key: x.operator.name,
          value: [
            {
              key: 'handleLeft',
              value: eventSummery.handle_left
            },
            {
              key: 'handleRight',
              value: eventSummery.handle_right
            },
            {
              key: 'acceleration​',
              value: eventSummery.acceleration
            },
            {
              key: 'deacceleration',
              value: eventSummery.deacceleration
            },
            {
              key: 'accident',
              value: eventSummery.accident
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
