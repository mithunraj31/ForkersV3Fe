<template>
  <div>
    <div v-loading="videoLoading" style="height: 500px; width: 100%">
      <div v-if="video === null">
        <h3>{{ this.$t("event.videoProcessing") }}</h3>
      </div>
      <Media
        v-else
        class="video"
        :kind="'video'"
        :controls="true"
        :src="['{{video}}']"
      />
    </div>
  </div>
</template>

<script>
import { fetchEventsVideoById } from '@/api/event'
import Media from '@dongido/vue-viaudio'

export default {
  name: 'EventVideo',
  components: {
    Media
  },
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
      } catch (exception) {
        this.videoLoading = false
      }
    }
  }
}
</script>

<style scoped>
.video {
  width: 600px;
}
</style>
