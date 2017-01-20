/**
 * silva.lim
 * 2014-03-26
 * QQ: 1520002068
 *
 * company news
 */

//----------------------------跨域请求-------------------------
function ajaxRequest(url,callBack){
	if(url.indexOf('?') != -1){
		$.getScript(url+"&callback="+callBack);
	}else{
		$.getScript(url+"?callback="+callBack);
	}
}
/**
 * 过滤html标签
 */
function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
    return str;
}
/**
 * callback 函数 获取新闻列表
 */
function addCompanyNews(_json){
	//console.log(_json);
	var opt={
		html:'<li><a href="{url}" target="_blank"><span class="time">{date}</span>{title}</a></li>',
		div:'#news-content',
		addMore: '.news-add-more'
	}
	if(_json.message != 'success'){
		$(opt.addMore).addClass('news-no-more');
		$('.news-add-more').hide();
	}
	var _node = opt.html,_html='';
	$.each(_json.data.annList,function(i,obj){
		var _htmlNode = '';
		var valTitle = "";
		if(obj.title.length>35){
			valTitle = obj.title.substr(0,35) + '...';
		}else{
			valTitle = obj.title;
		}
		
		_html+=_node.replace('{url}','company-notice-window.html?id='+obj.id).replace('{title}',valTitle).replace('{date}',obj.createTimeFormat);
	});
	//把padding 图片去掉
	$(opt.div).append(_html);
	
	if($('.news-add-more').attr('page')>_json.data.totalPage){//隐藏加载更多
		$('.news-add-more').hide();
	}
}

/**
 * callback 函数 显示集团消息内容
 */
 function showCompanyNewsContent(jsonContent){
 	//console.log(jsonContent);
 	var jsonContent = jsonContent.data.ann;
	if(jsonContent.title)
	{
		$('#news > h1').html(jsonContent.title);
		titleReplace(jsonContent.title);
	}
	if(jsonContent.content)
		$('#news > .news-con').html('<p>'+jsonContent.content+'</p>');
	if(jsonContent.createTimeFormat)
		$('#news > .published').html(jsonContent.createTimeFormat);
	if(jsonContent.source)
		$('#news > .news-tip > p:eq(0)').html(jsonContent.source);
	
}

$(document).ready(function(){

	$.fn.getCompanyNewsList = function(opt){
		var url = SystemProp.appServerUrl+'/content/get-ann-content!callbackPage.json?ln='+opt.ln+'&catId='+opt.catId+'&begin='+opt.begin+'&limit='+opt.limit;
		ajaxRequest(url,'addCompanyNews');
	};

	/**
	 * 新闻列表参数
	 * @type {Object}
	 */
	var opt = {
		ln:0,
		catId:1,
		begin:0,
		limit:20,
		clearHtml:1
	};
	/**
	 * 默认加载第一页新闻列表
	 */
	$.fn.loadCompanyNewsList = function(){
		$.fn.getCompanyNewsList(opt);
	}
	/**
	 * 点击加载下一页新闻列表
	 */
	$('.news-add-more').on('click',function(){
		var _page = $(this).attr('page');	//当前页码
		$(this).attr('page',parseInt($(this).attr('page'))+1);	//当前页码加1
		opt.begin = (_page-1)*opt.limit;	//列表开始点
		opt.clearHtml = 0;	//加载更多不清除html
		$.fn.getCompanyNewsList(opt);
	});

	/**
	 * 加载集团消息内容页
	 */
	$.fn.companyNewsContent = function(){
	    var aid = getQueryString('id')?getQueryString('id'):1;
		var url = SystemProp.appServerUrl+'/content/get-ann-content!callback.json?ln=0&id='+aid;
		ajaxRequest(url,'showCompanyNewsContent');
	}


});