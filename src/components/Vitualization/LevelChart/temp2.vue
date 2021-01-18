<template>
  <div>
    <h3>B2) 車両毎のアラーム数・種別と稼働時間​​</h3>
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
  name: 'LevelChartTemp2',
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
          name: 'オペレータ毎のアラーム数・種別と稼働時間​'
        },
        toolbox: {
          feature: {
            saveAsImage: { show: true }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: [
            'Acceleration​',
            'Deacceleration​',
            'Accident​',
            'Quick handle(Left)​',
            'Quick handle(Right)​'
          ]
        },
        grid: {
          left: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            // name: 'オペレータ',
            type: 'category',
            data: ['#1', '#2', '#3', '#4', '#5', '#6', '#7']
          }
        ],
        yAxis: [
          {
            name: 'イベント数',
            type: 'value'
          },
          {
            type: 'value',
            name: '稼働時間​',
            min: 0,
            max: 6,
            interval: 1,
            axisLabel: {
              formatter: '{value} 時間'
            }
          }
        ],
        series: [
          {
            name: 'Quick handle(Left)​',
            type: 'bar',
            stack: 'Stck1',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Quick handle(Right)​',
            type: 'bar',
            stack: 'Stck1',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Acceleration​',
            type: 'bar',
            stack: 'Stck1',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Deacceleration​',
            type: 'bar',
            stack: 'Stck1',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Accident​',
            type: 'bar',
            stack: 'Stck1',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '稼働時間​',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 3.3, 2.8, 2.5, 3.0, 5.0, 6.0]
          }
        ]
      })
    }
  }
}
</script>
