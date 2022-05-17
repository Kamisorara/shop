import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: "homePage",
		component: () => import("../views/homePage.vue"),
		redirect: "/commodity",
		children: [{
				path: '/commodity',
				name: "commodity",
				component: () => import("../views/shop/commodity.vue"),
			},
			{
				path: '/details',
				name: "details",
				component: () => import("../views/shop/details.vue")
			},
			{
				path: '/user-detail',
				name: "userDetail",
				component: () => import("../views/user/userDetail.vue")
			}
		],
	},
	{
		path: '/login',
		name: 'login',
		component: () => import("../views/login.vue")
	},
	{
		path: '/register',
		name: 'register',
		component: () => import("../views/register.vue")
	},
]

const router = new VueRouter({
	routes
})

export default router
