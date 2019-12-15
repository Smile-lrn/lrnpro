<style scoped="scoped" lang="less">
.formBox{
    width: 400px;
    padding-top: 40px;
}
</style>
<template>
    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80" class="formBox">
        <FormItem label="账号" >
            <Input type="text" v-model="formCustom.phoneNum" disabled="disabled" />
        </FormItem>
        <FormItem label="旧密码">
            <Input type="password" v-model="formCustom.cashOutPwd"  disabled="disabled"/>
        </FormItem>
        <FormItem label="新密码" prop="passwd">
            <Input type="password" v-model="formCustom.passwd"  placeholder="建议5-16个字符"/>
        </FormItem>
        <FormItem label="确认密码" prop="passwdCheck">
            <Input type="password" v-model="formCustom.passwdCheck" placeholder="请再输入一遍新密码，两次密码需保持一致"/>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">修改</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('新密码不可以为空！'));
                }else if(value.length<5||value.length>16){
                    callback(new Error('新密码的位数需在5-16个字符之间！'));
                }else {
                    if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('确认密码不可以为空！'));
                } else if (value !== this.formCustom.passwd) {
                    callback(new Error('两次密码输入不一致，请重新输入'));
                } else {
                    callback();
                }
            };
            
            
            return {
                formCustom: {
                    phoneNum:this.$store.state.loginAccount,
                    cashOutPwd:sessionStorage.getItem('cashOutPwd'),
                    passwd: '',
                    passwdCheck: '',
                },
                ruleCustom: {
                    passwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            handleSubmit (name) {
                var that = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // this.$Message.success('Success!');
                        var params = {};
                        params = {
                            password:this.formCustom.cashOutPwd,//就密码
                            cashOutPwd:'',//二级密码
                            changePwd:this.formCustom.passwd,//新密码
                        };
                        that.$fetch('/user/changePwd', params).then((data)=>{
                            console.log(data)
                            if(data.code == '500'){
                                that.$Message.error('修改密码请求失败,请稍后重试!');
                            }else if(data.code == '200'){
                                that.$Message.success('密码修改成功，请重新登录!');
                                that.$router.push({path: '/login', replace: true});
                                sessionStorage.clear();
                            }else if(data.code == '501'){
                                that.$Message.error('登陆密码错误,修改失败!');
                            }else if(data.code == '502'){
                                that.$Message.error('提现密码错误,修改失败!');
                            }else if(data.code == '503'){
                                that.$Message.error('更改密码为空,修改失败!');
                            }
                        })
                    } else {
                        this.$Message.error('请填写正确的信息!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
