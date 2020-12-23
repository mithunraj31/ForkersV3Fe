<template>
  <div class="map-container">
    <div v-loading="mapsLoading" style="height: 500px; width: 100%">
      <l-map
        v-if="showMap"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate"
      >
        <l-tile-layer :url="url" :attribution="attribution" />
        <l-marker
          v-if="devices"
          :lat-lng="[devices.latitude, devices.longitude]"
          @click="eventClick()"
        >
          <l-icon>
            <font-awesome-icon
              icon="truck"
              :class="{
                'truck-online': devices.status,
                'truck-offline': !devices.status,
              }"
            />
          </l-icon>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script>
import { fetchEventsById } from '@/api/event'
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
      devices: null,
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
      mapsLoading: false
    }
  },
  async mounted() {
    await this.fetchData()
  },
  methods: {
    async fetchData() {
      this.mapsLoading = true
      const { data } = await fetchEventsById(this.$route.params.eventId)
      this.devices = data[0]
      this.mapsLoading = false
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
    },
    eventClick() {
      localStorage.setItem('Tab', 'first')
      this.$router.push(
        `/event-summary/${this.$route.params.eventId}/event-detail`
      )
    }
  }
}
</script>

<style lang="scss">
html,
body,
#map {
  height: 100%;
  z-index: 200;
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
  color: #e6c01a;
}

.truck-offline {
  font-size: 24px;
  color: #0e0101;
}
</style>
