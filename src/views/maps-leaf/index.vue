<template>
  <div class="app-container">
    <el-row v-loading="eventPanelLoading">
      <el-col :span="24">
        <event-panel
          :acceleration="events.acceleration"
          :deceleration="events.deceleration"
          :accident="events.accident"
          :handle="events.handle"
          :online="events.online"
          :total="events.total"
        />
      </el-col>
    </el-row>
    <div v-loading="mapsLoading" style="height: 575px; width: 100%">
      <l-map
        v-if="showMap"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate"
      >
        <l-tile-layer
          :url="url"
          :attribution="attribution"
        />
        <l-marker v-for="item in devices" :key="item.id" :lat-lng="[item.location.latitude, item.location.longitude]" :z-index-offset="item.online?100:0">
          <l-icon>
            <font-awesome-icon icon="truck" :class="{ 'truck-online': item.online, 'truck-offline': !item.online }" />
          </l-icon>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script>
import { fetchEventSummary } from '@/api/event'
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker, LIcon } from 'vue2-leaflet'
import EventPanel from './components/EventPanel'
import { fetchVehicles } from '@/api/vehicle'

export default {
  name: 'MapsLeaf',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    EventPanel
  },
  data() {
    return {
      devices: [],
      zoom: 5,
      center: latLng(39.8409351, 138.5981832),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      currentZoom: 5,
      currentCenter: latLng(39.8409351, 138.5981832),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      staticAnchor: [16, 37],
      showMap: true,
      events: {
        acceleration: 0,
        deceleration: 0,
        accident: 0,
        handle: 0,
        online: 0,
        total: 0
      },
      eventPanelLoading: false,
      mapsLoading: false

    }
  },
  async mounted() {
    this.fetchData()
    this.fetchSummary()
  },
  methods: {
    async fetchData() {
      this.mapsLoading = true
      const data = await fetchVehicles()
      const datafilter = data.filter(device => device.location !== null &&
        device.location.latitude !== 0 &&
        device.location.longitude !== 0)

      this.devices = datafilter

      const online = data.filter(x => x.is_online === 1).length
      const offline = data.filter(x => x.is_online !== 1).length
      this.events.online = online
      this.events.total = online + offline
      this.mapsLoading = false
    },
    async fetchSummary() {
      this.eventPanelLoading = true
      const { data } = await fetchEventSummary()

      console.log(data)
      this.events.acceleration = data.accelerate || 0
      this.events.deceleration = data.decelerate || 0
      this.events.accident = data.impact || 0
      this.events.handle = (data.turn_left || 0) + (data.turn_right || 0)
      this.eventPanelLoading = false
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom
    },
    centerUpdate(center) {
      this.currentCenter = center
    },
    showLongText() {
      this.showParagraph = !this.showParagraph
    },
    innerClick() {
      alert('Click')
    }
  }
}
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  z-index: 400;
}

body {
  margin: 0;
}

.marker {
  text-align: center;
  color: white;
  font-size: 16;
  border-radius: 8px;
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.4);
}

.red {
  background: red;
}

.truck-online {
  font-size: 18px;
  color: #24AE21;
}

.truck-offline {
  font-size: 18px;
  color: #504d4d;
}
</style>
