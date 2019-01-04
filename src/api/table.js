import request from '@/utils/request'

export function getAllxq() {
  return request({
    url: '/api/pkapi/public/?s=/index/index/getAllxq',
    method: 'get'
  })
}

export function addXq(data) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/addXq',
    method: 'post',
    data: {
      data
    }
  })
}

export function editXq(data, id) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/editXq',
    method: 'post',
    data: {
      data,
      id
    }
  })
}


export function deleteXqByid(id) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/deleteXqByid',
    method: 'post',
    data: {
      id
    }
  })
}

export function getAllzy() {
  return request({
    url: '/api/pkapi/public/?s=/index/index/getAllzy',
    method: 'get'
  })
}

export function stratTerm(id, flag) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/stratTerm',
    method: 'post',
    data: {
      id,
      flag
    }
  })
}

export function addzy(data) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/addzy',
    method: 'post',
    data: {
      data
    }
  })
}

export function editzy(data, id) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/editzy',
    method: 'post',
    data: {
      data,
      id
    }
  })
}

export function deleteZyByid(id) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/deleteZyByid',
    method: 'post',
    data: {
      id
    }
  })
}

export function deleteBjByid(id) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/deleteBjByid',
    method: 'post',
    data: {
      id
    }
  })
}

export function addClass(data) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/addClass',
    method: 'post',
    data: {
      data
    }
  })
}

export function getAllclassData(zyid) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/getAllclassData',
    method: 'post',
    data: {
      zyid
    }
  })
}

export function getclassByyear(year, yxcode) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/getclassByyear',
    method: 'post',
    data: {
      year,
      yxcode
    }
  })
}

export function getclassByzy(year, zyid) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/getclassByzy',
    method: 'post',
    data: {
      year,
      zyid
    }
  })
}

export function getWeeks() {
  return request({
    url: '/api/pkapi/public/?s=/index/index/getWeeks',
    method: 'get'
  })
}

export function getkb_yx(data) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/getkb_yx',
    method: 'post',
    data: {
      data
    }
  })
}

export function getkb_sxs(data) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/getkb_sxs',
    method: 'post',
    data: {
      data
    }
  })
}

export function getYxNameByCode(code) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/getYxNameByCode',
    method: 'post',
    data: {
      code
    }
  })
}

export function getExcelName(yx, zy, bj) {
  return request({
    url: '/api/pkapi/public/?s=/index/index/getExcelName',
    method: 'post',
    data: {
      yx,
      zy,
      bj
    }
  })
}

