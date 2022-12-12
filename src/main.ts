import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from "./redux/store/index"

import VueCookies from 'vue-cookies'
Vue.use(VueCookies, { expire: '3D'})
store.dispatch({ type: 'SET_TOKEN', payload: Vue.$cookies.get('authToken') })


import Chakra, { CThemeProvider, CReset } from '@chakra-ui/vue'
import { faEyeSlash, faEye, faCircle, faCircleNotch, faCirclePlus, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import extendTheme from './theme'
Vue.use(Chakra, {
  extendTheme,
  icons: {
    iconPack: 'fa',
    iconSet: {
      faEye,
      faCircle,
      faEyeSlash,
      faCircleNotch,
      faCirclePlus,
      faCircleCheck,
    }
  }
})

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

axios.defaults.withCredentials = false
axios.defaults.baseURL = 'https://test-api.sytbuilder.com'
axios.defaults.headers.common['Authorization'] = `Bearer ${store.getState().authToken}`
Vue.prototype.$http = axios
Vue.config.productionTip = false

axios.get('/me').then(({ data }: any) => {
  store.dispatch({ type: 'CURRENT_USER', payload: data.user })
})

new Vue({
  router,
  render: (h) => h(CThemeProvider, [h(CReset), h(App)])
}).$mount('#app')
