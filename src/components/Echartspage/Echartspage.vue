<style scoped="scoped" lang="less">
	.addagentform{
        padding: 40px !important;
    }
    /deep/.ivu-form-item-label{
        text-align: left;
    }
    /deep/.ivu-input,/deep/.ivu-select-single,/deep/.ivu-select-selection,/deep/.ivu-select-selected-value{
        width: 260px;
    }
</style>
<template>
    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="84" class="addagentform">
        <FormItem label="注 意 ">
            <span>每月最多提现3次，固定5号、15号、25号审核，9:00截止(遇节假日顺延)，单笔100的倍数。</span>
        </FormItem>
		<FormItem label="剩余次数 ">
            <Input v-model="count"  disabled="disabled" />
        </FormItem>
        <FormItem label="当前金额¥">
            <Input v-model="balance"  disabled="disabled" />
        </FormItem>
        <FormItem label="提现金额¥"  prop="cashOutAmount">
            <Input v-model="formCustom.cashOutAmount" placeholder="请输入提现金额" />
        </FormItem>
        <FormItem label="收款类型">
            <Select v-model="alipayMethod">
                <Option value="alipay">支付宝</Option>
            </Select>
        </FormItem>
		<FormItem label="支付宝账户" prop="alipayAccount">
            <Input v-model="formCustom.alipayAccount" placeholder="请输入支付宝账号" />
        </FormItem>
		<FormItem label="支付宝真实姓名" prop="alipayName">
            <Input v-model="formCustom.alipayName" placeholder="请输入支付宝真实姓名" />
        </FormItem>
		<FormItem label="提现密码" prop="cashOutPassword">
            <Input v-model="formCustom.cashOutPassword" placeholder="请输入提现密码" />
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">提现</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            const validateAlipayAccount = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('支付宝账号不可以为空'));
                } else {
                    callback();
                }
            };
            const validateAlipayName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('支付宝姓名不可以为空'));
                } else {
                    callback();
                }
            };
            const validateCashOutAmount = (rule, value, callback) => {
                if (!(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value))) {
                    callback(new Error('请填写正确的金额,限两位小数'));
                }else if(Number(value) === 0){
                    callback(new Error('请填写大于0的正整数'));
                }  else {
                    callback();
                }
            };
            const validateCashOutPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('提现密码不可以为空'));
                }  else {
                    callback();
                }
            };
            return {
                balance:'',
                count:'',       
                alipayMethod:'alipay',
                money:'',
                formCustom: {
					cashOutAmount:'',
                    alipayAccount:'',
                    alipayName:'',
                    cashOutPassword:'',
                },
                ruleCustom: {
                    alipayAccount: [
                        { validator:validateAlipayAccount , trigger: 'blur' }
                    ],
                    cashOutAmount: [
                        { validator:validateCashOutAmount , trigger: 'blur' }
                    ],
                    alipayName: [
                        { validator:validateAlipayName , trigger: 'blur' }
                    ],
                    cashOutPassword: [
                        { validator:validateCashOutPassword , trigger: 'blur' }
                    ],
                }
            }
		},
		methods:{
            moneyFun(){
                if(!(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(this.cashOutAmount))){
                    this.$Message.error('请输入正确的金额！')
                }else{
                    this.money = this.cashOutAmount*100;
                }
            },
            // 初始化
            getInitData(){
                this.$fetch('/cashOut/queryCountMonth',{
                })
				.then((data)=>{
                    if(data.code==200){
                        this.balance = data.balance;
                        this.count = data.count;
                    }else{
                        this.$$Message.error('数据请求失败！')
                    }
				})
            },
            handleSubmit (name) {
				var that = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
						console.log(this.formCustom)
						let params = this.formCustom;
						this.$fetch('/cashOut/withdraw',params).then((data)=>{
                            console.log(data)
                            if(data.code == '500'){
                                that.$Message.error('提现申请请求失败,请稍后重试!');
                            }else if(data.code == '200'){
                                that.$Message.success('提现申请成功!');
                                that.$router.push({path: '/WithdrawalRecord', replace: true});
                            }else if(data.code == '501'){
                                that.$Message.error('提现金额需要为大于0的正整数!');
                            }else if(data.code == '502'){
                                that.$Message.error('提现金额要小于当前可提现余额!');
                            }else if(data.code == '505'){
                                that.$Message.error('提现密码错误，请重新输入!');
                            }else{
								// 0.请求成功 1.账号不存在 2.密码错误 3.验证码错误 4.系统出错
								that.$Message.error(data.message);
							}
						});
					} else {
						that.$Message.error('请填写正确的信息！');
					}
				})
            },
            // 提现
			withDraw(){
				var that = this;
				var params ={};
				params={
					cashOutAmount:this.cashOutAmount,
					alipayAccount:this.alipayAccount,
					alipayName:this.alipayName,
				}
				that.$post('/cashOut/withdraw',params).then((data)=>{
					console.log(data)
					if(data.code == '500'){
						that.$Message.error('请求失败,请稍后重试!');
					}else if(data.code == '200'){
						that.$Message.success('提现申请成功！');
					}
				})
			}
        },
        created(){
            this.getInitData()
        }
    }
</script>
