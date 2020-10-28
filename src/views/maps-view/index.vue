<template>
  <div id="app">
    <div class="wrapper" :zoomSettings="zoomSettings" :centerPosition="centerPosition">
      <ejs-maps>
        <e-layers>
          <e-layer :layer-type="layerType">
            <e-markerSettings>
              <e-markerSetting visible="true" height="25" width="15" :data-source="dataSource" />
              <e-markerSetting visible="true" height="25" width="15" :data-source="dataSource1" />
            </e-markerSettings>
            <e-navigationLineSettings>
              <e-navigationLineSetting visible="true" :latitude="latitude" :longitude="longitude" :color="color" :angle="angle" :width="width" />
            </e-navigationLineSettings>
          </e-layer>
        </e-layers>
      </ejs-maps>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  MapsPlugin,
  NavigationLine,
  Marker,
  Zoom
} from '@syncfusion/ej2-vue-maps'

Vue.use(MapsPlugin)
export default {
  data() {
    return {
      zoomSettings: {
        enable: true,
        toolBars: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset']
      },
      centerPosition: {
        latitude: 35.689487,
        longitude: 139.691711
      },
      layerType: 'OSM',
      dataSource: [{
        latitude: 34.06062,
        longitude: -118.330491,
        name: 'California'
      }],
      dataSource1: [{
        latitude: 40.724546,
        longitude: -73.850344,
        name: 'New York'
      }],
      color: 'blue',
      width: 5,
      angle: 0.1,
      latitude: [34.06062, 40.724546],
      longitude: [-118.330491, -73.850344]
    }
  },
  provide: {
    maps: [NavigationLine, Marker, Zoom]
  }
}
</script>

<style>
.wrapper {
    max-width: 600px;
    margin: 0 auto;
}
</style>
