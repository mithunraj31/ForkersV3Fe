<template>
  <div class="app-container">
    <div v-for="item in tableData" :key="item.key">
      <el-row>
        <el-col
          :span="3"
        ><div class="grid-content bg-purple" align="middle">
          {{ item.key }}
        </div>
        </el-col>
        <el-col
          :span="12"
        ><div class="grid-content bg-purple-light" align="middle">
          {{ item.value }}
        </div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeviceDetail',
  data() {
    return {
      tableData: [
        {
          key: 'DeviceId',
          value: '2003270003'
        },
        {
          key: 'EventId',
          value: '34f6a9aa-ee4c-42af-b255-0f8c1fad6ed6'
        },
        {
          key: 'driverId',
          value: '1'
        },
        {
          key: 'videoId',
          value: '34f6a9aa-ee4c-42af-b255-0f8c1fad6ed6'
        }
      ]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    detailMethod() {
      console.log('clicked')
    }
  }
}
</script>

<style>
.el-row {
  margin-bottom: 10px;
}
.el-col {
  border-radius: 2px;
}

.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 1px;
  min-height: 30px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
