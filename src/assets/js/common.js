// 验证图片格式
let handleFormatError = function(file) {
	this.$Notice.warning({
		title: '所传图片格式不正确',
	});
}
// 判断图片大小
let handleMaxSize = function(file) {
	this.$Notice.warning({
		title: '所传图片大小超出限制',
		desc: 'File  ' + file.name + ' is too large, no more than 2M.'
	});
}
// 上传图片数量限制
let handleBeforeUpload = function() {
	const check = this.uploadList.length < 11;
	if (!check) {
		this.$Notice.warning({
			title: '最多只能上传10张.'
		});
	}
	return check;
}

// 过滤器集合
const comFilters = {
	// 只能输入数字和一个小数点 小数只支持两位
	clearNoNum:function (val){ 
		
		// val = val.replace(/[^\d]/g,"");  //清除“数字”以外的字符  
		// conso.log(val)
		val = val.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
		val = val.replace(/^[+]{0,1}(\d+)$/g,"");  		
		val = val.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
		val = val.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
		val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
		if(val.indexOf(".")< 0 && val !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
			val= parseFloat(val); 
		} 
		return val
	} 
}

// 只能输入数字和一个小数点 小数只支持两位
const clearNoNum=function (val){ 
	val = val.toString()
	console.log(val)

	val = val.replace(/[^\d]/g,"");  //清除“数字”和“.”以外的字符  
	// val = val.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
	// val = val.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
	// val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
	if(val.indexOf(".")< 0 && val !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
		val= parseFloat(val); 
	} 
	return val
} 
// 价格限定
const clearNoNum1=function (val){ 
	val = val.toString()
	console.log(val)

	val = val.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
	val = val.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
	val = val.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
	val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
	if(val.indexOf(".")< 0 && val !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
		val= parseFloat(val); 
	} 
	return val
} 

export {
	handleFormatError,
	handleMaxSize,
	handleBeforeUpload,
	comFilters,
	clearNoNum,
	clearNoNum1
}