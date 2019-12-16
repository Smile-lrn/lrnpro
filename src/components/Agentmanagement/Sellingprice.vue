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
		.setpricebox{
			p{
				height: 40px;
				text-align: right;
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
		<Table :columns="columns" :data="data"> 
			<template slot-scope="{ row, index }" slot="apiName">
				<span>{{row.apiName}}</span>
			</template>
            <template slot-scope="{ row, index }" slot="package">
				<span>{{row.package}}</span>
			</template>
            <template slot-scope="{ row, index }" slot="periodTimeStr">
				<span>{{row.periodTimeStr}}</span>
			</template>
            <template slot-scope="{ row, index }" slot="costPriceDecimal">
				<span>{{row.costPriceDecimal}}</span>
			</template>
            <template slot-scope="{ row, index }" slot="agentCostPriceDecimal" >
                <Input type="text" v-model="row.agentCostPriceDecimal" @on-change="changePrice(row,index)"/>
			</template>
			<template slot-scope="{ row, index }" slot="terminalPriceDecimal" >
                <Input type="text" v-model="row.terminalPriceDecimal" @on-change="changePrice(row,index)"/>
			</template>
            <template slot-scope="{ row, index }" slot="action">
				<Button @click="handleSave(row,index)">保存</Button>
			</template> 
			<!-- <template slot-scope="{ row, index }" slot="AutomaticPrice" >
                <div v-if="(editIndex === index ) || bacthUpdateFlag" >
				    <Input type="text" v-model="row.AutomaticPrice" />
                </div>
                <div v-else>
                    <span>{{row.AutomaticPrice}}</span>
                </div>
			</template>
			<template slot-scope="{ row, index }" slot="action" v-if="!bacthUpdateFlag">
			<div v-if="editIndex === index">
				<Button @click="handleSave(row,index)">保存</Button>
				<Button @click="editIndex = -1">取消</Button>
			</div>
			<div v-else>
				<Button @click="handleEdit(row, index)">操作</Button>
			</div>
			</template> -->
		</Table>
		<Page :total="totalNum" :page-size="size" show-elevator @on-change="setPage"/>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                selection:[],//选中项
                batchName:'批量修改',
                bacthUpdateFlag:false,
				labelinvalue:true,
				money:'',
				model1:'请选择状态',
				iccid:'',
				starticcid:'',
				endiccid:'',
				detailFlag:false,
                model2:'0',
				totalNum:0,
				page:1,
				size:this.$store.state.pageSize,
				yidongpickers: [
				],
				data:[],
				columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
					{
						title: 'API',
						slot: 'apiName'
					},
					{
						title: '套餐',
						slot: 'package'
					},
					{
						title: '有效期',
						slot: 'periodTimeStr'
					},
					{
						title: '我的成本价格',
						slot: 'costPriceDecimal'
					},
					{
						title: '代理本价格',
						slot: 'agentCostPriceDecimal'
					},
					{

						title: '终端价格',
						slot: 'terminalPriceDecimal'
					},
					{
						title: '操作',
						slot: 'action'
					}
					],
					data: [{
                        id:'1',
                        apiId:'1',
                        apiName:'02联通',
                        package:'500M',
                        periodTimeStr:'1个月',
                        costPriceDecimal:'5.25',
						agentCostPriceDecimal:'7.04',
						terminalPriceDecimal:'8.04',
                        color:'red',
                    },{
                        id:'2',
                        apiId:'2',
                        apiName:'01联通',
                        package:'1500M',
                        periodTimeStr:'3个月',
                        costPriceDecimal:'5.25',
						agentCostPriceDecimal:'7.04',
						terminalPriceDecimal:'8.04',
                        color:'green',
                    },{
                        id:'3',
                        apiId:'3',
                        apiName:'04联通',
                        package:'600M',
                        periodTimeStr:'1个月',
                        costPriceDecimal:'5.25',
						agentCostPriceDecimal:'7.04',
						terminalPriceDecimal:'8.04',
                        color:'red',
                    }],
					editIndex: -1,  // 当前聚焦的输入框的行数
					editName: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
            }
        },
        methods: {
            // 输入框更改
            changePrice(row,index){
                this.data[index].AutomaticPrice = row.AutomaticPrice;
            },
            // 选中某一行
            onSelectFun(selection,row){
                // selection 已选项,row刚选择的项
                this.selection = selection;
            },
            // 选中某一行
            onCancelfun(selection,row){
                // selection 已选项,row刚取消的项
                this.selection = selection;
            },
            handleSelectAll(){
                if(this.selection.length==0){
                    this.$Message.error('请选择需要保存的项！')
                }else{
                    this.saveData(this.selection)
                }
            },
            // 保存数据
            saveData(params){
                console.log(params)
            },
            // 批量修改
            // bacthUpdate(){
            //     this.bacthUpdateFlag = !this.bacthUpdateFlag;
            //     if(bacthUpdateFlag){
            //         this.batchName='取消修改'
            //     }else{
            //         this.batchName='批量修改'
            //     }
            // },
            // 设置页码
			setPage(page){
				console.log(page)
				this.page = page;
				this.getList();
            },
            // 获取查询列表
			getList(){
                var that = this;
				this.$fetch('',{
                    apiId:this.model2
                })
				.then(function(data){
					that.totalNum = data.total;
					console.log(that.totalNum)
					// 对金额做处理
					// data.list
					that.data = data.list;
				})
			},
			// 查询
			searchFun(){
				this.getList(this.getParams())
			},
			onChagefun(){},
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
			handleEdit (row, index) {
				this.editName = row.name;
				this.editIndex = index;
			},
			handleSave (row,index) {
                this.data[index].AutomaticPrice = row.AutomaticPrice;
                this.saveData([row])
				this.editIndex = -1;
			},
			getBirthday (birthday) {
				const date = new Date(parseInt(birthday));
				const year = date.getFullYear();
				const month = date.getMonth() + 1;
				const day = date.getDate();
				return `${year}-${month}-${day}`;
            },
            // 获取api下拉列表
            getApiList(){
                this.$fetch('', {}).then((data)=>{
                    console.log(data)
                    this.yidongpickers = data;
                })
            }
		},
		
    }
</script>
