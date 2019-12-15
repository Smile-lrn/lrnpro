// vuex的数据源 在页面可以通过this.$store.state.xx来获取值
const state = {
	"id": 1,
	"loginAccount": "",
	"cashOutPwd":'',
	"userName": "",
	"phoneNum": "",
	"mailAddress": "",
	"show": 0,
	"parentId": 0,
	"accountBalance": 0,
	"logo":'',
	"token":'',
	"uploadurl":'http://xjyc.mumarenkj.com/phone/base/imgupload',//上传图片接口
	"pageSize":1,
}
// 导出state
export default state