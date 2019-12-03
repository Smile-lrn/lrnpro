// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import {post,fetch} from './assets/js/httpRequestUtil.js'
import {comFilters} from './assets/js/common.js'
import moment from 'moment/moment'
import './assets/font/iconfont.css'
import 'iview/dist/styles/iview.css';
// import './assets/common.less'
import Vuex from 'vuex'
import store from './store'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/pie'
// Vue.prototype.HOME = '/api'
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;

// 日期过滤器
Vue.filter('moment', function(value, formatString) {
	formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
	// return moment(value).format(formatString); // value可以是普通日期 20170723
	return moment.unix(value).format(formatString); // 这是时间戳转时间
});
Vue.prototype.filterDate=function(value, formatString) {
	formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
	// return moment(value).format(formatString); // value可以是普通日期 20170723
	return moment.unix(value/1000).format(formatString); // 这是时间戳转时间
};
Vue.prototype.filterType=function(value) {
	var temtype = '';
	if(value === 1){
		temtype='上级充值'
	}else if(value === 1){
		temtype='下级扣费'
	}else if(value === 1){
		temtype='后台充值套餐'
	}else if(value === 1){
		temtype='总后台扣除'
	}else if(value === 1){
		temtype='自动充值'
	}
	return temtype;
};
for (let key in comFilters){ 
	Vue.filter(key,comFilters[key]) 
}
// import '../mytheme/index.less';
let temobjs = JSON.parse(sessionStorage.getItem('temobj'));
let tokens = sessionStorage.getItem('token');
if(temobjs&&tokens){
	store.commit('setuserinfo',temobjs)
	store.commit('setToken',tokens);
}else{
	router.push({
		path:'/login'
	})
}

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(Vuex)
Vue.component('chart', ECharts)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	store,//全局引用store对象
  components: { App },
  template: '<App/>'
})
