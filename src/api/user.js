import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: '/api/user/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: '/api-token-auth/',
    data,
    method: 'post'
  })
}

export const logout = (token) => {
  return axios.request({
    url: '/api/user/logout',
    method: 'post'
  })
}

export const getUsers = () => {
  return axios.request({
    url: '/api/user/users',
    method: 'get'
  })
}
