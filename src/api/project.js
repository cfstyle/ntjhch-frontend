import axios from '@/libs/api.request'

export const getProject = (params) => {
  return axios.request({
    url: '/api/project/projects/?limit=' + params.limit + '&offset=' + params.offset,
    method: 'get'
  })
}

export const getProjectDetail = (params) => {
  return axios.request({
    url: '/api/project/projects/' + params.id + '/',
    method: 'get'
  })
}

export const addProject = (data) => {
  return axios.request({
    url: '/api/project/projects/',
    method: 'post',
    data: data
  })
}
