import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/photos/search',
    method: 'get',
    params: query
  })
}

export function photosCreate(data) {
  return request({
    url: '/photos/add',
    method: 'post',
    data
  })
}

export function photoSearch(query) {
  return request({
    url: '/photos/item/search/'+query,
    method: 'get'
  })
}
