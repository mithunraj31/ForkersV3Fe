import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import * as filters from './filters' // global filters
import 'leaflet/dist/leaflet.css'

import VueVideoPlayer from 'vue-video-player'

import 'video.js/dist/video-js.css'

import { keycloakService } from '@/api/keycloak'
// import 'vue-video-player/src/custom-theme.css'

Vue.use(VueVideoPlayer /* {
  options: global default options,
  events: global videojs events
} */)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

keycloakService.init({ onLoad: 'login-required' })
  .then((authenticated) => {
    if (!authenticated) {
      window.location.reload()
    } else {
      new Vue({
        el: '#app',
        router,
        store,
        i18n,
        render: h => h(App)
      })
    }
  }).catch((error) => {
    console.log(error)
  })

if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1)
    return format.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] !== 'undefined'
        ? args[number]
        : match
    })
  }
}
