import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import SignIn from '@/views/SignIn.vue';
import SignUp from '@/views/SignUp.vue';
import DashBoard from '@/views/DashBoard.vue';
import NotFound from '@/views/NotFound.vue';
import {auth} from "../firebase/credentials";


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'home',
    }
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn,
    meta: {
      title: 'SignIn',
    },
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
    meta: {
      title: 'SignUp',
    },
  },
  {
    path: '/dashboard',
    name: 'DashBoard',
    component: DashBoard,
    meta: {
      title: 'SignUp',
      requireAuth: true
    },
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: 'NotFound',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});


//login後でないと、dashboardにアクセスできない
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requireAuth)){
      const user = auth.currentUser
      if (!user) {
        next({path: '/sign-up'})
      }
      next()
  } else {
    next()
  }
})

//各々のタイトル
router.afterEach(to => {
  if (!to.meta.title) {
    return;
  }
  document.title = to.meta.title;
});

export default router;
