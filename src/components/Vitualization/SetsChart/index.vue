<template>
  <div>
    <h3>C3)期間毎の車両グループ毎のアラーム数と全車両グループの総稼働時間​</h3>
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
  name: 'SetsChart',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: Number,
      default: 0
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            // dataView: {show: true, readOnly: false},
            // saveAsImage: {show: true}
          }
        },
        legend: {
          data: ['グループ1', 'グループ2', 'グループ3', '稼働時間​']
        },
        xAxis: [
          {
            // name: '期間',
            type: 'category',
            data: [
              '1月/10',
              '1月/11',
              '1月/12',
              '1月/13',
              '1月/14',
              '1月/15',
              '1月/16',
              '1月/17',
              '1月/18',
              '1月/19',
              '1月/20',
              '1月/21'
            ],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'すべてのフォークリフトグループのアラームの総数',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '稼働時間​',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} 時間'
            }
          }
        ],
        series: [
          {
            name: 'グループ1',
            type: 'bar',
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ]
          },
          {
            name: 'グループ2',
            type: 'bar',
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ]
          },
          {
            name: 'グループ3',
            type: 'bar',
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ]
          },
          {
            name: '稼働時間​',
            type: 'line',
            yAxisIndex: 1,
            data: [
              2.0,
              2.2,
              3.3,
              4.5,
              6.3,
              10.2,
              20.3,
              23.4,
              23.0,
              16.5,
              12.0,
              6.2
            ]
          }
        ]
      })
    }
  }
}
</script>
