<style scoped="scoped" lang="less">
	.vchartsbox{
		display: flex;
		flex-wrap: wrap;
		min-height: 260px;
		padding-top: 30px;
		.itembox {
			width:33.33%;
			min-height: 260px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			p{
				margin: 0;
				padding: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 40px;
				line-height: 40px;
				font-size: 18px;
				font-weight: bold;
			}
			.numbox{
				display: flex;
				align-items: center;
				justify-content: center;
				align-items: center;
				font-size: 18px;
				color: red;
				font-weight: bold;
				height: 60px;
				
			}
			/deep/ .ivu-select{
				width: 160px !important;
				// margin-top: -30px;
			}
			.echarts{
				width: 100%;
				height: 100%;
				position: relative;
				/deep/ div{
					display: flex;
					height: 260px !important;
					width: 100% !important;
					position: relative;
					justify-content: center;
					align-items: center;
					/deep/ canvas{
						left: 50%  !important;
						top: 50% !important;
						transform: translate(-50%,-50%) !important;
						width: auto !important;
						height: 260px !important;
					}
				}
			}
		}
	}
	.collapsebox{
		box-sizing: border-box;
		padding: 20px;
		>p{
			display: flex;
			align-items: center;
			font-size: 18px;
			padding: 10px 0;
			font-weight: bold;
			margin-bottom: 10px;
			i{
				font-size: 24px;
				line-height: 25px;
				margin-right: 10px;
			}
			span{
				line-height: 24px;
			}
		}
		
		/deep/ .ivu-collapse-header{
			display: flex;
			align-items: center;
			.titlebox{
				display: flex;
				width: calc(100% - 40px);
				.tit{
					display: block;
					width: 80%;
					overflow: hidden;
					height: 100%;
					line-height: 36px;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				span{
					display: block;
					width: 100px;
					align-items: center;
					overflow: hidden;
					height: 100%;
					line-height: 36px;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
</style>
<template>
	<div class="overviewbox">
		<div class="vchartsbox"  :xs="20" :sm="12" :md="12" :lg='8' >
			<div class="itembox">
				<p>联通流量卡</p>
				<chart ref="chart1"  :options="orgOptions1" :auto-resize="true"></chart>
				<Select v-model="model1" @on-change="onChagefun">
					<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<span class="numbox">
					数量：{{model1}}
				</span>
			</div>
			<div class="itembox">
				<p>移动流量卡</p>
				<chart ref="chart1" :options="orgOptions2" :auto-resize="true"></chart>
				<Select v-model="model2" @on-change="onChagefun">
					<Option v-for="item in yidongpickers" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<span class="numbox">
					数量：{{model2}}
				</span>
			</div>
			<div class="itembox">
				<p>电信流量卡</p>
				<chart ref="chart1" :options="orgOptions3" :auto-resize="true"></chart>
				<Select v-model="model3" @on-change="onChagefun">
					<Option v-for="item in telecompickers" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<span class="numbox">
					数量：{{model3}}
				</span>
			</div>
		</div>
		<!-- 平台公告 -->
		<div class="collapsebox">
			<p>
				<Icon class="l_iconfont l_iconicon_caigouguanli8"></Icon>
				<span>平台公告</span>
			</p>
			<Collapse v-model="collapsevalue" accordion>
				<Panel name="1">
					<div class="titlebox">
						<span class="tit">七月 您好！物联网平台为更好的服务物联网项目发展不懈努力！</span>
						<span class="date">2019-07-10 13:03</span>
						<!-- <span class="btn">查看</span> -->
					</div>
					<p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
				</Panel>
				<Panel name="2">
					斯蒂夫·盖瑞·沃兹尼亚克
					<p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。
					斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。
					斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。
					斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。
					斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。
					斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。
					斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。
					斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。
					</p>
				</Panel>
				<Panel name="3">
					乔纳森·伊夫
					<p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
				</Panel>
			</Collapse>
		</div>
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
			orgOptions1:{},
			orgOptions2:{},
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
				{ value: 310, name: '联通04' },
				{ value: 335, name: '联通05' },
				{ value: 310, name: '联通06' },
				{ value: 335, name: '联通07' },
				{ value: 310, name: '联通08' },{ value: 335, name: '联通011' },
				{ value: 310, name: '联通092' },
				
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
		this.setCharts('orgOptions1',this.data1,this.data2)
		this.setCharts('orgOptions2', ['移动01', '移动02' ],[
				{ value: 335, name: '移动01' },
				{ value: 310, name: '移动02' },
			],this.color2)
		this.setCharts('orgOptions3',['电信01', '电信02' ],[
				{ value: 335, name: '电信01' },
				{ value: 310, name: '电信02' },
			],this.color3)
		// this.getdata()
	}
};
</script>
<style scoped lang="less">
.overviewbox {
	width: 100%;
}
/deep/ .tablebox {
	max-width: 100%;
	width: auto;
	min-width: 100px;
	margin-top: 37px;
}
.dataanalysis {
	font-size: 18px;
	font-weight: bold;
	color: rgba(94, 105, 119, 1);
	text-align: left;
	padding: 16px 0 24px 0;
}
.overviewFX {
	width: 100%;
	height: 170px;
	overflow: hidden;
}
.OverviewTit {
	height: 170px;
	background-color: #fff;
	border-radius: 10px;
	text-align: left;
	.OverviewTitName {
		color: rgba(94, 105, 119, 1);
		line-height: 21px;
		font-size: 16px;
		padding: 34px 0 0 30px;
	}
	.OverviewTitMud {
		font-weight: 500;
		color: rgba(84, 181, 116, 1);
		line-height: 56px;
		font-size: 46px;
		padding: 20px 0 0 24px;
	}
}
.OverviewContent {
	width: 100%;
	background-color: #fff;
	border-radius: 10px;
	margin-top: 30px;
	padding-bottom: 120px;
}
.OverviewContenticon {
	float: left;
	margin-left: 30px;
	display: flex;
	align-items: center;
	img {
		margin-right: 10px;
		width: 24px;
		height: 24px;
	}
	span {
		font-size: 16px;
		font-family: MicrosoftYaHei-Bold;
		font-weight: bold;
		color: rgba(94, 105, 119, 1);
	}
}
.Overviewpage {
	float: left;
	margin: 20px 0 0 20px;
}
</style>
