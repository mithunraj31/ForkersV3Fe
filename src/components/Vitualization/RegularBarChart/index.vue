<template>
  <div
      :id="elementId"
      :class="className"
      :style="{ height: '400px' }"
  />
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'RegularBarChart',
  props: {
    id: {
      type: Number,
      default() {
        return 0
      }
    },
    className: {
      type: String,
      default() {
        return ''
      }
    },
    yAxisLabel: {
      type: String,
      default() {
        return ''
      }
    },
    xAxisLabel: {
      type: String,
      default() {
        return ''
      }
    },
    keyPairValue: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  computed: {
    elementId() {
      return `RegularChart${this.id}`
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    keyPairValue() {
      this.initChart()
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.elementId))
      this.chart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            name: this.xAxisLabel,
            type: 'category',
            data: this.keyPairValue.map(x => x.key),
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            name: this.yAxisLabel,
            type: 'value'
          }
        ],
        series: [
          {
            name: this.yAxisLabel,
            type: 'bar',
            barWidth: '60%',
            data: this.keyPairValue.map(x => x.value)
          }
        ]
      })
    }
  }
}
</script>
