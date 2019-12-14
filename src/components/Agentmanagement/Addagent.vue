<style scoped="scoped" lang="less">
	.addagentform{
        width: 400px !important;
        padding: 40px !important;
    }
    .ivu-form .ivu-form-item-label{
        text-align: left;
        font-size: 16px;
        line-height: 16px;
    }
</style>
<template>
	<div class="addagentbox">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80" class="addagentform">
            <FormItem label="登录账号" prop="loginAccount">
                <Input type="text" v-model="formCustom.loginAccount" />
            </FormItem>
            <FormItem label="密码" prop="passwd">
                <Input type="password" v-model="formCustom.passwd"/>
            </FormItem>
            <FormItem label="姓名" prop="name">
                <Input type="text" v-model="formCustom.name" />
            </FormItem>
            <FormItem label="手机号" prop="phonenumber">
                <Input type="text" v-model="formCustom.phonenumber" number/>
            </FormItem>
            <FormItem label="邮箱" prop="emails">
                <Input type="email" v-model="formCustom.emails" />
            </FormItem>
            <FormItem label="显示佣金">
                <Select v-model="model2" @on-change="onChagefun"  style="width:200px">
                    <Option v-for="item in showarr" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <!-- <FormItem label="状态">
                <Select v-model="model3" @on-change="onChagefun"  style="width:200px">
                    <Option v-for="item in showarr_1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem> -->
            <FormItem>
                <Button type="primary" @click="handleSubmit('formCustom')">确定</Button>
                <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
	</div>
</template>
<script>
    export default {
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            const validatename = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('姓名不可以为空'));
                }else {
                    callback();
                }
            };
            const validateAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('登录账号不可以为空'));
                }else {
                    callback();
                }
            };
			const validatePhonenumber = (rule, value, callback) => {
                if(!(/^1[3-578]\d{9}$/.test(value))){
                    return callback(new Error('请填写正确的手机号'));
                }else {
                    callback();
                }
			};
			const validateemail = (rule, value, callback) => {
			    if (!(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value))) {
			        return callback(new Error('请填写正确的邮箱格式'));
			    }else {
			        callback();
			    }
			};
            
            return {
                formCustom: {
                    passwd: '',
                    name: '',
                    loginAccount: '',
					phonenumber:'',
					emails:''
                },
                ruleCustom: {
                    passwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    name: [
                        { validator: validatename, trigger: 'blur' }
                    ],
                    loginAccount: [
                        { validator: validateAge, trigger: 'blur' }
                    ],
					phonenumber: [
                        { validator: validatePhonenumber, trigger: 'blur' }
                    ],
					emails: [
                        { validator: validateemail, trigger: 'blur' }
                    ],
                },
                model2:'0',
                showarr:[{
                    value:'1',
                    label:"显示"
                },{
                    value:'0',
                    label:"不显示"
                }],
                model3:'1',
                showarr_1:[{
                    value:'1',
                    label:"正常"
                },{
                    value:'0',
                    label:"禁用"
                }]
            }
        },
        methods: {
            onChagefun(){
                console.log(this.model2)
            },
            handleSubmit (name) {
                var that = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // this.$MessloginAccount.success('Success!');
                        var params = {};
                        params = {
                            id:'',//添加
                            loginAccount:this.formCustom.loginAccount,
                            password:this.formCustom.passwd,
                            userName:this.formCustom.name,
                            phoneNum:this.formCustom.phonenumber,
                            mailAddress:this.formCustom.emails,
                            show:this.model2,
                            parentId:'',//0表示一级代理
                            accountBalance:''//账户余额
                        }
                        that.$post('/user/addOrUpdate',params).then((data)=>{
                            console.log(data)
                            if(data.code == '500'){
                                that.$Message.error('请求失败,请稍后重试!');
                            }else if(data.code == '200'){
                                that.$Message.success('添加或修改成功！');
                                that.$router.push({path: '/Agentlist'});
                            }
                        })
                    } else {
                        this.$MessloginAccount.error('请填写正确信息!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },
        created(){
            console.log(this.$route.params)
            // this.formCustom.loginAccount = this.$store.state.loginAccount;
        },
        destroyed(){

        }
        
    }
</script>
