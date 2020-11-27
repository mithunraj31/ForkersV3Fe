<template>
  <div>
    <div v-if="!video">
      <h3>still processing video please wait</h3>
    </div>
    <Media class="video" :kind="'video'" :controls="true" :src="['{{video}}']" />
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
