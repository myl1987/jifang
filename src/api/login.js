import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/userinfo',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/logout',
    method: 'post',
    params: { token }
  })
}

export function getAllUser() {
  return request({
    url: '/api/pkapi/public/?s=/index/index/getAllUser',
    method: 'get'
  })
}

export function addUser(data) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/addUser',
    method: 'post',
    data: {
      data
    }
  })
}

export function editUser(data, id) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/editUser',
    method: 'post',
    data: {
      data,
      id
    }
  })
}

export function editPwd(data) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/editPwd',
    method: 'post',
    data: {
      data
    }
  })
}

export function deleteUserByid(id) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/deleteUserByid',
    method: 'post',
    data: {
      id
    }
  })
}

export function resetUserPwd(id) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/resetUserPwd',
    method: 'post',
    data: {
      id
    }
  })
}

export function getYuanxi() {
  return request({
    url: '/api/pkapi/public/?s=/index/index/getYuanxi',
    method: 'get'
  })
}

export function setManager(uid, mid) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/setManagerID',
    method: 'post',
    data: {
      uid,
      mid
    }
  })
}
