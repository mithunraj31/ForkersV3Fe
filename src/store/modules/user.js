import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { keycloakService } from '@/api/keycloak'
import { SYSTEM_ROLE } from '@/enums'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    // const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      resolve()
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      setToken(keycloakService.token)
      const roles = [keycloakService.idTokenParsed.sys_role]
      if (keycloakService.idTokenParsed.sys_role !== SYSTEM_ROLE.ADMIN &&
        keycloakService.idTokenParsed.privileges &&
        keycloakService.idTokenParsed.privileges.length > 0) {
        for (let i = 0; i < keycloakService.idTokenParsed.privileges.length; i++) {
          roles.push(keycloakService.idTokenParsed.privileges[i])
        }
      }

      commit('SET_TOKEN', keycloakService.token)
      commit('SET_ROLES', roles)
      commit('SET_NAME', keycloakService.idTokenParsed.name)
      commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
      commit('SET_INTRODUCTION', keycloakService.idTokenParsed.email)
      resolve({
        roles: roles,
        introduction: keycloakService.idTokenParsed.emails,
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: keycloakService.idTokenParsed.name
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    keycloakService.logout()
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
