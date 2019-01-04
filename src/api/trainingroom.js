import request from '@/utils/request'

export function addsxs(sxsdata) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/addsxs',
    method: 'post',
    data: {
      sxsdata
    }
  })
}

export function editsxs(sxsdata, id) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/editsxs',
    method: 'post',
    data: {
      sxsdata,
      id
    }
  })
}

export function getbuilding() {
  return request({
    url: '/api/pkapi/public/?s=/index/index/getbuilding',
    method: 'get'
  })
}

export function getroom(bname) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/getroom',
    method: 'post',
    data: {
      bname
    }
  })
}

export function getbuilding_sxs() {
  return request({
    url: '/api/pkapi/public/?s=/index/index/getbuilding_sxs',
    method: 'get'
  })
}

export function getsoft() {
  return request({
    url: '/api/pkapi/public/?s=/index/index/getsoft',
    method: 'get'
  })
}

export function getAllsxs() {
  return request({
    url: '/api/pkapi/public/?s=/index/index/getAllsxs',
    method: 'get'
  })
}

export function getsxsPk(data) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/getsxsPk',
    method: 'post',
    data: {
      data
    }
  })
}

export function deleteSxsByid(id) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/deleteSxsByid',
    method: 'post',
    data: {
      id
    }
  })
}

export function getsxsInfo(id) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/getsxsInfo',
    method: 'post',
    data: {
      id
    }
  })
}

export function getManagers() {
  return request({
    url: '/api/pkapi/public/?s=/index/index/getManagers',
    method: 'get'
  })
}
