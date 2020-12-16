<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ this.$t("rfid.new.title") }}</h3>
    <rfid-form @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import RfidForm from '../components/RfidForm'
import { newRfid } from '@/api/rfid'

export default {
  name: 'NewRfid',
  components: {
    RfidForm
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    onFormSubmit(form) {
      this.loading = true
      newRfid(form)
        .then((response) => {
          this.loading = false
          this.$message({
            message: this.$t('message.rfidDataHasBeenCreated'),
            type: 'success'
          })
          this.$router.push('/rfid')
        })
        .catch(() => {
          this.loading = false
          this.$message({
            message: this.$t('message.somethingWentWrong'),
            type: 'error'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
