import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
// import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: require('../components/index.vue'),
      children: [
        {
          path: '/index',
          redirect: '/index/recommend'
        },
        {
          path: 'recommend',
          component: require('../components/recommend')
        },
        {
          path: 'playlist',
          component: require('../components/playList.vue')
        },
        {
          path: 'topList',
          component: require('../components/topList.vue')
        },
        {
          path: 'hotSinger',
          component: require('../components/hotSinger.vue')
        }
      ]
    },
    {
      path: '/playlist/:id',
      name: 'listdetail',
      component: require('../components/playListDetail.vue')
    },
    {
      path: '/player',
      name: 'player',
      component: require('../components/player.vue'),
      beforeEnter: (to, from, next) =>{
        store.commit('SHOW_PLAYER');
        next();
      },
      // beforeLeave: (to, from, next) => {
      //   console.log('leave')
      //   store.commit('CLOSE_PLAYER');
      //   next();
      // }
    }
  ]
})
