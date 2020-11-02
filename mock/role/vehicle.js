module.exports = [
  {
    url: "vue-element-admin/vehicle/satus",
    type: "get",
    response: () => {
      return {
        code: 20000,
        data: [
          {
            id: 1,
            status: online
          },
          {
            id: 2,
            status: offline
          },
          {
            id: 3,
            status: offline
          },
          {
            id: 4,
            status: offline
          },
        ]
      }
    }
  }
]
