<template>
  <div
    :id="elementId"
    :class="className"
    :style="{ height: '400px', width: '900px' }"
  />
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'RegularBarChart',
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
        title: {
          text: '車両のメンテナンス情報'
        },
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
            name: '車両グループ',
            type: 'category',
            data: ['#1', '#2', '#3', '#4', '#5', '#6', '#7'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            name: 'メンテナンスが必要な車両の数',
            type: 'value'
          }
        ],
        series: [
          {
            name: 'メンテナンスが必要な車両の数',
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
