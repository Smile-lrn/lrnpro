<style scoped="scoped" lang="less">
	.singlebox{
		padding: 20px;
		box-sizing: border-box;
		.searchinput{
			width: 100px;
		}
	}
</style>
<template>
    <div class="singlebox" style="max-width:700px;margin:0 auto;">
        <Form :model="formLeft" label-position="left" :label-width="100">
            <FormItem label="绑定号">
                <Input v-model="formLeft.input1" disabled="disabled"></Input>
            </FormItem>
            <FormItem label="ICCID">
                <Input v-model="formLeft.input2" disabled="disabled"></Input>
            </FormItem>
            <FormItem label="当前状态">
                <Input v-model="formLeft.input3" disabled="disabled"></Input>
            </FormItem>
            <FormItem label="已使用">
                <Input v-model="formLeft.input4" disabled="disabled"></Input>
            </FormItem>
            <FormItem label="剩余流量">
                <Input v-model="formLeft.input6" disabled="disabled"></Input>
            </FormItem>
            <FormItem label="API">
                <Input v-model="formLeft.input5" disabled="disabled"></Input>
            </FormItem>
            <!-- 查询时无请选择套餐 -->
            <FormItem label="请选择套餐"  v-if="tem_params.type=='cz'">
                <Select v-model="model6" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem> 
        </Form>
        <!-- 查询时无充值按钮-->
        <div class="btnbox" v-if="tem_params.type=='cz'">
            <Button type="primary" style="margin:30px 100px;">充值</Button>
        </div>
    </div>
</template>
<script>
    export default {
        data (){
            return {
                formLeft: {
                    input1: '1440244215192',
                    input2: '8986061911001512717',
                    input3: '已停用',
                    input4: '89720.50MB',
                    input6: '-89720.5MB',
                    input5: '04联通'
                },
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
                model6: '',
                tem_params:'',
            }
        },
        created(){
            console.log(this.$route.params)
            var tem_params = this.$route.params;
            this.tem_params = tem_params;
        }
    }
</script>
