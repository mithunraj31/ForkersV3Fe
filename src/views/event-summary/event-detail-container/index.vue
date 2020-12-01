<template>
  <el-card class="box-card" shadow="always">
    <h5>{{ this.$t("event.eventId") }}: {{ $route.params.eventId }}</h5>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="this.$t('event.deviceDetails')" name="first">
        <device-detail />
      </el-tab-pane>
      <el-tab-pane :label="this.$t('event.mapsView')" name="second">
        <device-map />
      </el-tab-pane>
      <el-tab-pane :label="this.$t('event.video')" name="third">
        <event-video />
      </el-tab-pane>
    </el-tabs>
  </el-card>
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
      activeName: localStorage.getItem('Tab') || 'first'
    }
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      localStorage.setItem('Tab', this.activeName)
    }
  }
}
</script>
