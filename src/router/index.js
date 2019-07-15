import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index/Index'
import Overview from '@/components/overview/Overview' //平台首页
import Balancerecord from '@/components/Balancerecord/Balancerecord' //余额记录

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
		{
			path: '/Index',
			name: '/Index',
			component: Index,
			children: [
				{
					path: '/Overview',
					name: '/Overview',
					component: Overview,
				},
				{
					path: '/Balancerecord',
					name: '/Balancerecord',
					component: Balancerecord,
				},
			]
		},
		
  ]
})
