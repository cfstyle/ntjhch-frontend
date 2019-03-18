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

export const updateProject = (data) => {
  return axios.request({
    url: '/api/project/projects/' + data.id + '/',
    method: 'put',
    data: data
  })
}

export const addProject = (data) => {
  return axios.request({
    url: '/api/project/projects/',
    method: 'post',
    data: data
  })
}

export const getPendingProject = (data) => {
  return axios.request({
    url: '/api/project/projects/pending/',
    method: 'get',
    data: data
  })
}

export const rejectProject = (data) => {
  return axios.request({
    url: '/api/project/projects/reject/',
    method: 'post',
    data: data
  })
}

export const acceptProject = (data) => {
  return axios.request({
    url: '/api/project/projects/accept/',
    method: 'post',
    data: data
  })
}
