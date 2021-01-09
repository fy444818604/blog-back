import { asyncRoutes, constantRoutes } from '@/router'
import { getRoutes } from '@/api/role'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     // if(typeof roles != Object){
//     //   roles = [roles]
//     // }
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

function hasPermission(roles, route) {
  return roles.some(role => role == route.path)
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
// export function filterAsyncRoutes(routes, roles) {
//   const res = []
//   routes.forEach(route => {
//     const tmp = { ...route }
//     if (hasPermission(roles, tmp)) {
//       if (tmp.children) {
//         tmp.children = filterAsyncRoutes(tmp.children, roles)
//       }
//       res.push(tmp)
//     }
//   })
//   return res
// }
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}




const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      console.log("roles",roles);
      if (roles[0].name == 'admin') {
        accessedRoutes = asyncRoutes || []
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      } else {
        getRoutes(roles[0].id).then(res => {
          let menu = [];
          res.data.roleMenus.map(v => {
            menu.push(v.path)
          })
          accessedRoutes = filterAsyncRoutes(asyncRoutes, menu)
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        })
        // accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)

      }

    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
