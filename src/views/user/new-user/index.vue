<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ this.$t("user.new.title") }}</h3>
    <user-form @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import UserForm from '../components/UserForm'
import {
  newUser
} from '@/api/user'

export default {
  name: 'NewUser',
  components: {
    UserForm
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    onFormSubmit(form) {
      this.loading = true
      newUser(form)
        .then((response) => {
          this.loading = false
          this.$message({
            message: this.$t('message.userHasBeenCreated'),
            type: 'success'
          })
          this.$router.push('/users')
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
