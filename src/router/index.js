import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import navigation from '@/components/navigation'
import home from '@/components/home'
import topicGeneration from '@/components/topicGeneration'
import topicManage from '@/components/topicManage'
import typeManage from '@/components/typeManage'
import onlineAnswer from '@/components/onlineAnswer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },{
      path: '/home',
      name: 'home',
      components: {
        navigation: navigation,
        home: home
      }
    },{
      path: '/topicGeneration',
      name: 'topicGeneration',
      components: {
        navigation: navigation,
        topicGeneration: topicGeneration
      }
    },{
      path: '/topicManage',
      name: 'topicManage',
      components: {
        navigation: navigation,
        topicManage: topicManage
      }
    },{
      path: '/typeManage',
      name: 'typeManage',
      components: {
        navigation: navigation,
        typeManage: typeManage
      }
     },{
      path: '/onlineAnswer',
      name: 'onlineAnswer',
      components: {
        navigation: navigation,
        onlineAnswer: onlineAnswer
      }
    }
  ]
})
