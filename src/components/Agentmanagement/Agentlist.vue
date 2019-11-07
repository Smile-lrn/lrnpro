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
				<input type="text" v-model="money" placeholder="请输入登录账号">
				<input type="text" v-model="money" placeholder="请输入姓名">
				<input type="phone" v-model="money" placeholder="手机号">
				<input type="email" v-model="money" placeholder="邮箱">
				<Select v-model="model_show" style="width:200px">
					<Option v-for="item in isShowarr" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Button type="primary" style="margin-right: 20px;" size="large" @click="exportData(1)">搜索</Button>
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
		<Page :total="100" show-elevator />
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
						<Select v-model="model2" @on-change="onChagefun"  style="width:200px">
                        	<Option v-for="item in showarr" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					<FormItem label="状态">
						<Select v-model="model3" @on-change="onChagefun"  style="width:200px">
							<Option v-for="item in showarr_1" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
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
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
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
                    return callback(new Error('登录账号不可以为空哟~'));
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
                        key: 'money'
                    },
                    {
                        title: '姓名',
                        key: 'remark',
						tooltip:true
                    },
                    {
                        title: '余额',
                        key: 'changedmoney'
                    },
                    {
                        title: '手机号',
                        key: 'datetime'
                    },
                    {
                        title: '邮箱',
                        key: 'types'
					},
                    {
                        title: '显示佣金',
                        key: 'xsyj'
                    },
					{
					    title: '操作',
					    slot: 'operation'
					}
                ],
                data1: [{
					money:'heyang',
					remark:'贺阳',
					changedmoney:'0.00',
					datetime:'13203715363',
					xsyj:'显示',
					types:"13203715363@163.com"
				}],
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
                model2:'1',
                showarr:[{
                    value:'1',
                    label:"显示"
                },{
                    value:'0',
                    label:"不显示"
                }],
                model3:'1',
                showarr_1:[{
                    value:'1',
                    label:"正常"
                },{
                    value:'0',
                    label:"禁用"
                }]
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
			// 修改
			updateAgent:function(row,index){
				this.editboxFlag = true
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
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Messaccountnumber.success('Success!');
                    } else {
                        this.$Messaccountnumber.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.editboxFlag = false;
            }     
        }
    }
</script>
