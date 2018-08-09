import { login, logout, getUserInfo } from '@/api/user'
import {
  setToken,
  getToken,
  setUserName,
  getUserName,
  setUserId,
  getUserId,
  setAccess,
  getAccess,
  setAvator,
  getAvator } from '@/libs/util'

export default {
  state: {
    userName: getUserName(),
    userId: getUserId(),
    avatorImgPath: getAvator(),
    token: getToken(),
    access: getAccess()
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
      setAvator(avatorPath)
    },
    setUserId (state, id) {
      state.userId = id
      setUserId(id)
    },
    setUserName (state, name) {
      state.userName = name
      setUserName(name)
    },
    setAccess (state, access) {
      state.access = access
      setAccess(access)
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, {userName, password}) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          // commit('setToken', data.token)
          if (res) {
            resolve()
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          resolve()
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }, {userName, password}) {
      return new Promise((resolve, reject) => {
        getUserInfo({userName, password}).then(res => {
          const data = res
          commit('setToken', data.token)
          commit('setAvator', data.avator)
          commit('setUserName', data.user_name)
          commit('setUserId', data.user_id)
          commit('setAccess', data.access)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
