import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index/Index'
import Overview from '@/components/overview/Overview' //平台首页
import Balancerecord from '@/components/Balancerecord/Balancerecord' //余额记录
import Unicomcard from '@/components/Cardmanagement/Unicomcard' //联通流量卡
import Trafficcard from '@/components/Cardmanagement/Trafficcard' //移动流量卡
import Telecommunicationcard from '@/components/Cardmanagement/Telecommunicationcard' //电信流量卡
import Detail from '@/components/Cardmanagement/Detail' //列表充值查询页面
import Singleprepaid from '@/components/Cardmanagement/Singleprepaid' //单卡充值
import Batchtopup from '@/components/Cardmanagement/Batchtopup' //批量充值
import Batchthrough from '@/components/Cardmanagement/Batchthrough' //批量划卡
import Agentlist from '@/components/Agentmanagement/Agentlist' //代理商列表
import Addagent from '@/components/Agentmanagement/Addagent' //代理商列表
import Operatingadiary from '@/components/Operatingadiary/Operatingadiary' //操作日记
import Echartspage from '@/components/Echartspage/Echartspage' //操作日记

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
			{
				path: '/Unicomcard',
				name: '/Unicomcard',
				component: Unicomcard,
			},
			{
				path: '/Trafficcard',
				name: '/Trafficcard',
				component: Trafficcard,
			},
			{
				path: '/Telecommunicationcard',
				name: '/Telecommunicationcard',
				component: Telecommunicationcard,
			},
			{
				path: '/Detail/:type',
				name: '/Detail',
				component: Detail,
			},
			{
				path: '/Singleprepaid',
				name: '/Singleprepaid',
				component: Singleprepaid,
			},
			{
				path: '/Batchtopup',
				name: '/Batchtopup',
				component: Batchtopup,
			},
			{
				path: '/Batchthrough',
				name: '/Batchthrough',
				component: Batchthrough,
			},
			{
				path: '/Agentlist',
				name: '/Agentlist',
				component: Agentlist,
			},
			{
				path: '/Addagent',
				name: '/Addagent',
				component: Addagent,
			},
			{
				path: '/Operatingadiary',
				name: '/Operatingadiary',
				component: Operatingadiary,
			},
			{
				path: '/Echartspage',
				name: '/Echartspage',
				component: Echartspage,
			},
			
		]
	},
		
  ]
})
