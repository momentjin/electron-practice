import Vue from 'vue'
import './plugins/vuetify'
import './plugins/moment'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
