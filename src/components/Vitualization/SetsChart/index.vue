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
  name: 'SetsChart',
  props: {
    className: {
      type: String,
      default() {
        return 'chart'
      }
    },
    id: {
      type: Number,
      default() {
        return 0
      }
    },
    keyPairValue: {
      type: Array,
      default() {
        return []
      }
    },
    lineKeyPairValue: {
      type: Array,
      default() {
        return []
      }
    },
    yAxisOptions: {
      type: Object,
      default() {
        return {}
      }
    },
    xAxisOptions: {
      type: Object,
      default() {
        return {}
      }
    },
    lineOptions: {
      type: Object,
      default() {
        return {}
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
      return `SetsChart${this.id}`
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
      if (!this.keyPairValue || this.keyPairValue.length === 0) {
        return
      }
      this.chart = echarts.init(document.getElementById(this.elementId))
      let legends = this.keyPairValue[0].value.map(x => x.key)
      legends.push(this.lineOptions.label)
      let categories = this.keyPairValue.map(x => x.key)

      let series = []
      let barMaxValue = 0
      this.keyPairValue[0].value.forEach(x => {
        series.push({
          name: x.key,
          type: 'bar',
          data: this.keyPairValue.map(parentGroup => {
            const val = parentGroup.value
                        .filter(subGroup => subGroup.key === x.key)[0].value
            if (val > barMaxValue) {
              barMaxValue = val
            }
            return val
          })
        })
      })
      const barYAxisChartValueOptions = this.getChartMaxValueAndInterval(barMaxValue)
      const lineValues = this.lineKeyPairValue.map(x => x.value)
      const lineMaxValue = Math.max.apply(Math, lineValues)
      const yAxisChartValueOptions = this.getChartMaxValueAndInterval(lineMaxValue)
      series.push({
        name: this.lineOptions.label,
        type: 'line',
        yAxisIndex: 1,
        data: lineValues
      })
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: legends
        },
        xAxis: [
          {
            type: 'category',
            data: categories,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: this.yAxisOptions.label,
            min: 0,
            max: barYAxisChartValueOptions.max,
            interval: barYAxisChartValueOptions.interval,
            axisLabel: {
              formatter: `${this.yAxisOptions.prefix} {value} ${this.yAxisOptions.suffix}`.trim()
            }
          },
          {
            type: 'value',
            name: this.lineOptions.label,
            min: 0,
            max: yAxisChartValueOptions.max,
            interval: yAxisChartValueOptions.interval,
            axisLabel: {
              formatter: `${this.lineOptions.prefix} {value} ${this.lineOptions.suffix}`.trim()
            }
          }
        ],
        series: series
      })
    },
    getChartMaxValueAndInterval(maxValue) {
      const lineMaxValuePlus15Percentage = maxValue * 1.15
      const yAxisMaxValue = Math.round(lineMaxValuePlus15Percentage / 10) * 10
      return {
        max: yAxisMaxValue,
        interval: Math.round(yAxisMaxValue / 5)
      }
    }
  }
}
</script>
