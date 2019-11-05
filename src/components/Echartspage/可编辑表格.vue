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
		<Table :columns="columns" :data="data">
			<template slot-scope="{ row, index }" slot="name">
			<Input type="text" v-model="editName" v-if="editIndex === index" />
			<span v-else>{{ row.name }}</span>
			</template>

			<template slot-scope="{ row, index }" slot="age">
			<Input type="text" v-model="editAge" v-if="editIndex === index" />
			<span v-else>{{ row.age }}</span>
			</template>

			<template slot-scope="{ row, index }" slot="birthday">
			<Input type="text" v-model="editBirthday" v-if="editIndex === index" />
			<span v-else>{{ getBirthday(row.birthday) }}</span>
			</template>

			<template slot-scope="{ row, index }" slot="address">
			<Input type="text" v-model="editAddress" v-if="editIndex === index" />
			<span v-else>{{ row.address }}</span>
			</template>

			<template slot-scope="{ row, index }" slot="action">
			<div v-if="editIndex === index">
				<Button @click="handleSave(index)">保存</Button>
				<Button @click="editIndex = -1">取消</Button>
			</div>
			<div v-else>
				<Button @click="handleEdit(row, index)">操作</Button>
			</div>
			</template>
		</Table>
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
				columns: [
					{
						title: '姓名',
						slot: 'name'
					},
					{
						title: '年龄',
						slot: 'age'
					},
					{
						title: '出生日期',
						slot: 'birthday'
					},
					{
						title: '地址',
						slot: 'address'
					},
					{
						title: '操作',
						slot: 'action'
					}
					],
					data: [
					{
						name: '王小明',
						age: 18,
						birthday: '919526400000',
						address: '北京市朝阳区芍药居'
					},
					{
						name: '张小刚',
						age: 25,
						birthday: '696096000000',
						address: '北京市海淀区西二旗'
					},
					{
						name: '李小红',
						age: 30,
						birthday: '563472000000',
						address: '上海市浦东新区世纪大道'
					},
					{
						name: '周小伟',
						age: 26,
						birthday: '687024000000',
						address: '深圳市南山区深南大道'
					}
					],
					editIndex: -1,  // 当前聚焦的输入框的行数
					editName: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
					editAge: '',  // 第二列输入框
					editBirthday: '',  // 第三列输入框
					editAddress: '',  // 第四列输入框
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
			handleEdit (row, index) {
				this.editName = row.name;
				this.editAge = row.age;
				this.editAddress = row.address;
				this.editBirthday = row.birthday;
				this.editIndex = index;
			},
			handleSave (index) {
				this.data[index].name = this.editName;
				this.data[index].age = this.editAge;
				this.data[index].birthday = this.editBirthday;
				this.data[index].address = this.editAddress;
				this.editIndex = -1;
			},
			getBirthday (birthday) {
				const date = new Date(parseInt(birthday));
				const year = date.getFullYear();
				const month = date.getMonth() + 1;
				const day = date.getDate();
				return `${year}-${month}-${day}`;
			}
		},
		
    }
</script>
