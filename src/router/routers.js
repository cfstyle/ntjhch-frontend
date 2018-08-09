import Main from '@/view/main'
import parentView from '@/components/parent-view'

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          hideInMenu: true,
          notCache: true,
          title: '首页',
          icon: 'home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/workflow',
    name: 'workflow',
    meta: {
      icon: 'social-buffer',
      title: '工作流转'
    },
    component: Main,
    children: [
      {
        path: 'project',
        name: 'project',
        meta: {
          icon: 'cube',
          title: '项目'
        },
        component: () => import('@/view/workflow/project.vue')
      },
      {
        path: 'work',
        name: 'work',
        meta: {
          icon: 'ios-book',
          title: '任务'
        },
        component: () => import('@/view/components/count-to/count-to.vue')
      },
      {
        path: 'project-detail',
        name: 'project-detail',
        meta: {
          icon: 'document',
          title: '项目详情',
          hideInMenu: true
        },
        component: () => import('@/view/workflow/project-detail.vue')
      }
    ]
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      icon: 'arrow-graph-up-right',
      title: '多级菜单',
      access: ['super_admin']
    },
    component: Main,
    children: [
      {
        path: 'level_2_1',
        name: 'level_2_1',
        meta: {
          icon: 'arrow-graph-up-right',
          title: '二级-1'
        },
        component: () => import('@/view/multilevel/level-1.vue')
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        meta: {
          access: ['super_admin'],
          icon: 'arrow-graph-up-right',
          title: '二级-2'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            meta: {
              icon: 'arrow-graph-up-right',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2/level-2-1.vue')
          }
        ]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'arrow-graph-up-right',
          title: '二级-3'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_3_1',
            name: 'level_2_3_1',
            meta: {
              access: ['super_admin'],
              icon: 'arrow-graph-up-right',
              title: '三级-1'
            },
            component: () => import('@/view/multilevel/level-2/level-2-1.vue')
          },
          {
            path: 'level_2_3_2',
            name: 'level_2_3_2',
            meta: {
              access: ['super_admin', 'admin'],
              icon: 'arrow-graph-up-right',
              title: '三级-2'
            },
            component: () => import('@/view/multilevel/level-2/level-2-1.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    component: () => import('@/view/error-page/404.vue')
  }
]
