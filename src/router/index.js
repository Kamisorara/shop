import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: "homePage",
    component: () => import("../views/homePage.vue"),
    redirect: "/commodity",
    children: [
      {
        path: '/commodity',
        name: "commodity",
        component: () => import("../views/commodity.vue"),
      },
      {
        path: '/details',
        name: "details",
        component: () => import("../views/details.vue")
      }
    ],
  },

]

const router = new VueRouter({
  routes
})

export default router
