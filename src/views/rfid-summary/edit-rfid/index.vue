<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ this.$t("rfid.edit.title") }}: {{ $route.params.id }}</h3>
    <rfid-form :rfid-data="rfidData" @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import RfidForm from '../components/RfidForm'
import { fetchRfidById, editRfid } from '@/api/rfid'

export default {
  name: 'EditRfidData',
  components: {
    RfidForm
  },
  data() {
    return {
      rfidData: {},
      loading: false
    }
  },
  async mounted() {
    this.loading = true
    try {
      const { data } = await fetchRfidById(+this.$route.params.id)
      this.rfidData = {
        id: +this.$route.params.id,
        rfid: data.rfid,
        currentOperatorId: data.current_operator_id
      }
    } catch (err) {
      this.$router.push('/404')
    }
    this.loading = false
  },
  methods: {
    onFormSubmit(form) {
      this.loading = true
      editRfid(form)
        .then(() => {
          this.loading = false
          this.$message({
            message: this.$t('message.rfidDataHasBeenEdited'),
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
