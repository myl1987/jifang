import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUser(userdata) {
  Cookies.set('admin_role', userdata.admin_role)
  Cookies.set('admin_name', userdata.admin_name)
  Cookies.set('admin_status', userdata.admin_status)
  Cookies.set('admin_yuanxiID', userdata.admin_yuanxiID)
  Cookies.set('admin_start', userdata.admin_start)
  Cookies.set('admin_end', userdata.admin_end)
  Cookies.set('admin_username', userdata.admin_username)
  return 1
}

export function removeUser() {
  Cookies.remove('admin_role')
  Cookies.remove('admin_token')
  Cookies.remove('admin_name')
  Cookies.remove('admin_status')
  Cookies.remove('admin_yuanxiID')
  Cookies.remove('admin_start')
  Cookies.remove('admin_end')
  return 1
}

export function getUsername() {
  if (Cookies.get('admin_username') !== '') {
    return Cookies.get('admin_username') + '-' + Cookies.get('admin_name')
  } else {
    return Cookies.get('admin_name')
  }
}

export function getUserrole() {
  return Cookies.get('admin_role')
}

export function getUseryuanxiID() {
  return Cookies.get('admin_yuanxiID')
}

export function getUserstatus() {
  return Cookies.get('admin_status')
}

export function getUserstart() {
  return Cookies.get('admin_start')
}

export function getUserend() {
  return Cookies.get('admin_end')
}
