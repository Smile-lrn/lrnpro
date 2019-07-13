// vuex的数据源 在页面可以通过this.$store.state.xx来获取值
const state = {
	name:'',//供应商或学校的名字
	account:'',//账号
	pass:'',//密码
	card:'',
	type:'',//身份 
	user_name:'',//名字
	logo:'',
	token:'',
	uploadurl:'http://xjyc.mumarenkj.com/phone/base/imgupload',//上传图片接口
}
// 导出state
export default state