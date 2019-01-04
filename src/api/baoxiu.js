import request from '@/utils/request'

export function getbxInfo() {
  return request({
    url: '/api/pkapi/public/?s=/index/Baoxiu/getbxInfo',
    method: 'get'
  })
}

export function getbxInfo_end() {
  return request({
    url: '/api/pkapi/public/?s=/index/Baoxiu/getbxInfo_end',
    method: 'get'
  })
}

export function deletebxByid(id,sbid) {
  return request({
    url: '/api/pkapi/public/?s=/index/Baoxiu/deletebxByid',
    method: 'post',
    data: {
      id,
      sbid
    }
  })
}

export function getMyEvents() {
  return request({
    url: '/api/pkapi/public/?s=/index/Baoxiu/getMyEvents',
    method: 'get'
  })
}

export function chuli(id, sbid, yijian, content) {
  return request({
    url: '/api/pkapi/public/?s=/index/Baoxiu/chuli',
    method: 'post',
    data: {
      id,
      sbid,
      yijian,
      content
    }
  })
}

export function chuli_fqr(id, sbid, content) {
  return request({
    url: '/api/pkapi/public/?s=/index/Baoxiu/chuli_fqr',
    method: 'post',
    data: {
      id,
      sbid,
      content
    }
  })
}

export function getBxDetails(id) {
  return request({
    url: '/api/pkapi/public/?s=/index/Baoxiu/getBxDetails',
    method: 'post',
    data: {
      id
    }
  })
}

