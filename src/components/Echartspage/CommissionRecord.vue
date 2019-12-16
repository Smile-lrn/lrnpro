<style scoped="scoped" lang="less">
	.balancebox {
		padding: 20px;
        box-sizing: border-box;
        width: 100%;
        
	}
	
</style>
<template>
    <div class="balancebox">
        <Table  border :columns="columns2" :data="data"></Table>
        <Page :total="totalNum" :page-size="size" show-elevator @on-change="setPage"/>
    </div>
</template>
<script>
    export default {
        data () {
            return {
				totalNum:0,
				page:1,
				size:this.$store.state.pageSize,
                columns2: [
                    {
                        title: 'id',
                        key: 'id',
                        width: 60,
                        fixed: 'left'
                    },
                    {
                        title: '日期',
                        key: 'cashOutAmountDecimal',
                    },
                    {
                        title: '变动类型',
                        key: 'remarkStatus',
                    },
                    {
                        title: '变动金额',
                        key: 'createTime',
                    },
                    {
                        title: '变动后余额',
                        key: 'alipayAccount',
                    },
                    {
                        title: '描述',
                        key: 'alipayName',
                    },
                ],
                data: []
            }
        },
        methods:{
            setPage(page){
				console.log(page)
				this.page = page;
				this.getList();
            },
            // 获取查询列表
			getList(){
                var that = this;
				this.$fetch('/cashOut/queryByPage',{
                    page:this.page,
                    size:this.size
                })
				.then(function(data){
                    console.log(data)
					that.totalNum = data.total;
					console.log(that.totalNum)
					// 对金额做处理
					data.list.forEach(function(element,index){
                        element.createTime = that.filterDate(element.createTime)
                        if(element.remarkStatus === 1){
                            element.remarkStatus='申请中'
                        }else if(element.remarkStatus === 2){
                            element.remarkStatus='提现成功'
                        }else if(element.remarkStatus === 3){
                            element.remarkStatus='提现失败'
                        }
                        element.method = '支付宝'
                    })
					that.data = data.list;
				})
			},
        },
        created(){
            this.getList();
        }
    }
</script>
