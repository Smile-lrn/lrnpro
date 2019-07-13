import Vue from 'vue'  //引入vue
import Vuex from 'vuex'	//引入vuex
Vue.use(Vuex)	//使用vuex
import states from './state.js'   //导入vuex数据源
import getters from './getter.js' //过滤数据
import mutations from './mutations.js' //修改数据的方法
import actions from './actions.js' //提交修改数据源



// 创建vuex实例
const store = new Vuex.Store({
	// stat
	state:{
		...states
	},
	getters,
	mutations,
	actions
})

// 导出store
export default store
