<template>
  <div>
    <div v-loading="videoLoading" class="video-player">
      <div v-if="video === null">
        <h3>{{ this.$t("event.videoProcessing") }}</h3>
      </div>

      <video v-else controls="" class="video">
        <source class="" :src="video" type="video/mp4">
        Your browser doesn't support HTML5 video with video/mp4
      </video>
    </div>
  </div>
</template>

<script>
import { fetchEventsVideoById } from '@/api/event'

export default {
  name: 'EventVideo',
  data() {
    return {
      video: null,
      videoLoading: false
    }
  },
  async mounted() {
    await this.fetchData()
  },

  methods: {
    async fetchData() {
      this.videoLoading = true
      try {
        const { data } = await fetchEventsVideoById(this.$route.params.eventId)
        this.video = data
        this.videoLoading = false
      } catch (exception) {
        this.videoLoading = false
      }
    }
  }
}
</script>

<style scoped>
.video {
  min-width: 704px;
  min-height: 396px;
  width: auto;
}
</style>
