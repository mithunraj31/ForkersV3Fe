<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ this.$t("user.edit.title") }}: {{ $route.params.id }}</h3>
    <user-form :user="user" @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import UserForm from '../components/UserForm'
import {
  fetchUserById,
  editUser
} from '@/api/user'

export default {
  name: 'EditUser',
  components: {
    UserForm
  },
  data() {
    return {
      user: {},
      loading: false
    }
  },
  async mounted() {
    this.loading = true
    try {
      const { data } = await fetchUserById(+this.$route.params.id)

      this.user = {
        id: +this.$route.params.id,
        firstName: data.first_name,
        lastName: data.last_name,
        roleId: data.role_id,
        customerId: data.customer_id,
        username: data.username,
        sysRole: data.sys_role
      }
    } catch (err) {
      this.$router.push('/404')
    }
    this.loading = false
  },
  methods: {
    onFormSubmit(form) {
      this.loading = true
      // console.log(form)
      // return
      editUser(form)
        .then(() => {
          this.loading = false
          this.$message({
            message: this.$t('message.userHasBeenEdited'),
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
