<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ this.$t("role.new.title") }}</h3>
    <role-form @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import RoleForm from '../components/RoleForm'
import {
  newRole
} from '@/api/role'

export default {
  name: 'NewRole',
  components: {
    RoleForm
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    onFormSubmit(form) {
      this.loading = true
      newRole(form)
        .then((response) => {
          this.loading = false
          this.$message({
            message: this.$t('message.roleHasBeenCreated'),
            type: 'success'
          })
          this.$router.push('/roles')
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
