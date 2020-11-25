<template>
  <div class="app-container">
    <div v-loading="mapsLoading" style="height: 500px; width: 100%">
      <l-map v-if="showMap" :zoom="zoom" :center="center" :options="mapOptions" @update:center="centerUpdate" @update:zoom="zoomUpdate">
        <l-tile-layer :url="url" :attribution="attribution" />
        <l-marker v-for="item in devices" :key="item.id" :lat-lng="[item.location.lat, item.location.lng]">
          <l-icon>
            <font-awesome-icon
              icon="truck"
              :class="{
                'truck-online': item.online,
                'truck-offline': !item.online,
              }"
            />
          </l-icon>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script>
import { fetchDevices } from '@/api/device'
import { fetchEventSummary } from '@/api/event'
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker, LIcon } from 'vue2-leaflet'

export default {
  name: 'DeviceMap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon
  },
  data() {
    return {
      devices: [],
      zoom: 5,
      center: latLng(39.8409351, 138.5981832),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      currentZoom: 5,
      currentCenter: latLng(39.8409351, 138.5981832),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      staticAnchor: [16, 37],
      showMap: true,
      mapsLoading: false
    }
  },
  async mounted() {
    // await this.fetchData()
    // await this.fetchSummary()
  },
  methods: {
    async fetchData() {
      this.mapsLoading = true
      const { data } = await fetchDevices()
      this.devices = data
      this.events.online = data.filter((x) => x.online).length
      this.mapsLoading = false
    },
    async fetchSummary() {
      this.eventPanelLoading = true
      const { data } = await fetchEventSummary()
      console.log(data)
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
  font-size: 24px;
  color: #24ae21;
}

.truck-offline {
  font-size: 24px;
  color: #c0c0c0;
}
</style>
