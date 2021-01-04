<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-input
        v-model="filterText"
        :placeholder="$t('group.filterPlaceholder')"
      />
    </div>
    <el-tree
      ref="tree"
      :data="groups"
      show-checkbox
      :props="treeOptions"
      :check-strictly="true"
      node-key="id"
      @check="handleCheckChange"
    />
  </el-card>
</template>

<script>

export default {
  name: 'GroupSelector',
  props: {
    groups: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      filterText: '',
      treeOptions: {
        label: 'name'
      },
      checkedNodes: []
    }
  },
  computed: {

  },
  mounted() {
  },
  methods: {
    handleCheckChange(group, status) {
      if (status.checkedKeys.length === 0) {
        this.$refs['tree'].setCheckedKeys([])
        this.$emit('onSelect', { id: '' })
      } else {
        this.$refs['tree'].setCheckedKeys([group.id])
        this.$emit('onSelect', group)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
