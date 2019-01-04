import request from '@/utils/request'

export function getpjInfo() {
  return request({
    url: '/api/pkapi/public/?s=/index/Kucun/getpjInfo',
    method: 'get'
  })
}

export function getPeijianAll(flag) {
  return request({
    url: '/api/pkapi/public/?s=/index/Kucun/getPeijianAll',
    method: 'post',
    data: {
      flag
    }
  })
}

export function findpjBycode(code) {
  return request({
    url: '/api/pkapi/public/?s=/index/Kucun/findpjBycode',
    method: 'post',
    data: {
      code
    }
  })
}

export function addpj(data) {
  return request({
    url: '/api/pkapi/public/?s=/index/Kucun/addpj',
    method: 'post',
    data: {
      data
    }
  })
}

export function editpj(data, id) {
  return request({
    url: '/api/pkapi/public/?s=/index/Kucun/editpj',
    method: 'post',
    data: {
      data,
      id
    }
  })
}

export function deletePjByid(id) {
  return request({
    url: '/api/pkapi/public/?s=/index/Kucun/deletePjByid',
    method: 'post',
    data: {
      id
    }
  })
}

export function addPjNum(id, num) {
  return request({
    url: '/api/pkapi/public/?s=/index/Kucun/addPjNum',
    method: 'post',
    data: {
      id,
      num
    }
  })
}

export function lookhistory(id) {
  return request({
    url: '/api/pkapi/public/?s=/index/Kucun/lookhistory',
    method: 'post',
    data: {
      id
    }
  })
}
