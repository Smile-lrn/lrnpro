import state from './state.js'   //导入vuex数据源
const getters = {
	testname: state => {
	  return state.name+'我测试下getters'
	}
}
// 导出state
export default getters