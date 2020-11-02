import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import all of fontawsome icons
library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
