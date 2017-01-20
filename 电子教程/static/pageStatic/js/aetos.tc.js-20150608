/**
 * silva.lim
 * 2014-03-26
 * QQ: 1520002068
 */


 //TRADING CENTRAL DAILY COMMENTARY TC列表
 function showIndexTcList(cPage,ln,num){
 	var api = SystemProp.contentServiceUrl+'/getNewsList.php?product=forex&jsoncallback=?';
 	$.post(api,{cat:'37',ln:ln,isTc:true,startAt:cPage,num:num},function(json){
 		if(json.msg != 'ok'){
 			alert('^-^数据加载完了~~~');
 			$('.tc-add-more').remove();//.removeClass('tc-add-more').addClass('tc-no-more');
 			return;
 		}

 		var list = '';
 		$.each(json.data,function(i,val){	
 				list +='<li><a href="http://www.aetoscg.com/cn/static/pageStatic/js/tc-content.html?aid='+val.article_id+'" target="_blank" rel="'+val.article_id+'"><span class="time">'+val.add_time+'</span>'+val.title+'</a></li>';
 		})
 		//把padding 图片去掉
 		//$(opt.div).find('div.replaceImg').remove();
 		$('#main > div.trading > ul').find('div.replaceImg').remove();
 		// if(cPage%3 == 0){
 		// 	$('#main > div.trading > ul').html('').append(list);
 		// }else{
 		// 	$('#main > div.trading > ul').append(list);
 		// }
 		$('#main > div.trading > ul').append(list);
 	},'json')
 }

 //根据id获取TC信息 
 function getTcContentById(aid,ln){
 	var api = SystemProp.contentServiceUrl+'/getNewsList.php?product=forex&jsoncallback=?';
 	$.post(api,{act:'read',id:aid,ln:ln,isTc:true},function(jsonContent){
 		if(jsonContent.title){
 			$('title').html(jsonContent.title);
 			$('.pop-window > .title > span').html(jsonContent.title);
 		}
 		if(jsonContent.content){
 			var contentHtml = '<p>'+jsonContent.content+'</p>';
 			if(jsonContent.image.length >0){
 				contentHtml = '<img src="'+jsonContent.image+'"/>'+contentHtml;
 			}
 			$('.pop-content').html(contentHtml);
 		}
 	},'json')
 }
 
 //根据id获取TC信息 页面用
 function getTcContentByIdPage(aid,ln){
	var api = SystemProp.contentServiceUrl+'/getNewsList.php?product=forex&jsoncallback=?';
	$.post(api,{act:'read',id:aid,ln:ln,isTc:true},function(jsonContent){
		if(jsonContent.title)
		{
			$('#news > h1').html(jsonContent.title);
			titleReplace(jsonContent.title);
		}
		if(jsonContent.content)
			var contentHtml = '<p>'+jsonContent.content+'</p>';
 			if(jsonContent.image.length >0){
 				contentHtml = '<img src="'+jsonContent.image+'"/>'+contentHtml;
 			}
			$('#news > .news-con').html('<p>'+contentHtml+'</p>');
		if(jsonContent.add_time)
			$('#news > .published').html(jsonContent.add_time);
		if(jsonContent.source)
			$('#news > .news-tip > p:eq(0)').html(jsonContent.source);
		
	},'json')
}

 //TC列表 头条
 function showTopTc(ln,num,divClass){
 	var api = SystemProp.contentServiceUrl+'/getNewsList.php?product=forex&jsoncallback=?';
 	$.post(api,{cat:'37',ln:ln,isTc:true,startAt:1,num:num},function(json){
 		var list = '';
 		$.each(json.data,function(i,val){	
 				list += '<div class="tc-item-img"><a href="http://www.aetoscg.com/cn/static/pageStatic/js/tc-content.html?aid='+val.article_id+'"  target="_blank"> <img src="'+val.image+'" width="238" /><br />'+val.title+'</a></div>';
 		})
 		
 		$(divClass).html(list);
 	},'json')
 }

$(document).ready(function(){

	$('.tc-add-more').bind('click',function(){
		var _page = $(this).attr('page');	//当前页码
		$(this).attr('page',parseInt($(this).attr('page'))+1);	//当前页码加1
		showIndexTcList(_page,'zh-cn','20');
	});

});