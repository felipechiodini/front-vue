import Vue from 'vue'
import App from './App.vue'
import globalComponents from '@/js/Utils/GlobalComponents'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueMeta from 'vue-meta'
import VueMask from 'v-mask'
import Money from 'v-money'

Vue.config.productionTip = false

Vue.use(VueMask)
Vue.use(VueMeta)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(globalComponents)
Vue.use(Money, { decimal: ',', thousands: '.', prefix: 'R$ ', precision: 2, masked: false })
 
//FontAwesome
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//Css Global
import '@/assets/scss/global.scss'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
