<style scoped="scoped" lang="less">
	.balancebox {
		padding: 20px;
		box-sizing: border-box;
	
		.searchbox {
			/deep/ .ivu-btn-primary {
				height: 48px !important;
				margin-bottom: 20px;
			}
	
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
	
			/deep/ .ivu-input-suffix {
				height: 48px !important;
				display: flex;
				align-items: center;
			}
	
			/deep/ .ivu-date-picker {
				margin-right: 20px;
				margin-bottom: 20px;
			}
	
			/deep/ .ivu-input-wrapper {
				height: 48px;
				outline-style: none;
				margin-right: 20px;
	
				input {
					height: 100%;
					margin-bottom: 30px;
				}
			}
	
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-items: center;
	
			.lmbxo {
				// margin-bottom: 30px;
				display: flex;
				flex-wrap: wrap;
			}
	
			input {
				border: none;
				outline-style: none;
				height: 48px;
				flex: 1;
				margin-right: 20px;
				border-radius: 6px;
				border: 1px solid #dcdee2;
				padding: 0 10px;
				margin-bottom: 20px;
			}
	
			span {
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				width: 64px;
				height: 48px;
				background: rgba(84, 181, 116, 1);
				border-radius: 6px;
				margin-right: 50px;
			}
	
			.timebox {
				float: right;
				margin-bottom: 30px;
				max-width: 404px;
				height: 40px;
				padding: 0 10px;
				box-sizing: border-box;
				background: rgba(248, 176, 47, 1);
				border-radius: 20px;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
			}
		}
	}
	
</style>
<template>
    <div class="balancebox">
		<div class="searchbox">
			<div class="lmbxo">
				
				<input type="text" v-model="iccid" placeholder="请输入iccid">
				<input type="text" v-model="starticcid" placeholder="请输入开始iccid">
				<input type="text" v-model="endiccid" placeholder="请输入结束iccid">
				<input type="text" v-model="endiccid" placeholder="请输入当前套餐已使用(MB)">
				<input type="text" v-model="endiccid" placeholder="请输入<当前套餐已使用(MB)">
				



					<Select v-model="model1" :label-in-value="labelinvalue" style="width:200px" @on-change="choosecategory">
						<Option style="text-align: left;" v-for="item in typelist1" :value="item.id" :key="item.user_name">{{ item.user_name }}</Option>
					</Select>
					<Select v-model="model2" @on-change="onChagefun"  style="width:200px">
						<Option v-for="item in yidongpickers" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
					<Select v-model="model3" @on-change="onChagefun"  style="width:200px">
						<Option v-for="item in telecompickers" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
					<Button type="primary" style="margin-right: 20px;" size="large" @click="exportData(1)">搜索</Button>
					<Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon>导出数据</Button>
			</div>
		</div>
        <Table border ref="selection" :columns="columns4" :data="data1" >
			<template slot="operation" slot-scope="{ row,column, index }">
				<span>查看</span>
			</template>
		</Table>
		<Page :total="100" show-elevator />
    </div>
</template>
<script>
	
    export default {
        data () {
            return {
				labelinvalue:true,
				money:'',
				model1:'请选择类型',
				iccid:'',
				starticcid:'',
				endiccid:'',
				typelist1:[
					{
					"id":'请选择类型', //供货商id
					"user_name": "请选择类型" //供货商名称
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
                model2:'0',
                model3:'5',
				yidongpickers: [
                	{
                		value: '0',
                		label: 'api'
                	},
                	{
                		value: '38',
                		label: '移动02'
                	},
                ],
                telecompickers: [
                	{
                		value: '5',
                		label: '每页条数'
                	},
                	{
                		value: '10',
                		label: '10'
                	},
                ],
				columns4: [
					// 	所属代理	当前套餐已使用(MB)	状态	备注	api	操作
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'iccid',
                        key: 'iccid'
                    },
					
					{
					    title: '所属代理',
					    key: 'changedmoney'
					},
                    {
                        title: '当前套餐已使用(MB)',
                        key: 'datetime'
                    },
                    {
                        title: '状态',
                        key: 'types'
                    },
					
					{
					    title: '备注',
					    key: 'remark',
						tooltip:true
					},
					{
					    title: 'api',
					    key: 'api'
					},
					
					{
					    title: '操作',
					    slot: 'operation'
					}
                ],
                data1: [
                    {
                        money: '50.00',
                        remark: '充值话费50元，优惠2元充值话费50元，优惠2元充值话费50元，优惠2元',
                        changedmoney: '48.00',
						datetime:'2019-07-01',
						types:'支付宝',
						id:1,
                    },
                    {
                        money: '10.00',
                        remark: '充值话费2元，优惠8元',
                        changedmoney: '2.00',
                    	datetime:'2019-07-05',
                    	types:'微信',
                    	id:2,
                    }
                ]
            }
        },
        methods: {
			onChagefun(){},
			// 选择类型
			choosecategory(val){
				console.log(val)
			},
			// 选择日期
			choosedate(dateobj){
				console.log(dateobj)
			},
			// 全选
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            },
			// 导出表格数据
			exportData (type) {
                if (type === 1) {
                    this.$refs.selection.exportCsv({
                        filename: 'The original data'
                    });
                } else if (type === 2) {
                    this.$refs.selection.exportCsv({
                        filename: 'Sorting and filtering data',
                        original: false
                    });
                } else if (type === 3) {
                    this.$refs.selection.exportCsv({
                        filename: 'Custom data',
                        columns: this.columns8.filter((col, index) => index < 4),
                        data: this.data7.filter((data, index) => index < 4)
                    });
                }
            }      
        }
    }
</script>
