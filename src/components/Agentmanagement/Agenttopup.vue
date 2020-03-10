<style scoped="scoped" lang="less">
.batchtopupbox {
  padding: 20px;
  .stepone{
      width:300px;
  }
  .grouplist {
    display: flex;
    justify-content: space-between;
  }
  .groupbox {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 44%;
    span {
      width: 100%;
      display: block;
      margin-bottom: 10px;
      color: #f16643;
      height: 42px;
    }
    input {
      min-width: 150px;
      max-width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      padding: 5px 10px;
      box-sizing: border-box;
      border-radius: 6px;
      border: 1px solid #ccc;
    }
  }
}
</style>
	
<template>
  <div class="batchtopupbox">
    <div class="stepone">
      <Form :model="formLeft" label-position="left" :label-width="100">
        <FormItem label="代理商">
          <Input v-model="formLeft.input5" disabled="disabled"></Input>
        </FormItem>
        <FormItem label="当前余额">
          <Input v-model="formLeft.input6" disabled="disabled" /></Input>
        </FormItem>
        <!-- 查询时无请选择套餐 -->
        <FormItem label="充值金额">
          <Input v-model="formLeft.input7" placeholder="充值金额必须大于等于50"></Input>
        </FormItem>
      </Form>
      <!-- 查询时无充值按钮-->
      <div class="btnbox">
        <Button type="primary" style="margin:30px 100px;">确定充值</Button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: 0,
      tem_params: "",
      defaultData:{},
      formLeft: {
        input5: "鹤洋（heyang）",
        input6: "10.01",
        input7:'',
      },
    };
  },
  methods: {
    // 获取当前ICCID的代理商以及当前余额
    getIccidInfo(){
      var that = this;
      var params = {};
          params = {
              iccid:this.tem_params.id
          };
      that.$fetch('/cardManage/queryByIccid', params).then((data)=>{
          console.log(data)
          if(data.code=='500'){
            that.$Message.error('服务器错误：500，请联系客服人员或稍后重试！');
          }else if(data && !data.data){
              that.$Message.error('未查到该ICCID'+params.iccid+'的相关信息，请检查是否有误，请重新查询！');
          }
          that.defaultData = data;
      })
    },
    prefun() {
      if (this.current <= 0) {
        this.current = 0;
      } else {
        this.current -= 1;
      }
    },
    next() {
      if (this.current >= 1) {
        this.current = 0;
      } else {
        this.current += 1;
      }
    }
  },
  created() {
    console.log(this.$route.params);
    var tem_params = this.$route.params;
    this.tem_params = tem_params;
    this.getIccidInfo();
  }
};
</script>
