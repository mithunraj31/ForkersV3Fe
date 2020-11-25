<template>
  <div>
    <h3>{{ this.$t("event.id") }}: {{ $route.params.eventId }}</h3>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="DeviceDetails" name="first">
        <device-detail />
      </el-tab-pane>
      <el-tab-pane label="Maps View" name="second">
        <device-map />
      </el-tab-pane>
      <el-tab-pane label="Video" name="third">
        <event-video />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import DeviceDetail from '../event-detail/DeviceDetail'
import DeviceMap from '../event-map/DeviceMap'
import EventVideo from '../event-video/index.vue'
export default {
  components: {
    DeviceDetail,
    DeviceMap,
    EventVideo
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
