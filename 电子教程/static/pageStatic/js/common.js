var SystemProp={};

//网站域名配置
//----------------------炫酷的分割线 多环境配置开始--------------------

//Live start
/*SystemProp.domain="http://www.aetoscg.com/";
SystemProp.appServerUrl="";
SystemProp.memberServerUrl="https://biz.aetoscg.com";
SystemProp.trustServerUrl="https://trust.aetoscg.com";
SystemProp.bizServerUrl="http://biz.aetoscg.com/";
SystemProp.frontServerUrl="null";
SystemProp.quoteBrowserUrl="http://218.213.69.44:8020/quote";
SystemProp.chartBrowserUrl="http://static.aetoscg.com/MT4/";
SystemProp.exchangeBrowserUrl="http://218.17.246.241:8020/HL";
SystemProp.adClientUrl="http://promo.aetoscg.com/";
SystemProp.contentServiceUrl="http://content.aetoscg.com/api";*/
//Live end


//preLive start
SystemProp.domain="http://biz.aetoscg.com/";
SystemProp.appServerUrl="http://biz.aetoscg.com/";
SystemProp.memberServerUrl="http://biz.aetoscg.com/";
SystemProp.trustServerUrl="http://trust.aetoscg.com/";
SystemProp.bizServerUrl="http://biz.aetoscg.com/";
SystemProp.frontServerUrl="null";
SystemProp.quoteBrowserUrl="http://218.213.69.44:8020/quote";
SystemProp.chartBrowserUrl="http://static.aetoscg.com/MT4/";
SystemProp.exchangeBrowserUrl="http://218.17.246.241:8020/HL";
SystemProp.adClientUrl="http://promo.aetoscg.com/aetosAd";
SystemProp.contentServiceUrl="http://content.aetoscg.com/api";
//preLive end

//test start
/*SystemProp.domain="http://test.bizcentre.aetoscg.com:8488/";
SystemProp.appServerUrl="http://test.bizcentre.aetoscg.com:8488/";
SystemProp.memberServerUrl="http://test.bizcentre.aetoscg.com:8488/";
SystemProp.trustServerUrl="http://test.trust.aetoscg.com:9443/";
SystemProp.bizServerUrl="http://test.bizcentre.aetoscg.com:8488/";
SystemProp.frontServerUrl="null";
SystemProp.quoteBrowserUrl="http://218.213.69.44:8020/quote";
SystemProp.chartBrowserUrl="http://static.aetoscg.com/MT4/";
SystemProp.exchangeBrowserUrl="http://218.17.246.241:8020/HL";
SystemProp.adClientUrl="http://test.bizcentre.aetoscg.com:8488/aetosAd";
SystemProp.contentServiceUrl="http://content.aetoscg.com/api";*/
//test end


//----------------------炫酷的分割线 多环境配置结束--------------------

SystemProp.getUrl=function(param){
   var url=eval('SystemProp.'+param);
   return url;
};


// 实例化fancybox
$(document).ready(function(){
	$(".fancybox").fancybox({
		padding: 0,
		margin:0,
		width:730,
		height:620,
		minHeight : 620,
		
		autoSize   : false,
		autoResize  : false,
		autoScale:false,
		closeBtn   : false,
		
		iframe : {
			scrolling : 'no',
			preload   : true
		}
	});

	$('.fancybox-psd').fancybox({
		padding: 0,
		margin:0,
		width:730,
		height:640,
		minHeight : 620,
		
		autoSize   : false,
		autoResize  : false,
		autoScale:false,
		closeBtn   : false,
		
		iframe : {
			scrolling : 'no',
			preload   : true
		}
	});
	
	$('.fancybox-tv').fancybox({
		padding: 0,
		margin:0,
		width:860,
		height:730,
		minHeight : 710,
		
		autoSize   : false,
		autoResize  : false,
		autoScale:false,
		closeBtn   : false,
		
		iframe : {
			scrolling : 'no',
			preload   : true
		}
	});
	
	
	//关闭弹出层
	$('a.close').click(function(e) {
        parent.$.fancybox.close(); 
    });
	


});






function titleReplace(title) {
	var original = $('title').text();
	$('title').html(title + ' - ' + original);
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}

function charLeftFill(char,bchar,alength){
	var xchar = char.toString();
	if(xchar.length >= alength)
		return xchar;
	for(var i=0;i<alength;i++){
		xchar = bchar+xchar;
		if(xchar.length==alength)
		break;   
	}
	return(xchar);
} 

//下个事件时间倒计时
function getDailyMinSpan(d){
	var span = 0;
	//var d1 = parseDate((d.getPubDate()+" "+d.getPubTime()+":00"),"yyyy-MM-dd HH:mm:ss");
	var d1 = d.pub_date+" "+d.pub_time+":00 GMT+00";
	var d2 = new Date();
	d1 = new Date(d1);
	d1 = d1.getTime();
	d2 = d2.getTime();
	//TO-DO 获取最新的财经事件到当前时间的时间差 
	span = Math.abs(Math.floor((d1 - d2)/(60*1000)));
	if(d1 && d2){
		$('.economic').find(':input').val( (charLeftFill(Math.floor(span/60),'0',2)) + ':' + (charLeftFill(Math.floor(span%60),'0',2)) );
	}
}

function date2Str(date){
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	if(month<10){
		month="0"+month;
    }
	var day = date.getDate();
	if(day<10){
		day="0"+day;
    }
	return year+"-"+month+"-"+day;
}
function str2Date(string){
	//string yyyy-mm-dd
	var date = new Date();
	var array = string.split("-");
	date.setFullYear(array[0]*1,array[1]*1-1,array[2]*1);

	return date;
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}