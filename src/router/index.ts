import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import PageNotFound from '@/views/PageNotFound.vue';
import views from '@/views/Views';

Vue.use(VueRouter);

let routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/home',
    redirect: '/',
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: () => import(/* webpackChunkName: "about" */ '../views/Feedback.vue'),
  },
];

routes = routes.concat(
  views.map((el) => {
    const rc: RouteConfig = {
      path: el.path,
      component: () => import(`../views/${el.view}.vue`),
    };
    return rc;
  }),
);

routes.push({
  path: '/*',
  component: PageNotFound,
});

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
