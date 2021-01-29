import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/photos/search',
    method: 'get',
    params: query
  })
}