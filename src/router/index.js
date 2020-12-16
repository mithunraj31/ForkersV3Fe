import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  // {
  //   path: '/login',
  //   component: () => import('@/views/login/index'),
  //   hidden: true
  // },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/maps-leaf/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: false }
      }
    ]
  },
  {
    path: '/devices',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/device-listings/index'),
        name: 'DeviceListing',
        meta: { title: 'DeviceListing', icon: 'list', affix: false }
      },
      {
        path: ':deviceId/drive-summary',
        component: () => import('@/views/drive-summery/index'),
        name: 'DriveSummary',
        meta: { title: 'DriveSummary', icon: 'documentation', affix: false },
        hidden: true,
        props: route => ({
          start: route.query.start,
          end: route.query.end,
          deviceId: route.params.deviceId
        })
      },
      {
        path: ':deviceId/drive-route',
        component: () => import('@/views/map-route/index'),
        name: 'DriveRoute',
        hidden: true,
        meta: { title: 'DriveRoute', icon: 'documentation', affix: false },
        props: route => ({
          start: route.query.start,
          end: route.query.end,
          deviceId: route.params.deviceId
        })
      }
    ]
  },
  {
    path: '/event-summary',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/event-summary/index'),
        name: 'EventSummary',
        meta: { title: 'EventSummary', icon: 'el-icon-data-line', affix: false },
        props: route => ({
          start: route.query.start,
          end: route.query.end
        })
      },
      {
        path: ':eventId/event-detail',
        component: () => import('@/views/event-summary/event-detail-container/index'),
        name: ':eventId',
        hidden: true,
        meta: { title: 'EventDetail', noCache: true }
      },
      {
        path: ':eventId/event-map',
        component: () => import('@/views/event-summary/event-map/DeviceMap'),
        name: 'EventMap',
        hidden: true,
        meta: { title: 'EventMap', noCache: true }
      },
      {
        path: ':eventId/event-video',
        component: () => import('@/views/event-summary/event-video/index'),
        name: 'EventVideo',
        hidden: true,
        meta: { title: 'EventVideo', noCache: true }
      }
    ]
  },

  {
    path: '/deviceListings',
    component: Layout,
    children: [

    ]
  },
  {
    path: '/video',
    component: Layout,
    hidden: true,
    children: [
      {
        path: ':deviceId/create',
        component: () => import('@/views/on-demand-video/index'),
        name: 'createVideo',
        meta: { title: 'CreateVideo', icon: 'documentation', affix: false },
        props: route => ({
          start: route.query.start,
          end: route.query.end,
          eventId: route.params.deviceId
        })
      }
    ]
  },
  {
    path: '/operator',
    component: Layout,
    children: [
      {
        path: ':operatorId/driveSummary',
        component: () => import('@/views/operator-drive-summery'),
        name: 'OperatorDriveSummery',
        hidden: true,
        meta: { title: 'OperatorDriveSummary', icon: 'documentation', affix: false },
        props: route => ({
          start: route.query.start,
          end: route.query.end,
          operatorId: route.params.operatorId
        })
      }
    ]
  },
  {
    path: '/drivers',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/driver-summary/index'),
        name: 'Driver',
        meta: {
          title: 'DriverListing',
          icon: 'el-icon-s-tools',
          noCache: true
        }
      },
      {
        path: 'new',
        component: () => import('@/views/driver-summary/new-driver/index'),
        name: 'NewDriver',
        hidden: true,
        meta: { title: 'newDriver', noCache: false }
      },
      {
        path: ':id/edit',
        component: () => import('@/views/driver-summary/edit-driver/index'),
        name: 'EditDriver',
        hidden: true,
        meta: { title: 'editDriver', icon: 'el-icon-mobile', noCache: true, breadcrumbTitle: 'editDriverBreadcrumbTitle' }
      }
    ]
  },
  {
    path: '/rfid',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/rfid-summary/index'),
        name: 'RFID',
        meta: {
          title: 'RfidListing',
          icon: 'el-icon-s-shop',
          noCache: true
        }
      },
      {
        path: 'new',
        component: () => import('@/views/rfid-summary/new-rfid/index'),
        name: 'NewRfid',
        hidden: true,
        meta: { title: 'newRfid', noCache: false }
      },
      {
        path: ':id/edit',
        component: () => import('@/views/rfid-summary/edit-rfid/index'),
        name: 'EditRfid',
        hidden: true,
        meta: { title: 'editRfid', icon: 'el-icon-mobile', noCache: true, breadcrumbTitle: 'editRfidBreadcrumbTitle' }
      },
      {
        path: ':rfid/assign-operator',
        component: () => import('@/views/rfid-summary/assign-operator/index'),
        name: 'AssignOperator',
        hidden: true,
        meta: { title: 'assignOperator', icon: 'el-icon-mobile', noCache: true, breadcrumbTitle: 'assignOperatorBreadcrumbTitle' }
      },
      {
        path: ':rfid/history',
        component: () => import('@/views/rfid-summary/rfid-history/index'),
        name: 'RfidHistory',
        hidden: true,
        meta: { title: 'rfidHistory', icon: 'el-icon-mobile', noCache: true, breadcrumbTitle: 'rfidHistoryBreadcrumbTitle' }
      }
    ]
  },

  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    redirect: '/users/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/user/index'),
        name: 'Users',
        meta: { title: 'userListings', icon: 'user', noCache: true }
      },
      {
        path: 'new',
        component: () => import('@/views/user/new-user/index'),
        name: 'NewUser',
        hidden: true,
        meta: { title: 'newUser', noCache: false }
      },
      {
        path: ':id/edit',
        component: () => import('@/views/user/edit-user/index'),
        name: 'EditUser',
        hidden: true,
        meta: { title: 'editUser', noCache: true, breadcrumbTitle: 'editUserBreadcrumbTitle' }
      }
    ]
  },
  {
    path: '/customers',
    component: Layout,
    redirect: '/customers/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/customer/index'),
        name: 'Customers',
        meta: { title: 'customerListings', icon: 'el-icon-school', noCache: true }
      },
      {
        path: 'new',
        component: () => import('@/views/customer/new-customer/index'),
        name: 'NewCustomer',
        hidden: true,
        meta: { title: 'newCustomer', noCache: false }
      },
      {
        path: ':id/edit',
        component: () => import('@/views/customer/edit-customer/index'),
        name: 'EditCustomer',
        hidden: true,
        meta: { title: 'editCustomer', noCache: true, breadcrumbTitle: 'editCustomerBreadcrumbTitle' }
      }
    ]
  }
]

// export const originalConstantRoutes = [
//   {
//     path: '/redirect',
//     component: Layout,
//     hidden: true,
//     children: [
//       {
//         path: '/redirect/:path(.*)',
//         component: () => import('@/views/redirect/index')
//       }
//     ]
//   },
//   {
//     path: '/login',
//     component: () => import('@/views/login/index'),
//     hidden: true
//   },
//   {
//     path: '/auth-redirect',
//     component: () => import('@/views/login/auth-redirect'),
//     hidden: true
//   },
//   {
//     path: '/404',
//     component: () => import('@/views/error-page/404'),
//     hidden: true
//   },
//   {
//     path: '/401',
//     component: () => import('@/views/error-page/401'),
//     hidden: true
//   },
//   {
//     path: '/',
//     component: Layout,
//     redirect: '/dashboard',
//     children: [
//       {
//         path: 'dashboard',
//         component: () => import('@/views/dashboard/index'),
//         name: 'Dashboard',
//         meta: { title: 'dashboard', icon: 'dashboard', affix: true }
//       }
//     ]
//   },
//   {
//     path: '/documentation',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/documentation/index'),
//         name: 'Documentation',
//         meta: { title: 'documentation', icon: 'documentation', affix: true }
//       }
//     ]
//   },
//   {
//     path: '/guide',
//     component: Layout,
//     redirect: '/guide/index',
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/guide/index'),
//         name: 'Guide',
//         meta: { title: 'guide', icon: 'guide', noCache: true }
//       }
//     ]
//   },
// ]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = []

// export const originalAsyncRoutes = [
//   {
//     path: '/permission',
//     component: Layout,
//     redirect: '/permission/page',
//     alwaysShow: true, // will always show the root menu
//     name: 'Permission',
//     meta: {
//       title: 'permission',
//       icon: 'lock',
//       roles: ['admin', 'editor'] // you can set roles in root nav
//     },
//     children: [
//       {
//         path: 'page',
//         component: () => import('@/views/permission/page'),
//         name: 'PagePermission',
//         meta: {
//           title: 'pagePermission',
//           roles: ['admin'] // or you can only set roles in sub nav
//         }
//       },
//       {
//         path: 'directive',
//         component: () => import('@/views/permission/directive'),
//         name: 'DirectivePermission',
//         meta: {
//           title: 'directivePermission'
//           // if do not set roles, means: this page does not require permission
//         }
//       },
//       {
//         path: 'role',
//         component: () => import('@/views/permission/role'),
//         name: 'RolePermission',
//         meta: {
//           title: 'rolePermission',
//           roles: ['admin']
//         }
//       }
//     ]
//   },

//   {
//     path: '/icon',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/icons/index'),
//         name: 'Icons',
//         meta: { title: 'icons', icon: 'icon', noCache: true }
//       }
//     ]
//   },

//   /** when your routing map is too long, you can split it into small modules **/
//   componentsRouter,
//   chartsRouter,
//   nestedRouter,
//   tableRouter,

//   {
//     path: '/example',
//     component: Layout,
//     redirect: '/example/list',
//     name: 'Example',
//     meta: {
//       title: 'example',
//       icon: 'el-icon-s-help'
//     },
//     children: [
//       {
//         path: 'create',
//         component: () => import('@/views/example/create'),
//         name: 'CreateArticle',
//         meta: { title: 'createArticle', icon: 'edit' }
//       },
//       {
//         path: 'edit/:id(\\d+)',
//         component: () => import('@/views/example/edit'),
//         name: 'EditArticle',
//         meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
//         hidden: true
//       },
//       {
//         path: 'list',
//         component: () => import('@/views/example/list'),
//         name: 'ArticleList',
//         meta: { title: 'articleList', icon: 'list' }
//       }
//     ]
//   },

//   {
//     path: '/tab',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/tab/index'),
//         name: 'Tab',
//         meta: { title: 'tab', icon: 'tab' }
//       }
//     ]
//   },

//   {
//     path: '/error',
//     component: Layout,
//     redirect: 'noRedirect',
//     name: 'ErrorPages',
//     meta: {
//       title: 'errorPages',
//       icon: '404'
//     },
//     children: [
//       {
//         path: '401',
//         component: () => import('@/views/error-page/401'),
//         name: 'Page401',
//         meta: { title: 'page401', noCache: true }
//       },
//       {
//         path: '404',
//         component: () => import('@/views/error-page/404'),
//         name: 'Page404',
//         meta: { title: 'page404', noCache: true }
//       }
//     ]
//   },

//   {
//     path: '/error-log',
//     component: Layout,
//     children: [
//       {
//         path: 'log',
//         component: () => import('@/views/error-log/index'),
//         name: 'ErrorLog',
//         meta: { title: 'errorLog', icon: 'bug' }
//       }
//     ]
//   },

//   {
//     path: '/excel',
//     component: Layout,
//     redirect: '/excel/export-excel',
//     name: 'Excel',
//     meta: {
//       title: 'excel',
//       icon: 'excel'
//     },
//     children: [
//       {
//         path: 'export-excel',
//         component: () => import('@/views/excel/export-excel'),
//         name: 'ExportExcel',
//         meta: { title: 'exportExcel' }
//       },
//       {
//         path: 'export-selected-excel',
//         component: () => import('@/views/excel/select-excel'),
//         name: 'SelectExcel',
//         meta: { title: 'selectExcel' }
//       },
//       {
//         path: 'export-merge-header',
//         component: () => import('@/views/excel/merge-header'),
//         name: 'MergeHeader',
//         meta: { title: 'mergeHeader' }
//       },
//       {
//         path: 'upload-excel',
//         component: () => import('@/views/excel/upload-excel'),
//         name: 'UploadExcel',
//         meta: { title: 'uploadExcel' }
//       }
//     ]
//   },

//   {
//     path: '/zip',
//     component: Layout,
//     redirect: '/zip/download',
//     alwaysShow: true,
//     name: 'Zip',
//     meta: { title: 'zip', icon: 'zip' },
//     children: [
//       {
//         path: 'download',
//         component: () => import('@/views/zip/index'),
//         name: 'ExportZip',
//         meta: { title: 'exportZip' }
//       }
//     ]
//   },

//   {
//     path: '/pdf',
//     component: Layout,
//     redirect: '/pdf/index',
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/pdf/index'),
//         name: 'PDF',
//         meta: { title: 'pdf', icon: 'pdf' }
//       }
//     ]
//   },
//   {
//     path: '/pdf/download',
//     component: () => import('@/views/pdf/download'),
//     hidden: true
//   },

//   {
//     path: '/theme',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/theme/index'),
//         name: 'Theme',
//         meta: { title: 'theme', icon: 'theme' }
//       }
//     ]
//   },

//   {
//     path: '/clipboard',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/clipboard/index'),
//         name: 'ClipboardDemo',
//         meta: { title: 'clipboardDemo', icon: 'clipboard' }
//       }
//     ]
//   },

//   {
//     path: '/i18n',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/i18n-demo/index'),
//         name: 'I18n',
//         meta: { title: 'i18n', icon: 'international' }
//       }
//     ]
//   },

//   {
//     path: 'external-link',
//     component: Layout,
//     children: [
//       {
//         path: 'https://github.com/PanJiaChen/vue-element-admin',
//         meta: { title: 'externalLink', icon: 'link' }
//       }
//     ]
//   },

//   // 404 page must be placed at the end !!!
//   { path: '*', redirect: '/404', hidden: true }
// ]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
