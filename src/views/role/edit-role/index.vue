<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ this.$t("role.edit.title") }}: {{ $route.params.id }}</h3>
    <role-form :role="role" @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import RoleForm from '../components/RoleForm'
import { fetchRoleById, editRole } from '@/api/role'

export default {
  name: 'EditRole',
  components: {
    RoleForm
  },
  data() {
    return {
      role: {},
      loading: false
    }
  },
  async mounted() {
    this.loading = true
    try {
      const { data } = await fetchRoleById(+this.$route.params.id)
      this.role = {
        id: +this.$route.params.id,
        name: data.name,
        description: data.description,
        privileges: data.privileges,
        customerId: data.customer.id
      }
    } catch (err) {
      this.$router.push('/404')
    }
    this.loading = false
  },
  methods: {
    onFormSubmit(form) {
      this.loading = true
      editRole(form)
        .then(() => {
          this.loading = false
          this.$message({
            message: this.$t('message.roleHasBeenEdited'),
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
