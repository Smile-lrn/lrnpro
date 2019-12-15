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
    <Form :model="formItem" :label-width="80" class="addagentform">
		<FormItem label="当前金额¥ ">
            <Input v-model="money"  disabled="disabled" />
        </FormItem>
        <FormItem label="提现金额¥ ">
            <Input v-model="cashOutAmount" placeholder="请输入提现金额" @blur="moneyFun"/>
        </FormItem>
        <FormItem label="收款类型">
            <Select v-model="alipayMethod">
                <Option value="alipay">支付宝</Option>
            </Select>
        </FormItem>
		<FormItem label="支付宝账户">
            <Input v-model="alipayAccount" placeholder="请输入支付宝账号" />
        </FormItem>
		<FormItem label="支付宝真实姓名">
            <Input v-model="alipayName" placeholder="请输入支付宝真实姓名" />
        </FormItem>
		<!-- <FormItem label="提现密码">
            <Input v-model="formItem.input" placeholder="请输入提现密码" />
        </FormItem> -->
        <FormItem>
            <Button type="primary" @click="withDraw">提现</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            return {
                money:'50.30',
                alipayMethod:'alipay',
				cashOutAmount:'',
				alipayAccount:'',
				alipayName:'',
                formItem: {
                    input: '',
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    textarea: ''
                }
            }
		},
		methods:{
            moneyFun(){
                /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test()
            },
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
		}
    }
</script>
