import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Index from './components/Index.vue'
import Login from './components/Admin.vue'
import Mianze from './components/Mianze.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
      {
          path: '/',
          component: Index,
          name: 'index'
      },
      {
          path: '/login',
          component: Login
      },
      {
          path: '/mianze',
          component: Mianze
      }
  ]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
