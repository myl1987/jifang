import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [
      { path: 'dashboard', component: () => import('@/views/dashboard/index') }
    ] 
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/user',
    component: Layout,
    alwaysShow: true,
    name: 'User',
    meta: { title: '个人中心', icon: 'user'},
    children: [
      {
        path: 'password',
        component: () => import('@/views/user/password/index'),
        meta: { title: '修改密码', icon: 'mima' }
      },

      {
        path: 'daiban',
        component: () => import('@/views/user/daiban/index'),
        meta: { title: '我的待办', icon: 'daiban', roles: ['2', '3'] }
      }

    ]
  },
  {
    path: '/trainingroom',
    component: Layout,
    redirect: '/trainingroom/index',
    alwaysShow: true, // will always show the root menu
    name: 'trainingroomTop',
    meta: { title: '机房管理', icon: 'shixunshi', roles: ['1', '2', '3'] },
    children: [
      {
        path: 'index',
        name: 'trainingroom',
        component: () => import('@/views/trainingroom/index'),
        meta: { title: '机房管理', icon: 'tree' }
      },
      { path: 'shebei/:id',
        name: 'shebei',
        component: () => import('@/views/trainingroom/shebei/index'),
        meta: { title: '设备管理', icon: 'tree' },
        hidden: true
      },
      {
        path: 'repair',
        name: 'repair',
        component: () => import('@/views/trainingroom/repair/index'),
        meta: { title: '维修管理', icon: 'weixiu', roles: ['1', '3']  }
      }
    ]
  },
  {
    path: '/kucun',
    component: Layout,
    redirect: '/kucun/index',
    alwaysShow: true, // will always show the root menu
    name: 'kucunTop',
    meta: { title: '配件管理', icon: 'kucun', roles: ['1', '2', '3'] },
    children: [
      {
        path: 'kucun',
        name: 'kucun',
        component: () => import('@/views/peijian/index'),
        meta: { title: '配件入库', icon: 'peijian' }
      },
      // {
      //   path: 'daiban',
      //   component: () => import('@/views/user/daiban/index'),
      //   meta: { title: '采购申请', icon: 'tree' }
      // }
    ]
  },
  {
    path: '/paike',
    component: Layout,
    alwaysShow: true,
    name: 'Paike',
    meta: { title: '排课管理', icon: 'paike' },
    children: [
      {
        path: 'class',
        component: () => import('@/views/paike/class/index'),
        meta: { title: '专业班级管理', icon: 'tree', roles: ['3', '4'] }
      },
      {
        path: 'paike',
        component: () => import('@/views/paike/paike'),
        meta: { title: '机房排课', icon: 'table', roles: ['3', '4'] }
      },
      {
        path: 'show',
        component: () => import('@/views/paike/show'),
        meta: { title: '课表查看', icon: 'eye' }
      }

    ]
  },
  {
    path: '/sys',
    component: Layout,
    redirect: '/sys/index',
   
    name: 'sys',
    meta: { title: '系统管理', icon: 'example', roles: ['2', '3'] },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'user' }
      },
      {
        path: 'term',
        name: 'term',
        component: () => import('@/views/term/index'),
        meta: { title: '学期管理', icon: 'tree' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
