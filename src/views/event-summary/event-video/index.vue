<template>
  <div v-loading="videoLoading">
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
</template>

<script>
import { fetchEventsVideoById } from '@/api/event'
import Media from '@dongido/vue-viaudio'

export default {
  name: 'App',
  videoLoading: 'false',
  components: {
    Media
  },
  data() {
    return {
      video: null
    }
  },
  async mounted() {
    await this.fetchData()
  },

  methods: {
    async fetchData() {
      this.videoLoading = true
      const { data } = await fetchEventsVideoById(this.$route.params.eventId)
      this.video = data
      this.videoLoading = false
    }
  }
}
</script>

<style scoped>
.video {
  width: 600px;
}
</style>
