/**
 * silva.lim
 * 2014-03-26
 * QQ: 1520002068
 *
 * News
 */

/**
 * [showIndexNewsList description]
 * @param  {[type]} cPage [description]
 * @param  {[type]} ln    [description]
 * @param  {[type]} api   [description]
 * @param  {[type]} num   [description]
 * @return {[type]}       [description]
 */
function getNewsList(cPage,ln,cat,num,onDate,endDate,keywords,isSearch){
	var api = SystemProp.contentServiceUrl+'/getNewsList.php?product=forex&jsoncallback=?';
	$.post(api,{cat:cat,ln:ln,isTc:false,startAt:cPage,num:num,onDate:onDate,endDate:endDate,keywords:keywords},function(json){
		if(json.msg != 'ok'){
			$('.news-add-more').remove();//.removeClass('tc-add-more').addClass('tc-no-more');
			return;
		}
		var ddContent = '';
		var list = '';
		$.each(json.data,function(i,val){
			var valTitle = "";
			if(val.title.length>45){
				valTitle = val.title.substr(0,45) + '...';
			}else{
				valTitle = val.title;
			}
			list +='<li><a href="http://www.aetoscg.com/cn/static/pageStatic/js/news-content.html?aid='+val.article_id+'" target="_blank" rel="'+val.article_id+'"><span class="time">'+val.add_time+'</span>'+valTitle+'</a></li>';
		})
		$('#main > div.news > ul').find('div.replaceImg').remove();
		if(isSearch){
			$('#main > div.news > ul').html('');
		}
		$('#main > div.news > ul').append(list).show();
		$('#main > div.news > dl > dd').html(ddContent).parent().show();
	},'json')
}
/**
 * [getMarketCommentaryList description]
 * @param  {[type]}  cPage    [description]
 * @param  {[type]}  ln       [description]
 * @param  {[type]}  cat      [description]
 * @param  {[type]}  num      [description]
 * @param  {[type]}  onDate   [description]
 * @param  {[type]}  endDate  [description]
 * @param  {[type]}  keywords [description]
 * @param  {Boolean} isSearch [description]
 * @return {[type]}           [description]
 */
function getMarketCommentaryList(cPage,ln,cat,num,onDate,endDate,keywords,isSearch){
	var api = SystemProp.contentServiceUrl+'/getNewsList.php?jsoncallback=?';
	$.post(api,{cat:cat,ln:ln,isTc:false,startAt:cPage,num:num,onDate:onDate,endDate:endDate,keywords:keywords},function(json){
		
		if(json.msg != 'ok'){
			$('#main > div.news > ul').append('没有数据'); 
			$('.news-add-more').remove();//.removeClass('tc-add-more').addClass('tc-no-more');
			$('.mc-add-more').remove();
			return;
		}
		var list = '';
		var downloadUrl = SystemProp.contentServiceUrl.replace('api','');
		$.each(json.data,function(i,val){
			list +='<li><a href="'+downloadUrl+val.file_url+'" target="_blank" rel="'+val.article_id+'"><span class="time">'+val.add_time+'</span>'+val.title+'</a></li>';
		});
		$('#main > div.news > ul').find('div.replaceImg').remove();
		$('#main > div.news > ul').append(list);
	},'json');
}


/**
 * [showIndexNewsList description]
 * @param  {[type]} cPage [description]
 * @param  {[type]} ln    [description]
 * @param  {[type]} num   [description]
 * @return {[type]}       [description]
 */
function showIndexNewsList(cPage,ln,num){
	var api =SystemProp.contentServiceUrl+'/getNewsList.php?product=forex&jsoncallback=?';
	$.post(api,{cat:'33',ln:ln,isTc:false,startAt:cPage,num:num},function(json){
		var ddContent = '';
		var list = '';
		$.each(json.data,function(i,val){	
				if(i == 0){
					ddContent = val.title;
					var valContent = "";
					if(ddContent.length>45){
						valContent = ddContent.substr(0,45) + '...';
					}else{
						valContent = ddContent;
					}
					ddContent = '<a href="http://www.aetoscg.com/cn/static/pageStatic/js/news-content.html?aid='+val.article_id+'" target="_blank" rel="'+val.article_id+'">'+ valContent + "</a>";
				}else{
					var valTitle = "";
					if(val.title.length>19){
						valTitle = val.title.substr(0,19) + '...';
					}else{
						valTitle = val.title;
					}
					list +='<li><a href="http://www.aetoscg.com/cn/static/pageStatic/js/news-content.html?aid='+val.article_id+'" target="_blank" rel="'+val.article_id+'"><span class="time">'+val.add_time+'</span>'+valTitle+'</a></li>';
				}
		})
		$('#main > div.news > ul').html(list).show();
		$('#main > div.news > dl > dd').html(ddContent).parent().show();
		$('#main > div.news').find('div.replaceImg').remove();
	},'json')
}

/**
 * [getNewsContentById description]
 * @param  {[type]} aid [description]
 * @param  {[type]} ln  [description]
 * @return {[type]}     [description]
 */
function getNewsContentById(aid,ln){
	var api = SystemProp.contentServiceUrl+'/getNewsList.php?product=forex&jsoncallback=?';
	$.post(api,{act:'read',id:aid,ln:ln,isTc:false},function(jsonContent){
		if(!!jsonContent.title){
			if(jsonContent.title)
			{
				$('#news > h1').html(jsonContent.title);
				titleReplace(jsonContent.title);
			}
			if(jsonContent.content)
				$('#news > .news-con').html('<p>'+jsonContent.content+'</p>');
			if(jsonContent.add_time)
				$('#news > .published').html(jsonContent.add_time);
			if(jsonContent.source)
				$('#news > .news-tip > p:eq(0)').html(jsonContent.source);
		}else{
			window.location.href="http://www.aetoscg.com/cn/static/pageStatic/js/news.html";
		}
	},'json')
}

$(document).ready(function(e) {

	// getNewsList(1,'zh-cn',SystemProp.contentServiceUrl+'/getNewsList.php?jsoncallback=?','20','','','',false);
	
	/**
	 * 加载更多新闻
	 */
	$('.news-add-more').bind('click',function(){
		var _page = $(this).attr('page');	//当前页码
		var onDate = $('#onDate').val(),endDate = $('#endDate').val(),keywords = $('#keywords').val();
		var _cat = $('#catid').val();
		$(this).attr('page',parseInt($(this).attr('page'))+1);	//当前页码加1
		getNewsList(_page,'zh-cn',_cat,'20',onDate,endDate,keywords,false);
	});
	/**
	 * 新闻搜索
	 */
	$('#btn-news-search').on('click',function(){
		var onDate = $('#onDate').val(),endDate = $('#endDate').val(),keywords = $('#keywords').val();
		var _cat = $('#catid').val();
		getNewsList(1,'zh-cn',_cat,'20',onDate,endDate,keywords,true);
	});

	/**
	 * 加载更多汇评
	 */
	$('.mc-add-more').bind('click',function(){
		var _page = $(this).attr('page');	//当前页码
		var onDate = $('#onDate').val(),endDate = $('#endDate').val(),keywords = $('#keywords').val();
		var _cat = $('#catid').val();
		$(this).attr('page',parseInt($(this).attr('page'))+1);	//当前页码加1
		getMarketCommentaryList(_page,'zh-cn',_cat,'20',onDate,endDate,keywords,false);
	});
	

	
});
