<style scoped="scoped" lang="less">
	.container{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.loginbg{
		position: fixed; 
		 top: 0;
		 left: 0;
		right: 0px;  
		bottom: 0px;  
		min-width: 100%;  
		min-height: 100%; 
		height: auto;  
		width: 100%;  
		background: url(../../static/0.png) no-repeat;
		background-size: cover;
		/* 加滤镜 */
		/* //背景模糊设置 */
		filter: blur(10px); 
		 /* //背景灰度设置  */
		-webkit-filter: grayscale(100%);  
		filter:grayscale(100%);
	}
	.formbox{
		background: rgba(0,0,0,.6);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 24px 0;
		padding-bottom: 0;
		border-radius: 10px;
		/deep/ .ivu-input-group-append{
			padding: 0;
			overflow: hidden;
			border: none;
			height: 32px;
		}
		.appendimgbox{
			width: 80px;
			display: flex;
			align-items: center;
			img{
				width: 100%;
				height: 32px;
			}
		}
		.logintitle{
			width: 100%;
			height: 40px;
			color: #fff;
			font-size: 18px;
			text-align: center;
		}
		.ivu-form{
			width: 80%;
			/deep/ .ivu-form-item-label{
				color: #fff;
			}
		}
	}
</style>
<template>
	 <Row class="container">
		<div class="loginbg"></div>
        <Col class="formbox" :xs="20" :sm="12" :md="12" :lg='8' >
			<div class="logintitle">登录某某互联网平台</div>
			<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="48">
			    <FormItem label="账 号" prop="account">
			        <Input type="text" v-model="formCustom.account" />
			    </FormItem>
			    <FormItem label="密 码" prop="password">
			        <Input type="password" v-model="formCustom.password" />
			    </FormItem>
			    <!-- <FormItem label="验证码" prop="age">
			        <Input type="text" v-model="formCustom.age" number>
						 <div slot="append" class="appendimgbox">
							 <img src="https://dl.lym2m.cn/public/verify?0.9916101715339238&random=0.9526005221504152&random=0.9619436271886317&random=0.17946752344834715&random=0.045428342459822524&random=0.2555581791130701&random=0.35478816814937186&random=0.49538068745397945&random=0.7811739884869227" alt="">
						 </div>
					 </Input>
			    </FormItem> -->
			    <FormItem>
			        <Button type="primary" @click="handleSubmit('formCustom')">登录</Button>
			        <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
			    </FormItem>
			</Form>
		</Col>
    </Row>
</template>
<script>
    export default {
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不可以为空'));
                } else {
                    callback();
                }
            };
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('账号不可以为空'));
                }  else {
                    callback();
                }
            };
            // const validateAge = (rule, value, callback) => {
            //     if (!value) {
            //         return callback(new Error('请填写正确的验证码'));
            //     }else{
			// 		callback()
			// 	}
            // };
            
            return {
                formCustom: {
					account:'',
                    passwd: '',
                    age: ''
                },
                ruleCustom: {
                    account: [
                        { validator:validateName , trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
			// 登录
            handleSubmit (name) {
				var that = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
						console.log(this.formCustom)
						let params = this.formCustom;
						this.$fetch('login',{
							phoneNum:params.account,
							password:params.password
						},true).then((data)=>{
							// console.log(data)
							if(data.status === 0){
								that.$Message.success('登陆成功！');
								sessionStorage.setItem('temobj',JSON.stringify(data.userInfo));
								sessionStorage.setItem('token',data.token);
								// vuex设置用户信息
								that.$store.commit('setuserinfo',data.userInfo);
								that.$store.commit('setToken',data.token);
								that.$router.push({
									path:'/Overview'
								})
							}else{
								// 0.请求成功 1.账号不存在 2.密码错误 3.验证码错误 4.系统出错
								that.$Message.error(data.message);
							}
						});
					} else {
						that.$Message.error('请填写正确的登陆信息！');
					}
				})
            },
			// 重置
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
