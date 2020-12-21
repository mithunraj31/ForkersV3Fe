import request from '@/utils/request'

export function newGroup(data) {
  request({
    url: `/groups`,
    method: 'post',
    data: {
      customer_id: data.customerId,
      name: data.name,
      description: data.description,
      parent_id: data.parentId
    }
  })
}
