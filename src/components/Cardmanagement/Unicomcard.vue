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
		.detailBox{
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			background: rgba(0, 0, 0, .6);
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 999999;
			.detailItem{
				width: 60%;
				height: 400px;
				background: #fff;
				border-radius: 10px;
				padding: 30px;
				p{
					font-size: 18px;
					display: flex;
					justify-content: space-between;
					span.right{
						border-radius: 50%;
						width: 30px;
						height: 30px;
						display: flex;
						justify-content: center;
						cursor: pointer;
					}
				}
				>div{
					height: 340px;
					overflow-y: scroll;
				}
				/deep/ table{
					width: 100%;
					th,td{
						width: 25%;
						height: 40px;
						text-align: center;
						border-bottom: 1px solid #ebebeb !important;
					}

					th{
						border-bottom:2px solid #ebebeb; 
					}
				}
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
				<input type="text" v-model="allowance" placeholder="请输入当前套餐已使用(MB)">
				<input type="text" v-model="lessAllowance" placeholder="请输入<当前套餐已使用(MB)">
				<Select v-model="model1" placeholder="请选择状态" :label-in-value="labelinvalue" style="width:200px" @on-change="choosecategory">
					<Option style="text-align: left;" v-for="item in typelist1" :value="item.id" :key="item.user_name">{{ item.user_name }}</Option>
				</Select>
				<Select v-model="model2" placeholder="请选择apiName" @on-change="onChagefun"  style="width:200px">
					<Option v-for="item in yidongpickers" :value="item.id" :key="item.id">{{ item.apiName }}</Option>
				</Select>
				<!-- <Select v-model="model3" @on-change="onChagefun"  style="width:200px">
					<Option v-for="item in telecompickers" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select> -->
				<Select v-model="province" placeholder="请选择省份" @on-change="selectProvince" style="width:150px;">
					<Option v-for="item in provinceArr" :key="item.label" :value="item.label" >{{ item.label}}</Option>
				</Select>
				<Button type="primary" style="margin-right: 20px;" size="large" @click="searchFun">搜索</Button>
				<Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon>导出数据</Button>
			</div>
		</div>
        <Table border ref="selection" :columns="columns4" :data="data1" >
			<template slot="operation" slot-scope="{ row,column, index }" >
				<span style="padding:5px 3px;background-color: #71d398;color:#fff;border-radius:4px;cursor:pointer;" @click="topUpfun(row,index)">充值</span>
				<span style="padding:5px 3px;background-color: #f4b162;color:#fff;border-radius:4px;cursor:pointer;" @click="getDetail(row,index)">套餐明细</span>
			</template>
		</Table>
		<Page :total="totalNum" :page-size="size" show-elevator @on-change="setPage"/>
		<div class="detailBox" v-if="detailFlag">
			<div class="detailItem">
				<p class="detailtile">
					<span>套餐列表</span>
					<span class="right" @click="closeDetail">X</span>
				</p>
				<hr>baidu
				<div>
					<table>
						<thead>
							<tr>
								<th>订购时间</th>
								<th>套餐</th>
								<th>期间使用流量</th>
								<th>有效期</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in detailList" :key="index">
								<td>2019-10-01</td>
								<td>1GB</td>
								<td>100MB</td>
								<td>2019-12-01</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
    </div>
</template>
<script>
	import provinceArr from '../../assets/js/province';
    export default {
        data () {
            return {
				pageSizeOpts:[1,10,20,50,100],
				province:'',
				provinceArr:[],
				labelinvalue:true,
				money:'',
				model1:'',
				iccid:'',
				starticcid:'',
				endiccid:'',
				detailFlag:false,
				lessAllowance:'',
				allowance:'',
				totalNum:0,
				page:1,
				size:this.$store.state.pageSize,
				typelist1:[
					{
					"id":'请选择状态', 
					"user_name": "请选择状态" 
					},{
						"id":'1', 
						"user_name": "正常使用" 
					},{
						"id":'3', 
						"user_name": "停用" 
					},{
						"id":'2', 
						"user_name": "库存" 
					}
				] ,
                model2:'',
                model3:'10',
				yidongpickers: [
                ],
                telecompickers: [
                	{
                		value: '10',
                		label: '每页展示条数10'
                	},{
                		value: '20',
                		label: '每页展示条数20'
					},
					{
                		value: '50',
                		label: '每页展示条数50'
					},
					{
                		value: '100',
                		label: '每页展示条数100'
                	},{
                		value: '200',
                		label: '每页展示条数200'
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
					    key: 'belongUser'
					},
                    // {
                    //     title: '当前套餐已使用(MB)',
                    //     key: 'allowance'
					// },
					{
                        title: '套餐余量(MB)',
                        key: 'allowance'
                    },
                    {
                        title: '状态',
                        key: 'statustxt'
                    },
					{
					    title: 'api名称',
					    key: 'apiName'
					},
					{
					    title: '地区',
					    key: 'area'
					},
					{
					    title: '操作',
					    slot: 'operation'
					}
                ],
                data1: [
				],
				detailList:[],
            }
        },
        methods: {
			// 设置页码
			setPage(page){
				console.log(page)
				this.page = page;
				this.getList(this.getParams());
			},
			// 获取api列表
			getapiList(){
				var that = this;
				var params = {
					type:1,
				}
				this.$fetch('/api/queryByType',params)
				.then(function(data){
					that.yidongpickers = data;
				})
			},
			//  套餐明细
            queryByList:(params)=>{
                this.$fetch('/api/queryByType',params)
				.then((data)=>{
					this.detailList = data;
					this.detailFlag = true;
					
                })
            },
			// 获取查询参数
			getParams(){
				var params = {};
				params = {
					type:1,	//是	int	1联通卡 2移动卡 3 电信卡
					page:this.page,	//否	int	当前页码 不写默认为0
					size:this.size,	//否	int	每页数量 不写默认为10
					iccid:this.iccid,	//否	string	iccid
					beginIccid:this.starticcid,	//否	string	开始iccid
					endIccid:this.endiccid,	//否	string	结束iccid
					allowance:this.allowance,	//否	long	套餐余量，查询是需要乘100
					lessAllowance:this.lessAllowance,	//否	long	小于套餐余量，查询是需要乘100
					apiId:this.model2,	//否	int	Api的对应id
					status:this.model1,
					area:this.province=='全国'?'':this.province,
				}
				return params;
			},
			// 获取列表
			getList(params){
				var that = this;
				this.$fetch('/cardManage/queryByPage',params)
				.then(function(data){
					data.list.forEach(function(element,index){
						element.createTime = that.filterDate(element.createTime)
						element.type = that.filterType(element.type)
						element.allowance = element.allowance/100;
						element.allowanceDecimal = element.allowanceDecimal/100;
						if(element.status==1){
							element.statustxt = '正常使用'
						}else if(element.status==2){
							element.statustxt = '库存'
						}else if(element.status==3){
							element.statustxt = '停用'
						}
					})
					that.totalNum = data.total;
					console.log(that.totalNum)
					// 对金额做处理
					// data.list
					that.data1 = data.list;
				})
			},
			// 查询
			searchFun(){
				this.getList(this.getParams())
			},
			onChagefun(){},
			// 选择类型
			choosecategory(val){
				console.log(val)
			},
			selectProvince(val){
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
						type:'cz',
						// defaultData:JSON.stringify(row),
					}
				});
				sessionStorage.setItem('defaultData',JSON.stringify(row));
			},
			// 套餐明细
			getDetail:function(row,index){
				this.queryByList({
					apiId:row.apiId
				});
			},
			// 关闭弹窗
			closeDetail:function(row,index){
				this.detailFlag = false;
			},
		},
		created(){
			this.provinceArr = provinceArr;
			this.getapiList();
			this.getList(this.getParams())
		}
    }
</script>
