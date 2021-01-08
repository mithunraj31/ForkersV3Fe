import Vue from 'vue'
import Router from 'vue-router'
import {
  SYSTEM_ROLE,
  GROUP_PRIVILEGE,
  USER_PRIVILEGE,
  ROLE_PRIVILEGE,
  DEVICE_PRIVILEGE,
  VEHICLE_PRIVILEGE,
  EVENT_PRIVILEGE,
  MANUFACTURER_PRIVILEGE
} from '@/enums'

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
          title: 'OperatorListing',
          icon: 'el-icon-s-tools',
          noCache: true
        }
      },
      {
        path: 'new',
        component: () => import('@/views/driver-summary/new-driver/index'),
        name: 'NewDriver',
        hidden: true,
        meta: { title: 'newDriver', noCache: true }
      },
      {
        path: ':id/edit',
        component: () => import('@/views/driver-summary/edit-driver/index'),
        name: 'EditDriver',
        hidden: true,
        meta: { title: 'editDriver', icon: 'el-icon-mobile', noCache: true, breadcrumbTitle: 'editDriverBreadcrumbTitle' }
      },
      {
        path: ':id/detail',
        component: () => import('@/views/driver-summary/driver-detail/index'),
        name: 'DriverDetail',
        hidden: true,
        meta: { title: 'driverDetail', icon: 'el-icon-mobile', noCache: true, breadcrumbTitle: 'driverDetailBreadcrumbTitle' }
      },
      {
        path: ':id/assign-rfid',
        component: () => import('@/views/driver-summary/assign-rfid/index'),
        name: 'AssignRFID',
        hidden: true,
        meta: { title: 'assignRFID', icon: 'el-icon-mobile', noCache: true, breadcrumbTitle: 'assignRFIDBreadcrumbTitle' }
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
        meta: { title: 'newRfid', noCache: true }
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
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/devices',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/device-listings/index'),
        name: 'DeviceListing',
        meta: {
          title: 'DeviceListing',
          icon: 'list',
          affix: false,
          roles: [SYSTEM_ROLE.ADMIN, DEVICE_PRIVILEGE.VIEW, VEHICLE_PRIVILEGE.VIEW]
        }
      },
      {
        path: ':deviceId/drive-summary',
        component: () => import('@/views/drive-summery/index'),
        name: 'DriveSummary',
        meta: {
          title: 'DriveSummary',
          icon: 'documentation',
          affix: false,
          roles: [SYSTEM_ROLE.ADMIN, DEVICE_PRIVILEGE.VIEW, VEHICLE_PRIVILEGE.VIEW]
        },
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
        meta: {
          title: 'DriveRoute',
          icon: 'documentation',
          affix: false,
          roles: [SYSTEM_ROLE.ADMIN, DEVICE_PRIVILEGE.VIEW, VEHICLE_PRIVILEGE.VIEW]
        },
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
        meta: {
          title: 'EventSummary',
          icon: 'el-icon-data-line',
          affix: false,
          roles: [SYSTEM_ROLE.ADMIN, EVENT_PRIVILEGE.VIEW]
        },
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
        meta: {
          title: 'EventDetail',
          noCache: true,
          roles: [SYSTEM_ROLE.ADMIN, EVENT_PRIVILEGE.VIEW]
        }
      },
      {
        path: ':eventId/event-map',
        component: () => import('@/views/event-summary/event-map/DeviceMap'),
        name: 'EventMap',
        hidden: true,
        meta: {
          title: 'EventMap',
          noCache: true,
          roles: [SYSTEM_ROLE.ADMIN, EVENT_PRIVILEGE.VIEW]
        }
      },
      {
        path: ':eventId/event-video',
        component: () => import('@/views/event-summary/event-video/index'),
        name: 'EventVideo',
        hidden: true,
        meta: {
          title: 'EventVideo',
          noCache: true,
          roles: [SYSTEM_ROLE.ADMIN, EVENT_PRIVILEGE.VIEW]
        }
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
        meta: {
          title: 'customerListings',
          icon: 'el-icon-school',
          noCache: true,
          roles: [SYSTEM_ROLE.ADMIN]
        }
      },
      {
        path: 'new',
        component: () => import('@/views/customer/new-customer/index'),
        name: 'NewCustomer',
        hidden: true,
        meta: {
          title: 'newCustomer',
          noCache: true,
          roles: [SYSTEM_ROLE.ADMIN]
        }
      },
      {
        path: ':id/edit',
        component: () => import('@/views/customer/edit-customer/index'),
        name: 'EditCustomer',
        hidden: true,
        meta: {
          title: 'editCustomer',
          noCache: true,
          breadcrumbTitle: 'editCustomerBreadcrumbTitle',
          roles: [SYSTEM_ROLE.ADMIN]
        }
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
        meta: {
          title: 'userListings',
          icon: 'user',
          noCache: true,
          roles: [SYSTEM_ROLE.ADMIN, USER_PRIVILEGE.VIEW]
        }
      },
      {
        path: 'new',
        component: () => import('@/views/user/new-user/index'),
        name: 'NewUser',
        hidden: true,
        meta: {
          title: 'newUser',
          noCache: true,
          roles: [SYSTEM_ROLE.ADMIN, USER_PRIVILEGE.ADD]
        }
      },
      {
        path: ':id/edit',
        component: () => import('@/views/user/edit-user/index'),
        name: 'EditUser',
        hidden: true,
        meta: {
          title: 'editUser',
          noCache: true,
          breadcrumbTitle: 'editUserBreadcrumbTitle',
          roles: [SYSTEM_ROLE.ADMIN, USER_PRIVILEGE.EDIT]
        }
      }
    ]
  },

  {
    path: '/roles',
    component: Layout,
    redirect: '/roles/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/role/index'),
        name: 'Roles',
        meta: {
          title: 'roleListings',
          icon: 'el-icon-s-cooperation',
          noCache: true,
          roles: [SYSTEM_ROLE.ADMIN, ROLE_PRIVILEGE.VIEW]
        }
      },
      {
        path: 'new',
        component: () => import('@/views/role/new-role/index'),
        name: 'NewRole',
        hidden: true,
        meta: {
          title: 'newRole',
          noCache: true,
          roles: [SYSTEM_ROLE.ADMIN, ROLE_PRIVILEGE.ADD]
        }
      },
      {
        path: ':id/edit',
        component: () => import('@/views/role/edit-role/index'),
        name: 'EditRole',
        hidden: true,
        meta: {
          title: 'editRole',
          noCache: true,
          breadcrumbTitle: 'roleBreadcrumbTitle',
          roles: [SYSTEM_ROLE.ADMIN, ROLE_PRIVILEGE.EDIT]
        }
      }
    ]
  },
  {
    path: '/groups',
    component: Layout,
    redirect: '/group/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/customer-group/index'),
        name: 'Group',
        meta: {
          title: 'groupManagement',
          icon: 'peoples',
          noCache: true,
          roles: [SYSTEM_ROLE.ADMIN, GROUP_PRIVILEGE.VIEW, GROUP_PRIVILEGE.ADD, GROUP_PRIVILEGE.EDIT, GROUP_PRIVILEGE.DELETE]
        }
      }
    ]
  },
  {
    path: '/manufacturers',
    component: Layout,
    redirect: '/manufacturers/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/manufacturer/index'),
        name: 'Manufacturers',
        meta: {
          title: 'manufacturerListings',
          icon: 'el-icon-s-tools',
          noCache: true,
          roles: [SYSTEM_ROLE.ADMIN, MANUFACTURER_PRIVILEGE.VIEW]
        }
      },
      {
        path: 'new',
        component: () => import('@/views/manufacturer/new-manufacturer/index'),
        name: 'NewManufacturer',
        hidden: true,
        meta: {
          title: 'newManufacturer',
          noCache: true,
          roles: [SYSTEM_ROLE.ADMIN, MANUFACTURER_PRIVILEGE.ADD]
        }
      },
      {
        path: ':id/edit',
        component: () => import('@/views/manufacturer/edit-manufacturer/index'),
        name: 'EditManufacturer',
        hidden: true,
        meta: {
          title: 'editManufacturer',
          noCache: true,
          breadcrumbTitle: 'editManufacturerBreadcrumbTitle',
          roles: [SYSTEM_ROLE.ADMIN, MANUFACTURER_PRIVILEGE.EDIT]
        }
      }
    ]
  }
]

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
