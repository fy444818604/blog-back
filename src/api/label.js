import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/label/search',
    method: 'get'
  })
}

export function fetchOne(id) {
  return request({
    url: '/label/search/'+id,
    method: 'get'
  })
}

export function createLabel(data) {
  return request({
    url: '/label/add',
    method: 'post',
    data
  })
}

export function editLabel(id,data) {
  return request({
    url: '/label/edit/' + id,
    method: 'post',
    data
  })
}
