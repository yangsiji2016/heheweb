function showDealingRoom(rs){
	if(rs.code == 200 && rs.data.hasLegalMt4 == 1){
		var dealingRoomStr = "<br />"+
		"<font style='font-size:15px; color:#D80C18;line-height:35px;'>交易室电话*：+61 (2) 9929 2033 </font>"+
		"<br />"+
		"* 交易室电话只为客户提供平仓服务。由于市场价格经常变动，交易员提供的报价，有效性最多维持3秒钟。如果市场价格瞬间波动2点(以外汇为例)或以上，交易员将重新提供报价。";
		$('#jiaoyishi').html(dealingRoomStr).addClass('txt');
	}
}
$(document).ready(function(){
	$.getScript(SystemProp.memberServerUrl+"/content/get-live-chat-msg!callback.json?callback=showDealingRoom");
});
