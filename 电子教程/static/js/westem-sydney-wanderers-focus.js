// JavaScript Document
$(function(){
$.fn.indexbanner=function(options){
	var defaults={
		indexAuto:7000, //自动切换时间
		indexLength:0,
		index:0
	}
	
	var options=$.extend(defaults,options);
	
	this.each(function(){
		var $this=$(this);
		var $li=$this.find('.slides li');
		options.indexLength=$li.length;
		//遍历小图标
		var navHTML='<ol class="flex-control-nav">';
		for(var i=1;i<=options.indexLength;i++){
			navHTML=navHTML+'<li><a  class="'+ (i==1?"flex-active":"")+'">'+i+'</a></li>';
		}
		navHTML=navHTML+'</ol><div class="flexbtn"><a class="flex-prev" href="#"></a><a class="flex-next" href="#"></a></div>';
		$this.append(navHTML);
		var $a=$this.find(".flex-control-nav a")
		$li.eq(0).nextAll().fadeOut();

		
		 
		
		//切换
		function auto(){
			clearTimeout(t);
			$li.eq(options.index).stop().css({"z-index":"2"}).fadeIn();
			$li.not($li.eq(options.index)).css({"z-index":"1"}).hide();
			$this.find(".flex-control-nav a").removeClass("flex-active").eq(options.index).addClass('flex-active');
			t=setTimeout(nextAuto,options.indexAuto);
		}
		
		//下一个切换
		function nextAuto(){
			options.index=options.index>=(options.indexLength-1)?0:(options.index+1);
			auto();
		}
		
		//上一个切换
		function prevAuto(){
			options.index=options.index<=0?(options.indexLength-1):(options.index-1);
			auto();
		}
		
		var t=setTimeout(nextAuto,options.indexAuto); //定时器对象表达式
		
		//点击小图标
		$a.on('click',function(e){
			var i=$(this).parent().index();
			options.index=i;
			auto();
			e.preventDefault(); 
			//return false;
		})
		
		//左右点击
		$(this).on('click','.flex-next',function(e){
			nextAuto();
			e.preventDefault(); 
		})
		$(this).on('click','.flex-prev',function(e){
			prevAuto()
			e.preventDefault(); 
		})
		var s=0;
		//鼠标上取消切换
		$this.mouseenter(function(){
				clearTimeout(t);
				console.info(s++)
		});
		$this.mousemove(function(){
				clearTimeout(t);
		});
		//鼠标离开
		$this.mouseleave(function(){
			t=setTimeout(nextAuto,options.indexAuto);
		});
		
	})
}
})