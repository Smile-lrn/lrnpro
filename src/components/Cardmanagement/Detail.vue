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
                <Input v-model="defaultData.iccid" disabled="disabled"></Input>
            </FormItem>
            <FormItem label="ICCID">
                <Input v-model="defaultData.iccid" disabled="disabled"></Input>
            </FormItem>
            <FormItem label="当前状态">
                <Input v-model="defaultData.statustxt" disabled="disabled"></Input>
            </FormItem>
            <FormItem label="已使用">
                <Input v-model="defaultData.allowanceDecimal" disabled="disabled"></Input>
            </FormItem>
            <FormItem label="剩余流量">
                <Input v-model="defaultData.allowance" disabled="disabled"></Input>
            </FormItem>
            <FormItem label="API">
                <Input v-model="defaultData.apiName" disabled="disabled"></Input>
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
            <Button type="primary" style="margin:30px 100px;" @click="">充值</Button>
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
                ],
                model6: '',
                tem_params:'',
                defaultData:{},
            }
        },
        methods:{
            // 获取套餐列表
            getqueryByApiId(){
                var that = this;
                var params = {};
                    params = {
                        apiId:this.defaultData.apiId
                    };
                    that.$fetch('/api/queryByApiId', params).then((data)=>{
                        console.log(data)
                        var temData = data || [];
                        if(temData.length>0){
                            that.model6 = temData[0].id;
                            temData.forEach(function(element,index){
                                element.value = element.id;
                                element.label = element.setMealName+'/'+element.periodTimeStr+'('+element.price+')'
                            })
                        }
                        that.cityList = data;
                    })
            }
        },
        created(){
            console.log(this.$route.params)
            var tem_params = this.$route.params;
            if(tem_params.type == 'cz'){
                this.defaultData = JSON.parse(sessionStorage.getItem('defaultData'));
                console.log(this.defaultData)
                this.getqueryByApiId();
            }
            this.tem_params = tem_params;
        },
        destroyed(){
            sessionStorage.removeItem('defaultData');
        }
    }
</script>
