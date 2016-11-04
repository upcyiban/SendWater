import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Index from './components/Index.vue'
import Login from './components/Admin.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
      {
          path: '/',
          component: Index
      },
      {
          path: '/login',
          component: Login
      }
  ]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
