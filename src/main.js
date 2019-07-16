// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import './assets/font/iconfont.css'
import 'iview/dist/styles/iview.css';
// import './assets/common.less'
import Vuex from 'vuex'
import store from './store'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/pie'


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
