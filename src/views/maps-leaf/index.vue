<template>
  <div id="app" />
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
require('leaflet.markercluster')
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

export default {
  mounted() {
    const w = {
      icon: L.divIcon({
        className: 'red marker',
        iconSize: [16, 16]
      })
    }
    L.map('app', {
      center: L.latLng(35.6825, 139.752778),
      zoom: 15
    })

      .addLayer(L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png'))
      .addLayer(
        L.markerClusterGroup()
          .addLayer(L.marker([35.691, 139.752], w))
          .addLayer(L.marker([35.692, 139.752], w))
          .addLayer(L.marker([35.69, 139.752], w))
          .addLayer(L.marker([35.691, 139.753], w))
          .addLayer(L.marker([35.691, 139.751], w))
      )
  }
}
</script>

<style>
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
</style>
