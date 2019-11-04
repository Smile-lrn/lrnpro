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
				<Select v-model="model2" @on-change="onChagefun"  style="width:200px">
					<Option v-for="item in yidongpickers" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Select v-model="model3" @on-change="onChagefun"  style="width:200px">
					<Option v-for="item in telecompickers" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Button type="primary" style="margin-right: 20px;" size="large" @click="exportData(1)">搜索</Button>
			</div>
		</div>
        <div class="setpricebox">
            <p>
               代理成本价格=终端价格*代理成本价格比例： <input type="number">
            </p>
        </div>
        <Table border ref="selection" :columns="columns4" :data="data1" >
			<template slot="operation" slot-scope="{ row,column, index }" >
				<span style="padding:5px 3px;background-color: #71d398;color:#fff;border-radius:4px;cursor:pointer;" @click="topUpfun(row,index)">充值</span>
				<span style="padding:5px 3px;background-color: #f4b162;color:#fff;border-radius:4px;cursor:pointer;" @click="getDetail(row,index)">套餐明细</span>
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
				model1:'请选择状态',
				iccid:'',
				starticcid:'',
				endiccid:'',
				detailFlag:false,
                model2:'0',
                model3:'10',
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
                		value: '10',
                		label: '蓝色'
                	},{
                		value: '20',
                		label: '红色'
					},
					{
                		value: '50',
                		label: '绿色'
					},
					{
                		value: '100',
                		label: '橙色'
                	}
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
                        changedmoney: '小伟',
						datetime:'0',
						types:'03联通B',
						iccid:'8986061911001512717',
						id:1,
                    },
                    {
                        money: '10.00',
                        remark: '04联通',
                        changedmoney: '贺阳',
                    	datetime:'1',
                    	types:'微信',
						id:2,
						iccid:'8986061911001512715',
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
			},
			//充值
			topUpfun:function(row,index){
				this.$router.push({
					name: '/Detail',
					params:{
						type:'cz'
					}
				});
			},
			// 套餐明细
			getDetail:function(row,index){
				this.detailFlag = true;
			},
			// 关闭弹窗
			closeDetail:function(row,index){
				this.detailFlag = false;
			},
		},
		
    }
</script>
