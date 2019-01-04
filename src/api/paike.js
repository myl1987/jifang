import request from '@/utils/request'

export function addkecheng(kcdata) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/addkecheng',
    method: 'post',
    data: {
      kcdata
    }
  })
}

export function editkecheng(kcdata, id) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/editkecheng',
    method: 'post',
    data: {
      kcdata,
      id
    }
  })
}

export function getAllkc() {
  return request({
    url: '/api/pkapi/public/?s=/index/index/getAllkc',
    method: 'get'
  })
}

export function deletekbByid(kcid) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/deletekbByid',
    method: 'post',
    data: {
      kcid
    }
  })
}

