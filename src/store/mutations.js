import state from './state.js'   //导入vuex数据源


const mutations = {
	// 退出登录
	logout: state => {
	  state.name=state.name+"成功退出登录"
	},
	// 设置用户登陆信息
	setuserinfo: (state,val) => {
	  state.card=val.card
		state.type=val.type
		state.user_name=val.user_name
		state.logo = val.logo
		state.token = val.token
		state.serial = val.serial
	},
}
// 导出state
export default mutations
