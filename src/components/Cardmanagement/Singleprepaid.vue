<style scoped="scoped" lang="less">
	.singlebox{
		padding: 20px;
		box-sizing: border-box;
		.searchinput{
			width: 100px;
		}
	}
</style>
<template>
    <div class="singlebox">
		<Col :xs="20" :sm="12" :md="12" :lg='8'>
			<Input v-model="iccid"  search enter-button="查询" placeholder="请输入绑定好号或ICCID" @on-search="topUpfun" @on-enter="topUpfun"/>
		</Col>
    </div>
</template>
<script>
    export default {
        data (){
			return {
				iccid:'',
			}
		},
		methods:{
			//充值
			topUpfun:function(){
				var that = this;
				if(this.iccid === ''){
					this.$Message.error('请填写所需要充值的ICCID！');
					return;
				}
				this.$router.push({
					name: '/Detail',
					params:{
						type:'dkcz',
						id:that.iccid.trim(),
					}
				});
			},
		}
    }
</script>
