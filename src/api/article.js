import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/note/noteSearch',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: 'note/noteSearchById/'+id,
    method: 'get',
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/note/noteAdd',
    method: 'post',
    data
  })
}

export function delArticle(id) {
  console.log(id);
  return request({
    url: '/note/noteDel/'+id,
    method: 'get'
  })
}

export function updateArticle(id,data) {
  return request({
    url: '/note/noteUpdate/'+id,
    method: 'post',
    data
  })
}

export function fetchLabel() {
  return request({
    url: '/label/search',
    method: 'get'
  })
}
