<style scoped="scoped" lang="less">
	
	.chartoutbox{
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
		background: #040F3C;
		min-height:calc(100vh - 154px);
		.echarts{
			height:300px;
			>div{
				canvas{
					transform: scale(8) !important;
				}
			}
		}
	}
</style>
<template>
    <div class="chartoutbox">
		<Row class="chartsbox">
		    <Col :xs="2" :sm="4" :md="6" :lg="8">
				<chart ref="chart1" :options="orgOptions2" :auto-resize="true"></chart>
			</Col>
		    <Col :xs="20" :sm="16" :md="12" :lg="8">Col</Col>
		    <Col :xs="2" :sm="4" :md="6" :lg="8">Col</Col>
		</Row>
	</div>
</template>
<script>
export default {
	data() {
		return {
			orgOptions: {
			},
			collapsevalue:1,
			// 联通，移动，电信 选项
			orgOptions1:{
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b}: {c} ({d}%)"
				},
				legend: {
					orient: 'vertical',
					x: 'left',
					data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
				},
				series: [
					{
						name:'访问来源',
						type:'pie',
						radius: ['40%', '55%'],
						label: {
							normal: {
								formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
								backgroundColor: '#eee',
								borderColor: '#aaa',
								borderWidth: 1,
								borderRadius: 4,
								// shadowBlur:3,
								// shadowOffsetX: 2,
								// shadowOffsetY: 2,
								// shadowColor: '#999',
								// padding: [0, 7],
								rich: {
									a: {
										color: '#999',
										lineHeight: 22,
										align: 'center'
									},
									// abg: {
									//     backgroundColor: '#333',
									//     width: '100%',
									//     align: 'right',
									//     height: 22,
									//     borderRadius: [4, 4, 0, 0]
									// },
									hr: {
										borderColor: '#aaa',
										width: '100%',
										borderWidth: 0.5,
										height: 0
									},
									b: {
										fontSize: 16,
										lineHeight: 33
									},
									per: {
										color: '#eee',
										backgroundColor: '#334455',
										padding: [2, 4],
										borderRadius: 2
									}
								}
							}
						},
						data:[
							{value:335, name:'直达'},
							{value:310, name:'邮件营销'},
							{value:234, name:'联盟广告'},
							{value:135, name:'视频广告'},
							{value:1048, name:'百度'},
							{value:251, name:'谷歌'},
							{value:147, name:'必应'},
							{value:102, name:'其他'}
						]
					}
				]
			},
			orgOptions2:{
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b}: {c} ({d}%)"
				},
				legend: {
					orient: 'vertical',
					x: 'left',
					data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
				},
				series: [
					{
						name:'访问来源',
						type:'pie',
						selectedMode: 'single',
						radius: [0, '70%'],

						label: {
							normal: {
								position: 'inner'
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data:[
							{value:335, name:'直达', selected:true},
							{value:679, name:'营销广告'},
							{value:1548, name:'搜索引擎'}
						]
					}
				]
			},
			orgOptions3:{},
			model1:'10',
			model2:'33',
			model3:'66',
			cityList: [
				{
					value: '10',
					label: '联通01'
				},
				{
					value: '18',
					label: '联通02'
				},
			],
			yidongpickers: [
				{
					value: '33',
					label: '移动01'
				},
				{
					value: '38',
					label: '移动02'
				},
			],
			telecompickers: [
				{
					value: '66',
					label: '电信01'
				},
				{
					value: '88',
					label: '电信02'
				},
			],
			color1:['#c23531','#2f4554', '#FF9F7F',  '#FFDB5C','#37A2DA',  '#67E0E3', '#E062AE','#6e7074', '#546570', '#c4ccd3'],
			color2:['#FFDB5C','#37A2DA',  '#67E0E3', '#E062AE','#c23531','#2f4554', '#FF9F7F',  '#6e7074', '#546570', '#c4ccd3'],
			color3:['#FF9F7F','#c23531', '#37A2DA', '#FFDB5C',   '#E062AE','#c23531','#2f4554', '#6e7074', '#546570', '#c4ccd3'],
			data1: ['联通01', '联通02' ],
			data2:[
				{ value: 335, name: '联通01' },
				{ value: 310, name: '联通02' },
				{ value: 335, name: '联通03' },
			]
		};
	},
	methods: {
		setCharts(optionsname,data1,data2,color){
			let colors = color || ['#c23531','#2f4554', '#FF9F7F',  '#FFDB5C','#37A2DA',  '#67E0E3', '#E062AE','#6e7074', '#546570']
			this[optionsname] = {
				color:colors,
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b}: {c} ({d}%)'
				},
				legend: {
					orient: 'vertical',
					x: 'left',
					data: data1
				},
				series: [
					{
						name: '访问来源',
						type: 'pie',
						// radius : '65%',
						center: ['50%', '50%'],
						radius: ['45%', '70%'],
						avoidLabelOverlap: true,
						label: {
							normal: {
								show: false,
								position: 'center',
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '18',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: false
							},
							
						},
						data: data2.sort(function (a, b) { return a.value - b.value; }),
						
					}
				],
			}
		},
		onChagefun(val){
			console.log(val)
		}
	},
	created() {
		//显示第一个日财务支出
		this.overcontent = this.Overviewday;
		this.setCharts('orgOptions1',this.data1,this.data2,this.color1)
		
		this.setCharts('orgOptions3',['电信01', '电信02' ],[
				{ value: 335, name: '电信01' },
				{ value: 310, name: '电信02' },
			],this.color3)
		// this.getdata()
	}
};
</script>
