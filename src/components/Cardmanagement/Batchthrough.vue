<style scoped="scoped" lang="less">
	.batchtopupbox{
		padding:20px;
		.topstepbox{
			p{
				display: flex;
				align-items: center;
				height: 60px;
				font-size: 18px;
				color: #333;
				font-weight: bold;
			}
			.ivu-steps-horizontal{
				height: 40px;
				margin-bottom: 20px;
				/deep/ .ivu-steps-main{
					display: inline-block;
				}
			}
		}
		.stepcontentbox{
			.stepone{
				display: flex;;
				flex-direction: column;
				color: #333;
				font-size: 14px;
				background:  #F5F5f5;
				padding: 20px;
				box-sizing: border-box;
				border-radius: 10px;
				margin-bottom: 20px;
				/deep/ .ivu-select-selection {
					height: 48px;
					display: flex;
					align-items: center;
					margin-right: 18px;
					margin-bottom: 20px;
					
					input {
						height: 48px;
					}
				}
				h3{
					height: 30px;
				}
				.grouplist{
					display: flex;
					justify-content: space-between;
					
				}
				.groupbox{
					display: flex;
					flex-direction: column;
					margin-bottom: 20px;
					width: 44%;
					span{
						width: 100%;
						display: block;
						margin-bottom: 10px;
						color: #F16643;
						height: 42px;
						
						// overflow: hidden;
						// height: 30px;
						// line-height: 30px;
						// text-overflow: ellipsis;
						// white-space: nowrap;
					}
					input{
						min-width: 150px;
						max-width: 100%;
						height: 40px;
						display: flex;
						align-items: center;
						padding: 5px 10px;
						box-sizing: border-box;
						border-radius: 6px;
						border: 1px solid #ccc;
					}
				}
			}
		}
	}
</style>
	
<template>
	<div class="batchtopupbox">
		<div class="topstepbox">
			<p>当前正在进行第 {{ current +1}} 步</p>
			<Steps :current="current" status="wait">
				<Step title="绑定号/iccid"></Step>
				<Step title="步骤2"></Step>
				<Step title="步骤3"></Step>
				<Step title="步骤4"></Step>
			</Steps>
		</div>
		<!-- 步骤内容板块 -->
		<div class="stepcontentbox">
			<div class="stepone" v-if="current==0">
				<h3>◆ 请在下面的框中输入开始绑定号/iccid和结束绑定号/iccid，单次最多500。</h3>
				<div class="grouplist">
					<div class="groupbox">
						<span>例如：1000000001-1000000002 如需划一张，开始iccid和结束iccd一样 </span>
						<input type="text" placeholder="请输入开始ICCID">
					</div>
					<div class="groupbox">
						<span>例如：1000000001 </span>
						<input type="text" placeholder="请输入结束ICCID">
					</div>
				</div>
				<Select v-model="model1" :label-in-value="labelinvalue" style="width:200px" @on-change="choosecategory">
					<Option style="text-align: left;" v-for="item in typelist1" :value="item.id" :key="item.user_name">{{ item.user_name }}</Option>
				</Select>
			</div>
			<div class="stepone" v-if="current==1">
				<h3>◆ 选择套餐</h3>
				<div class="grouplist">
					<div class="groupbox">
						<span>例如：1000000001-1000000002 如需划一张，开始iccid和结束iccd一样 </span>
						<input type="text" placeholder="请输入开始ICCID">
					</div>
					<div class="groupbox">
						<span>例如：1000000001 </span>
						<input type="text" placeholder="请输入结束ICCID">
					</div>
				</div>
			</div>
			<div class="stepone" v-if="current==2">
				<h3>◆ 步骤3</h3>
				<div class="grouplist">
					<div class="groupbox">
						<span>例如：1000000001-1000000002 如需划一张，开始iccid和结束iccd一样 </span>
						<input type="text" placeholder="请输入开始ICCID">
					</div>
					<div class="groupbox">
						<span>例如：1000000001 </span>
						<input type="text" placeholder="请输入结束ICCID">
					</div>
				</div>
			</div>
			<div class="stepone" v-if="current==3">
				<h3>◆ 步骤4</h3>
				<div class="grouplist">
					<div class="groupbox">
						<span>例如：1000000001-1000000002 如需划一张，开始iccid和结束iccd一样 </span>
						<input type="text" placeholder="请输入开始ICCID">
					</div>
					<div class="groupbox">
						<span>例如：1000000001 </span>
						<input type="text" placeholder="请输入结束ICCID">
					</div>
				</div>
			</div>
			<Button  v-if="current!=0"  type="primary" @click="prefun">上一步</Button>
			<Button  v-if="current!=3"  type="primary" @click="next">下一步</Button>

		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				current:0,
				labelinvalue:true,
				model1:'请选择代理商',
				typelist1:[
					{
					"id":'请选择代理商', //供货商id
					"user_name": "请选择代理商" //供货商名称
					},{
						"id":'1', //供货商id
						"user_name": "上级充值" //供货商名称
					},{
						"id":'2', //供货商id
						"user_name": "下级扣费" //供货商名称
					},{
						"id":'3', //供货商id
						"user_name": "后台充值套餐" //供货商名称
					},{
						"id":'4', //供货商id
						"user_name": "总后台扣除" //供货商名称
					},{
						"id":'5', //供货商id
						"user_name": "自动充值" //供货商名称
					}
				] ,
			};
		},
		methods: {
			// 选择类型
			choosecategory(val){
				console.log(val)
			},
			prefun(){
				if (this.current <=0) {
					this.current =0;
				} else {
					this.current -= 1;
				}
			},
			next() {
				if (this.current >= 3) {
					this.current = 0;
				} else {
					this.current += 1;
				}
			}
		}
	};
</script>
