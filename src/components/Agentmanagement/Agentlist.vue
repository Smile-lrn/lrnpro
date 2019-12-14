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
		.oprationbox{
			span{
				padding: 5px 3px;
				color:#fff;
				margin-bottom: 3px;
				display: block;
				float: left;
				margin-right: 5px;
				border-radius: 3px;
				&.green{
					background: #71d398;
				}
				&.orange{
					background:#f4b162 ;
				}
			}
		}
		.editbox{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 9999;
			background: rgba(0,0,0,.6);
			display: flex;
			justify-content: center;
			align-items: center;
			.formbox{
				width: 550px;
				background: #fff;
				padding: 50px;
				border-radius: 10px;
			}
		}
		/deep/ .ivu-form .ivu-form-item-label{
			text-align: left;
		}
	}
	
</style>
<template>
    <div class="balancebox">
		<div class="searchbox">
			<div class="lmbxo">
				<input type="text" v-model="loginAccount" placeholder="请输入登录账号">
				<input type="text" v-model="userName" placeholder="请输入姓名">
				<input type="phone" v-model="phoneNum" placeholder="手机号">
				<input type="email" v-model="mailAddress" placeholder="邮箱">
				<Select v-model="model_show" style="width:200px">
					<Option v-for="item in isShowarr" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Button type="primary" style="margin-right: 20px;" size="large" @click="searchFun">搜索</Button>
			</div>
		</div>
        <Table border ref="selection" :columns="columns4" :data="data1" >
			<template slot="operation" slot-scope="{ row,column, index }">
				<div class="oprationbox">
					<span class="green" @click="updateAgent(row,index)">修改</span>
					<span class="orange" @click="setPricefun(row,index)">售价</span>
					<span class="green" @click="setTopup(row,index)">充值</span>
					<span class="orange">流量卡</span>
				</div>
			</template>
		</Table>
		<Page :total="totalNum" :page-size="size" show-elevator @on-change="setPage"/>
		<div class="editbox" v-if="editboxFlag">
			<Col class="formbox"  >
				<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
					<FormItem label="登录账号" prop="accountnumber">
						<Input type="text" v-model="formCustom.accountnumber" disabled="disabled"></Input>
					</FormItem>
					<FormItem label="密码" prop="passwd">
						<Input type="password" v-model="formCustom.passwd"></Input>
					</FormItem>
					<FormItem label="姓名" prop="name">
						<Input type="text" v-model="formCustom.name"></Input>
					</FormItem>
					<FormItem label="手机号" prop="phonenumber">
						<Input type="text" v-model="formCustom.phonenumber" number></Input>
					</FormItem>
					<FormItem label="邮箱" prop="emails">
						<Input type="email" v-model="formCustom.emails" ></Input>
					</FormItem>
					<FormItem label="显示佣金">
						<Select v-model="model3" @on-change="onChagefun"  style="width:200px">
                        	<Option v-for="item in showarr_1" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					<!-- <FormItem label="状态">
						<Select v-model="model3" @on-change="onChagefun"  style="width:200px">
							<Option v-for="item in showarr_1" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem> -->
					<FormItem>
						<Button type="primary" @click="handleSubmit('formCustom')">确定</Button>
						<Button @click="handleReset('formCustom')" style="margin-left: 8px">取消</Button>
					</FormItem>
				</Form>
			</Col>
		</div>
    </div>
</template>
<script>
    export default {
        data () {
 			const validatePass = (rule, value, callback) => {
                    callback();
            };
            const validatename = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('姓名不可以为空哟~'));
                }else {
                    callback();
                }
            };
            const validateAge = (rule, value, callback) => {
                if (!value) {
					// return callback(new Error('登录账号不可以为空哟~'));
					callback();
                }else {
                    callback();
                }
            };
			const validatePhonenumber = (rule, value, callback) => {
			    if (!value) {
			        return callback(new Error('手机号不可以为空哟~'));
			    }else {
                    callback();
                }
			};
			const validateemail = (rule, value, callback) => {
			    if (!value) {
			        return callback(new Error('邮箱不可以为空哟~'));
			    }else {
			        callback();
			    }
			};
            return {
				editboxFlag:false,
				model_show:'',
				isShowarr:[
					{
						value: '',
                        label: '请选择'
					},
                    {
                        value: '0',
                        label: '不显示'
                    },
                    {
                        value: '1',
                        label: '显示'
                    }
				],
				labelinvalue:true,
				money:'',
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '登录账号',
                        key: 'loginAccount'
                    },
                    {
                        title: '姓名',
                        key: 'userName',
						tooltip:true
                    },
                    {
                        title: '余额',
                        key: 'accountBalanceDecimal'
                    },
                    {
                        title: '手机号',
                        key: 'phoneNum'
                    },
                    {
                        title: '邮箱',
                        key: 'mailAddress'
					},
                    {
                        title: '显示佣金',
                        key: 'statustxt'
                    },
					{
					    title: '操作',
					    slot: 'operation'
					}
                ],
                data1: [],
				formCustom: {
                    passwd: '',
                    name: '',
                    accountnumber: '',
					phonenumber:'',
					emails:''
                },
                ruleCustom: {
                    passwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    name: [
                        { validator: validatename, trigger: 'blur' }
                    ],
                    accountnumber: [
                        { validator: validateAge, trigger: 'blur' }
                    ],
					phonenumber: [
                        { validator: validatePhonenumber, trigger: 'blur' }
                    ],
					emails: [
                        { validator: validateemail, trigger: 'blur' }
                    ],
				},
				loginAccount:'',
				userName:'',
				phoneNum:"",
				mailAddress:'',
                model2:'1',
                showarr:[{
                    value:'1',
                    label:"显示"
                },{
                    value:'0',
                    label:"不显示"
				}],
				model3:1,
                showarr_1:[{
                    value:1,
                    label:"显示"
                },{
                    value:0,
                    label:"不显示"
                }],
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
					loginAccount:this.loginAccount||'',
					userName:this.userName||'',
					phoneNum:this.phoneNum||"",
					mailAddress:this.mailAddress||'',
					show:this.model_show||'',
					page:this.page,	//否	int	当前页码 不写默认为0
					size:this.size,	//否	int	每页数量 不写默认为10
				}
				return params;
			},
			// 获取列表
			getList(params){
				var that = this;
				this.$fetch('/user/queryByPage',params)
				.then(function(data){
					data.list.forEach(function(element,index){
						if(element.show===1){
							element.statustxt = '显示'
						}else if(element.show===0){
							element.statustxt = '不显示'
						}
					})
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
			},
			// 修改
			updateAgent:function(row,index){
				console.log(row)
				this.formCustom={
					id:row.id,
					accountnumber:row.loginAccount,
                    passwd: '',
                    name:row.userName,
					phonenumber:row.phoneNum,
					emails:row.mailAddress,
					show:row.show,
					parentId:row.parentId,
					accountBalance:row.accountBalance
				},
				this.model3 = row.show;
				this.editboxFlag = true;
				
			},
			// 设置售价
			setPricefun:function(row,index){
				this.$router.push({
					name:'/Sellingprice',
					params:{
						id:1
					}
				})
			},
			// 充值
			setTopup:function(row,index){
				this.$router.push({
					name:'/Agenttopup',
					params:{
						id:1
					}
				})
			},
			handleSubmit (name) {
				var that = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        that.$post('/user/addOrUpdate',this.formCustom).then((data)=>{
                            console.log(data)
                            if(data.code == '500'){
                                that.$Message.error('请求失败,请稍后重试!');
                            }else if(data.code == '200'){
                                that.$Message.success('添加或修改成功！');
                                that.searchFun();
                            }
                        })
                    } else {
                        this.$Messaccountnumber.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.editboxFlag = false;
            }     
		},
		created(){
			this.searchFun();
		}
    }
</script>
