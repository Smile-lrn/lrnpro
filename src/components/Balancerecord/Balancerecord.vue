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
        <Select
          v-model="type"
          :label-in-value="labelinvalue"
          style="width:200px"
          @on-change="choosecategory"
        >
          <Option
            style="text-align: left;"
            v-for="item in typelist1"
            :value="item.id"
            :key="item.user_name"
          >{{ item.user_name }}</Option>
        </Select>
        <!-- <DatePicker type="daterange" @on-change="choosedate" show-week-numbers placeholder="选择开始-截止时间" style="width: 200px"></DatePicker> -->
        <DatePicker
          type="date"
          @on-change="choosedateStart"
          show-week-numbers
          placeholder="选择开始时间"
          style="width: 200px"
          v-model="startTime"
        ></DatePicker>
        <DatePicker
          type="date"
          @on-change="choosedateEnd"
          show-week-numbers
          placeholder="选择截止时间"
          style="width: 200px"
          v-model="endTime"
        ></DatePicker>
        <input type="text" v-model="money" placeholder="请输入金额" />
        <Button type="primary" style="margin-right: 20px;" size="large" @click="searchFun">搜索</Button>
        <Button type="primary" size="large" @click="exportData(1)">
          <Icon type="ios-download-outline"></Icon>导出数据
        </Button>
      </div>
    </div>
    <Table border ref="selection" :columns="columns4" :data="data1"></Table>
    <Page :total="totalNum" :page-size-opts="pageSizeOpts" :page-size="size" show-elevator @on-change="setPage"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelinvalue: true,
      money: "",
      type: "请选择类型",
      startTime: "",
      endTime: "",
      page:1,
      pageSizeOpts:[1,10,20,50,100],
      size:1||this.$store.state.pageSize,
      currentPage:1,
      totalNum:0,
      typelist1: [
        {
          id: "请选择类型", //供货商id
          user_name: "请选择类型" //供货商名称
        },
        {
          id: "1", //供货商id
          user_name: "上级充值" //供货商名称
        },
        {
          id: "2", //供货商id
          user_name: "下级扣费" //供货商名称
        },
        {
          id: "3", //供货商id
          user_name: "后台充值套餐" //供货商名称
        },
        {
          id: "4", //供货商id
          user_name: "总后台扣除" //供货商名称
        },
        {
          id: "5", //供货商id
          user_name: "自动充值" //供货商名称
        }
      ],
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center",
          fixed: "left"
        },
        {
          title: "金额",
          key: "amount"
        },
        {
          title: "备注",
          key: "remarks",
          tooltip: true
        },
        {
          title: "变更后金额",
          key: "balanceAfterChange"
        },
        {
          title: "时间",
          key: "createTime"
        },
        {
          title: "类型",
          key: "type",
          fixed: "right"
        }
      ],
      data1: [
      ]
    };
  },
  methods: {
    // 设置页码
    setPage(page){
      console.log(page)
      this.page = page;
      this.getList(this.getParams());
    },
    // 收集查询参数
    getParams(){
      let params = {};
      params={
        type:this.type=='请选择类型'?'':this.type,
        createStartTime:this.startTime,
        creteEndTime:this.endTime,
        amount:(this.money!==0&&!this.money)?'':Number(this.money)*100,
        page:this.page,
        size:this.size,
      }
      return params;
    },
    // 获取列表
    getList(params){
      var that = this;
      this.$fetch('/balance/queryByPage',params)
      .then(function(data){
        data.list.forEach(function(element,index){
          element.createTime = that.filterDate(element.createTime)
          if(element.type=='2' || element.type=='4'){
            element.classname = 'red';
            element.amount = '-'+amount
          }else{
            element.classname = 'black'
          }
          element.type = that.filterType(element.type)
        })
        that.totalNum = data.total;
        console.log(that.totalNum)
        that.data1 = data.list;
      })
    },
    onChagefun() {},
    // 选择类型
    choosecategory(val) {
      console.log(val);
    },
    // 选择日期
    choosedateStart(dateobj) {
      this.startTime = dateobj;
      console.log(dateobj)
      if (this.startTime > this.endTime && this.endTime && this.startTime) {
        this.$Message.info({
          content: "开始时间不能大于截止时间!",
          duration: 5,
          closable: true
        });
        this.endTime  = this.startTime;
        return;
      }
    },
    choosedateEnd(dateobj) {
      console.log(dateobj);
      this.endTime = dateobj;
      if (this.startTime > this.endTime && this.startTime && this.endTime) {
        this.$Message.info({
          content: "开始时间不能大于截止时间!",
          duration: 5,
          closable: true
        });
        this.startTime = this.endTime;
        return;
      }
    },
    // 全选
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    // 导出表格数据
    exportData(type) {
      if (type === 1) {
        this.$refs.selection.exportCsv({
          filename: "The original data"
        });
      } else if (type === 2) {
        this.$refs.selection.exportCsv({
          filename: "Sorting and filtering data",
          original: false
        });
      } else if (type === 3) {
        this.$refs.selection.exportCsv({
          filename: "Custom data",
          columns: this.columns8.filter((col, index) => index < 4),
          data: this.data7.filter((data, index) => index < 4)
        });
      }
    },
    // 搜索
    searchFun(){
      this.getList(this.getParams());
    }
  },
  created() {
    this.getList(this.getParams());
  }
};
</script>
