<template>
  <div v-loading="loading">
    <l-map :zoom="zoom" :center="center" style="height: 600px; width: 100%">
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker v-if="driveRoute.length > 0" :lat-lng="iconLocation">
        <l-icon>
          <font-awesome-icon icon="truck" class="truck-online" />
        </l-icon>
      </l-marker>
      <l-polyline
        :lat-lngs="polyline.latlngs"
        :color="polyline.color"
      >
        <l-popup content="polyline" />
      </l-polyline>
    </l-map>
    <el-row>
      <el-col :span="20" :offset="2">
        <div class="block">
          <el-slider
            v-model="value"
            :marks="marks"
            :min="min"
            :max="max"
            :format-tooltip="formatTooltip"
            @input="remakePolyline"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LPolyline,
  LPopup,
  LMarker,
  LIcon
} from 'vue2-leaflet'
import { fetchDriveRoute } from '@/api/vehicle'
import moment from '@/utils/moment'

export default {
  name: 'MapRoute',
  components: {
    LMap,
    LTileLayer,
    LPolyline,
    LPopup,
    LMarker,
    LIcon
  },
  props: {
    deviceId: { type: String, default: '' },
    start: { type: String, default: '' },
    end: { type: String, default: '' }
  },
  data() {
    return {
      loading: false,
      driveRoute: [],
      value: 100,
      min: 0,
      max: 100,
      step: 1,
      marks: {
        0: 'not available'
      },
      zoom: 11,
      iconLocation: [],
      center: [35.6762, 139.6503],
      polyline: {
        type: 'polyline',
        latlngs: [],
        color: 'green'
      },
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  computed: {
    currentLocale() {
      return this.$store.state.app.language || 'en'
    }
  },
  async mounted() {
    if (this.deviceId && this.start && this.end) {
      await this.fetchData()
      moment.locale(this.currentLocale)
    }
  },
  methods: {
    async fetchData() {
      this.loading = true
      const data = await fetchDriveRoute(this.deviceId, this.start, this.end)
      this.driveRoute = data.data
      this.makePolyline()
      this.loading = false
    },
    makePolyline() {
      if (this.driveRoute.length > 0) {
        const temp = []
        this.driveRoute.forEach((location) => {
          const l = [location.lat, location.lng]
          temp.push(l)
        })
        this.polyline.latlngs = temp
        this.center = [this.driveRoute[0].lat, this.driveRoute[0].lng]
        this.min = new Date(this.driveRoute[0].datetime).getTime() / 1000
        this.max =
          new Date(
            this.driveRoute[this.driveRoute.length - 1].datetime
          ).getTime() / 1000
        this.marks = {}
        var timeFormat = 'dddd, MMMM Do YYYY, H:mm:ss'
        this.marks[this.min] = moment(this.driveRoute[0].datetime).format(
          timeFormat
        )
        this.marks[this.max] = moment(
          this.driveRoute[this.driveRoute.length - 1].datetime
        ).format(timeFormat)
        this.iconLocation = [
          this.driveRoute[this.driveRoute.length - 1].lat,
          this.driveRoute[this.driveRoute.length - 1].lng
        ]
        this.value = this.max
        this.step = (this.max - this.min) / 100
      }
    },
    formatTooltip(value) {
      var timeFormat = 'dddd, MMMM Do YYYY, H:mm:ss'
      var date = moment(value * 1000).format(timeFormat)
      return date
    },
    remakePolyline(endtime) {
      if (this.driveRoute.length > 0) {
        const temp = []
        let maxIndex = 0
        var i
        for (i = 0; i < this.driveRoute.length; i++) {
          const location = this.driveRoute[i]
          var curDate = new Date(this.driveRoute[i].datetime).getTime() / 1000
          if (curDate > endtime) {
            break
          }
          const l = [location.lat, location.lng]
          temp.push(l)
          maxIndex = i
        }
        this.polyline.latlngs = temp
        this.iconLocation = [
          this.driveRoute[maxIndex].lat,
          this.driveRoute[maxIndex].lng
        ]
      }
    }
  }
}
</script>
<style>
.truck-online {
  font-size: 24px;
  color: #0d47e4;
}
</style>
