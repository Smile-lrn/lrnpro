<style scoped="scoped" lang="less">
	.addagentbox{
		padding: 20px;
	}
</style>
<template>
	<div class="addagentbox">
		<Col class="formbox" :xs="20" :sm="2" :md="12" :lg='8' >
			<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
				<FormItem label="登录账号" prop="accountnumber">
					<Input type="text" v-model="formCustom.accountnumber" ></Input>
				</FormItem>
				<FormItem label="密码" prop="passwd">
					<Input type="password" v-model="formCustom.passwd"></Input>
				</FormItem>
				<FormItem label="姓名" prop="name">
					<Input type="text" v-model="formCustom.name"></Input>
				</FormItem>
				<FormItem label="手机号" prop="phonenumber">
					<Input type="text" v-model="formCustom.phonenumber" number></Input>
				</FormItem>
				<FormItem label="邮箱" prop="emails">
					<Input type="email" v-model="formCustom.emails" ></Input>
				</FormItem>
                <FormItem label="显示佣金">
					<Select v-model="model2" @on-change="onChagefun"  style="width:200px">
                        <Option v-for="item in showarr" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
				</FormItem>
                <FormItem label="状态">
                    <Select v-model="model3" @on-change="onChagefun"  style="width:200px">
                        <Option v-for="item in showarr_1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
				</FormItem>
				<FormItem>
					<Button type="primary" @click="handleSubmit('formCustom')">确定</Button>
					<Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
				</FormItem>
			</Form>
		</Col>
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
                    callback(new Error('姓名不可以为空哟~'));
                }else {
                    callback();
                }
            };
            const validateAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('登录账号不可以为空哟~'));
                }else {
                    callback();
                }
            };
			const validatePhonenumber = (rule, value, callback) => {
			    if (!value) {
			        return callback(new Error('手机号不可以为空哟~'));
			    }else {
                    callback();
                }
			};
			const validateemail = (rule, value, callback) => {
			    if (!value) {
			        return callback(new Error('邮箱不可以为空哟~'));
			    }else {
			        callback();
			    }
			};
            
            return {
                formCustom: {
                    passwd: '',
                    name: '',
                    accountnumber: '',
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
                    accountnumber: [
                        { validator: validateAge, trigger: 'blur' }
                    ],
					phonenumber: [
                        { validator: validatePhonenumber, trigger: 'blur' }
                    ],
					emails: [
                        { validator: validateemail, trigger: 'blur' }
                    ],
                },
                model2:'1',
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
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Messaccountnumber.success('Success!');
                    } else {
                        this.$Messaccountnumber.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
