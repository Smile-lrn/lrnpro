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
                <Input v-model="defaultData.usedTrafficDecimal" disabled="disabled"></Input>
            </FormItem>
            <FormItem label="剩余流量">
                <Input v-model="defaultData.allowanceDecimal" disabled="disabled"></Input>
            </FormItem>
            <FormItem label="API">
                <Input v-model="defaultData.apiName" disabled="disabled"></Input>
            </FormItem>
            <!-- 查询时无请选择套餐 -->
            <FormItem label="请选择套餐"  v-if="(tem_params.type=='cz')||tem_params.type=='dkcz'">
                <Select v-model="model6" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem> 
        </Form>
        <!-- 查询时无充值按钮-->
        <div class="btnbox" v-if="(tem_params.type=='cz')||tem_params.type=='dkcz'">
            <Button type="primary" style="margin:30px 100px;" @click="touupfun">充值</Button>
        </div>
    </div>
</template>
<script>
    export default {
        data (){
            return {
                formLeft: {
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
            },
            // 获取详情信息
            getDetail(){
                var that = this;
                var params = {};
                    params = {
                        iccid:this.tem_params.id
                    };
                that.$fetch('/cardManage/queryByIccid', params).then((data)=>{
                    console.log(data)
                    if(!data){
                        that.$Message.error('未查到该ICCID'+params.iccid+'的相关信息，请检查是否有误，请重新查询！');
                        return
                    }
                    if(data.status==1){
                        data.statustxt = '正常使用'
                    }else if(data.status==2){
                        element.statustxt = '库存'
                    }else if(data.status==3){
                        data.statustxt = '停用'
                    }
                    that.defaultData = data;
                    if(that.tem_params.type == 'dkcz' && data &&data.apiId){
                        that.getqueryByApiId();
                    }
                })
            },
            touupfun(){
                if(!this.model6){
                    this.$Message.error('请选择所要充值的套餐！');
                    return;
                }
                if(!this.defaultData && this.defaultData.iccid){
                    this.$Message.error('请填写所需要充值的ICCID！');
                    return;
                }
            }
        },
        created(){
            console.log(this.$route.params)
            var tem_params = this.$route.params;
            this.tem_params = tem_params;
            if(tem_params.type == 'cz'){
                this.defaultData = JSON.parse(sessionStorage.getItem('defaultData'));
                console.log(this.defaultData)
                this.getqueryByApiId();
            }
            this.getDetail();
        },
        destroyed(){
            sessionStorage.removeItem('defaultData');
        }
    }
</script>
