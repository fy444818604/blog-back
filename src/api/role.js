import request from '@/utils/request'

export function getRoutes(id) {
  return request({
    url: '/users/role/menuFind/'+id,
    method: 'get'
  })
}

export function getAllRoutes() {
  return request({
    url: '/users/role/menus',
    method: 'get'
  })
}

export function addRoutes(data) {
  return request({
    url: '/users/role/menu',
    method: 'post',
    data
  })
}

export function getRoles() {
  return request({
    url: '/users/role/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/users/role/create',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}
