<template>
  <div>
    <h3>2. オペレータ毎の連続安全運転時間​</h3>
    <div
      :id="elementId"
      :class="className"
      :style="{ height: '400px', width: '900px' }"
    />
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'RegularBarChartTemp2',
  props: {
    size: {
      type: Number,
      default() {
        return 0
      }
    },
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
    }
  },
  data() {
    return {
      chart: null
    }
  },
  computed: {
    elementId() {
      return `LevelChart${this.id}`
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
            name: 'オペレータ',
            type: 'category',
            data: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            name: '最長連続安全運転時間（分）',
            type: 'value'
          }
        ],
        series: [
          {
            name: '最長連続安全運転時間（分）',
            type: 'bar',
            barWidth: '60%',
            data: [30, 10, 15, 12, 27, 20, 19]
          }
        ]
      })
    }
  }
}
</script>
