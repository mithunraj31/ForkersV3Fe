<script>
import Media from '@dongido/vue-viaudio'

export default {
  name: 'App',
  components: {
    Media
  }
}
</script>

<template>
  <div id="app">
    <Media :kind="'video'" :controls="true" :src="['https://www.w3schools.com/html/mov_bbb.mp4']" />
  </div>
</template>

<style scoped></style>
