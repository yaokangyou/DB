// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// import element-ui and css
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// use element-ui
Vue.use(Element)

import axios from 'axios'
axios.defaults.baseURL = process.env.NODE_ENV !== 'production' ? '/api' : process.env.REAL_API // api的base_url

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
