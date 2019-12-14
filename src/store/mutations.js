import state from './state.js'   //导入vuex数据源


const mutations = {
	// 退出登录
	logout: state => {
	  state.name=state.name+"成功退出登录"
	},
	// 设置用户登陆信息
	setuserinfo: (state,val) => {
	  	state.loginAccount=val.loginAccount;
		state.userName=val.userName;
		state.phoneNum=val.phoneNum;
		state.mailAddress = val.mailAddress;
		state.accountBalance = val.accountBalance;
	},
	// 设置token
	setToken:(state,val) => {
		state.token = val.token;
	},
	// 设置密码
	setcashOutPwd:(state,val)=>{
		state.cashOutPwd = val;
	},
}
// 导出state
export default mutations
