<template>
  <el-table :data="tableData" style="width: 100%" @row-click="$router.push(`/eventSummary/${1}/event-detail`)">
    <el-table-column label="EventId" prop="eventId" width="350" />
    <el-table-column label="DeviceId" prop="deviceId" />
    <el-table-column label="Type" prop="type" />
    <el-table-column label="Video" prop="video" />
    <el-table-column label="Company" prop="company" />
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          eventId: '1117080a-6a83-4c9b-80b5-1ef7e36c12a4',
          deviceId: '1805030009',
          type: '1',
          video: 'processing',
          company: 'mbel'
        },
        {
          eventId: '1117080a-6a83-4c9b-80b5-1ef7e36c12a4',
          deviceId: '1805030009',
          type: '1',
          video: 'processing',
          company: 'mbel'
        },
        {
          eventId: '1117080a-6a83-4c9b-80b5-1ef7e36c12a4',
          deviceId: '1805030009',
          type: '1',
          video: 'processing',
          company: 'mbel'
        },
        {
          eventId: '1117080a-6a83-4c9b-80b5-1ef7e36c12a4',
          deviceId: '1805030009',
          type: '1',
          video: 'processing',
          company: 'mbel'
        }
      ]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleClick(val) {
      console.log(val.eventId)
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
.click {
  color: blue;
  cursor: pointer;
}
</style>
