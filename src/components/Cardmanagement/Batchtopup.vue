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
				background: #F5F5f5;
				padding: 20px;
				box-sizing: border-box;
				border-radius: 10px;
				margin-bottom: 20px;
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
				<Step title="选择套餐"></Step>
			</Steps>
		</div>
		<!-- 步骤内容板块 -->
		<div class="stepcontentbox">
			<div class="stepone" v-if="current==0">
				<h3>◆ 请在下面的框中输入开始绑定号/iccid和结束绑定号/iccid，单次最多500。</h3>
				<div class="grouplist">
					<div class="groupbox">
						<span>例如：1000000001-1000000002 如需充值一张，开始iccid和结束iccd一样 </span>
						<input type="text" placeholder="请输入开始ICCID">
					</div>
					<div class="groupbox">
						<span>例如：1000000001 </span>
						<input type="text" placeholder="请输入结束ICCID">
					</div>
				</div>
			</div>
			<div class="stepone" v-if="current==1">
				<Form :model="formLeft" label-position="left" :label-width="100">
					<FormItem label="是否预存" >
						<Select v-model="model1" style="width:200px">
							<Option v-for="item in preSale" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem> 
					<FormItem label="04联通套餐">
						<Input v-model="formLeft.input5" disabled="disabled"></Input>
					</FormItem>
					<!-- 查询时无请选择套餐 -->
					<FormItem label="请选择套餐" >
						<Select v-model="model6" style="width:200px">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem> 
				</Form>
				<!-- 查询时无充值按钮-->
				<div class="btnbox">
					<Button type="primary" style="margin:30px 100px;">确定充值</Button>
				</div>
			</div>
			
			<Button  v-if="current!=0"  type="primary" @click="prefun">上一步</Button>
			<Button  v-if="current!=1"  type="primary" @click="next">下一步</Button>

		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				current:0,
				tem_params:"",
				formLeft: {
                    input1: '1440244215192',
                    input2: '8986061911001512717',
                    input3: '已停用',
                    input4: '89720.50MB',
                    input6: '-89720.5MB',
                    input5: '04联通'
                },
				model1:0,
				preSale:[
                    {
                        value: '0',
                        label: '不预存'
                    },
                    {
                        value: '1',
                        label: '预存'
                    }
				],
				model6:'',
				cityList: [
                    {
                        value: '',
                        label: '请选择套餐'
                    },
                    {
                        value: '0',
                        label: '小山卡1G月包/1个月（4.20）'
                    },
                    {
                        value: '1',
                        label: '小山卡1G季度包/3个月（4.80）'
                    },
                    {
                        value: '2',
                        label: '小山卡2G月包/1个月（5.40）'
                    },
                    {
                        value: '3',
                        label: '小山卡1G半年包/6个月（5.40）'
                    },
                    {
                        value: '4',
                        label: '小山卡1G年包/12个月（6.00）'
                    }
                ],
			};
		},
		methods: {
			prefun(){
				if (this.current <=0) {
					this.current =0;
				} else {
					this.current -= 1;
				}
			},
			next() {
				if (this.current >= 1) {
					this.current = 0;
				} else {
					this.current += 1;
				}
			}
		},
        created(){
            console.log(this.$route.params)
            var tem_params = this.$route.params;
            this.tem_params = tem_params;
        }
	};
</script>
