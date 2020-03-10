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
				<input type="text" v-model="param_remark" placeholder="请输入搜索关键字(备注)">
				<Button type="primary" style="margin-right: 20px;" size="large"  @click="searchFun">搜索</Button>
			</div>
		</div>
        <Table border ref="selection" :columns="columns4" :data="data1" >
			<template slot="operation" slot-scope="{ row,column, index }">
				<span style="cursor: pointer;">查看</span>
			</template>
		</Table>
		<Page :total="totalNum" :page-size="size" show-elevator @on-change="setPage"/>
    </div>
</template>
<script>
    export default {
        data () {
            return {
				labelinvalue:true,
				param_remark:'',
                columns4: [
					{
					    title: 'ID',
					    key: 'id'
					},
					{
					    title: 'userId',
					    key: 'userId'
					},
                    {
                        title: '备注',
                        key: 'remark',
						toolTip:true
                    },
					{
					    title: '时间',
					    key: 'createTime'
					},
                    
                ],
				data1: [],
				totalNum:0,
				page:1,
				size:this.$store.state.pageSize,
            }
        },
        methods: {
			// 设置页码
			setPage(page){
				console.log(page)
				this.page = page;
				this.searchFun();
			},
			// 获取查询参数
			getParams(){
				var params = {};
				params = {
					remark:this.param_remark,//备注
					page:this.page,	//否	int	当前页码 不写默认为0
					size:this.size,	//否	int	每页数量 不写默认为10
				}
				return params;
			},
			// 获取列表
			getList(params){
				var that = this;
				this.$fetch('/diary/queryByPage',params)
				.then(function(data){
					// console.log(data)
					// data.list.forEach(function(element,index){
					// 	element.createTime = that.filterDate(element.createTime)
					// })
					that.totalNum = data.total;
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
		},
		created(){
			this.searchFun();
		}
    }
</script>
