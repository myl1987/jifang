import request from '@/utils/request'

export function getshebeiInfo(id) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/getshebeiInfo',
    method: 'post',
    data: {
      id
    }
  })
}

export function excelUpload(data, id) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/excelUpload',
    method: 'post',
    data: {
      data,
      id
    }
  })
}

export function downExcel() {
  return request({
    url: '/api/pkapi/public/?s=/index/index/downExcel',
    method: 'get'
  })
}

export function addsb(data) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/addsb',
    method: 'post',
    data: {
      data
    }
  })
}

export function editsb(data, id) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/editsb',
    method: 'post',
    data: {
      data,
      id
    }
  })
}

export function deleteSbByid(id) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/deleteSbByid',
    method: 'post',
    data: {
      id
    }
  })
}

export function getshrInfo() {
  return request({
    url: '/api/pkapi/public/?s=/index/index/getshrInfo',
    method: 'get'
  })
}

export function addbx(data, id) {
  return request({
    url: '/api/pkapi/public/?s=/index/Baoxiu/addbx',
    method: 'post',
    data: {
      data,
      id
    }
  })
}
