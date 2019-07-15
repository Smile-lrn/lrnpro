<style scoped="scoped" lang="less">
	.balancebox{
		padding: 20px;
		box-sizing: border-box;
		
		.searchbox{
			/deep/ .ivu-select-selection{
				height: 48px;
				display: flex;
				align-items: center;
				input{
					height: 48px;
				}
			}
			/deep/ .ivu-input-suffix{
				height: 48px !important;
				display: flex;
				align-items: center;
			}
			/deep/ .ivu-input-wrapper{
				height: 48px;
				outline-style: none;
				margin-right: 20px;
				input{
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
				margin-bottom: 30px;
				display: flex;
			}
			.midbox{
				display: flex;
				margin-left: 20px;
				input{
					border: none;
					outline-style: none;
					height: 48px;
					flex: 1;
					margin-right: 20px;
					border-radius: 6px;
					border: 1px solid #dcdee2;
					padding:0 10px;
				}
				span{
					display: flex;
					align-items: center;
					justify-content: center;
					color: #fff;
					width:64px;
					height:48px;
					background:rgba(84,181,116,1);
					border-radius:6px;
					margin-right: 50px;
				}
			}
			.timebox{
				float: right;
				margin-bottom: 30px;
				max-width:404px;
				height:40px;
				padding: 0 10px;
				box-sizing: border-box;
				background:rgba(248,176,47,1);
				border-radius:20px;
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
				<div class="left">
					<Select v-model="model1" :label-in-value="labelinvalue" style="width:200px" @on-change="choosecategory">
						<Option style="text-align: left;" v-for="item in typelist1" :value="item.id" :key="item.user_name">{{ item.user_name }}</Option>
					</Select>
					<DatePicker type="daterange" @on-change="choosedate" show-week-numbers placeholder="日期筛选" style="width: 200px"></DatePicker>
				</div>
				<div class="midbox">
					<input type="text" v-model="big_order_serial" placeholder="请输入金额">
					<Button type="primary" style="margin-right: 20px;" size="large" @click="exportData(1)">搜索</Button>
					<Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon>导出数据</Button>
				</div>
			</div>
		</div>
        <Table border ref="selection" :columns="columns4" :data="data1" ></Table>
    </div>
</template>
<script>
    export default {
        data () {
            return {
				labelinvalue:true,
				model1:'请选择类型',
				typelist1:[ {
					"id":'请选择类型', //供货商id
					"user_name": "请选择类型" //供货商名称
				}] ,
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        },
        methods: {
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            },
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
