function getTotalSum(table_id, input, dest_currency){
	$('#'+table_id+' .left_panel_footer_total').html('<center><i class="fa fa-spinner fa-spin"></i></center>');
	$.ajax({
		data : {
			"ccy_info" : input,
			"dest" : dest_currency
		},
		type : "POST",
		url : "conv.php",
		success : function (data) {
			$('#'+table_id+' .left_panel_footer_total').html(parseFloat(data).formatMoney(2, '.', ' '));
			$('#'+table_id+' .left_table_current_currency').html(dest_currency);
		}
	});
}


//MT4 account opening related code
function change_currencies(){
	var type = $("#mq_add_account_type").val();
	var ib_type = $("#mq_add_account_ib_select").val();
	var currency = $("#mq_add_account_currency")[0].selectedIndex;
	var code = $("#mq_add_account_ib_code").val().trim();
	
	var source = options[0]["type_"+type];
	if(ib_type == 1){
		if(code.length == 10){
			code = md5(code.toUpperCase());
			if(options[2][code] != undefined){
				source = options[2][code]["type_"+type]
			}else{
				source = options[2][0]["type_"+type];
			}
		}
	}
	if(ib_type == 2){
		source = options[1]["type_"+type];
	}
	reset_currencies(source);
}

function ib_selector(){
	var type = ($("#mq_add_account_type").val() != null ? $("#mq_add_account_type").val() : 1);
	var ib_type = $("#mq_add_account_ib_select").val();
	var old_currency = $("#mq_add_account_currency").val();
	if(ib_type == 1){
		//new ib
		$('#ib_code_block').show();
		reset_types(options[2]["0"]);
		reset_currencies(options[2]["0"][Object.keys(options[2]["0"])[0]]);
		$("#mq_add_account_ib_code").prop('readonly', false);
		$("#mq_add_account_ib_code").val("");
		
	}else if(ib_type == 2){
		//old ib
		$('#ib_code_block').show();
		reset_types(options[1]);
		reset_currencies(options[1][Object.keys(options[1])[0]]);
		$("#mq_add_account_ib_code").val(base_ib);
		$("#mq_add_account_ib_code").prop('readonly', true);
		
	}else{
		//no ib
		$('#ib_code_block').hide();
		reset_types(options[0], 2);
		reset_currencies(options[0][Object.keys(options[0])[0]], 109);
		$("#mq_add_account_ib_code").prop('readonly', false);
	}
}

function custom_ib(){
	var ib_type = $("#mq_add_account_ib_select").val();
	var code = $("#mq_add_account_ib_code").val().trim();
	if(code.length == 10 && ib_type == 1){
		code = md5(code.toUpperCase());
		if(options[2][code] != undefined){
			reset_types(options[2][code]);
			reset_currencies(options[2][code][Object.keys(options[2][code])[0]]);
		}
	}
}

function reset_currencies(cur_source, def){
	$("#mq_add_account_currency").empty();
	$.each(cur_source["currency_list"], function(key, value) {
		$("#mq_add_account_currency").append("<option data-message='"+JSON.stringify(value.message)+"' value='"+key+"'>"+value.code+"</option>");
		//$('#mq_add_account_currency').append($("<option data-message='"+JSON.stringify(value.message)+"'>", { value : key }).text(value.code));
	});
	if(typeof def !== 'undefined'){
		if($('#mq_add_account_currency option[value='+def+']').length !== 0){
			$('#mq_add_account_currency').val(def);
		}
	}else{
		$('#mq_add_account_currency').prepend('<option val="-1" disabled>---</option>');
		$("#mq_add_account_currency")[0].selectedIndex = 0;
	}
}

function reset_types(type_source, def){
	$("#mq_add_account_type").empty();
	$.each(type_source, function(key, value) {   
		$('#mq_add_account_type').append($('<option>', { value : value["type"] }).text(value["name"]));
	});
	if(typeof def !== 'undefined'){
		if($('#mq_add_account_type option[value='+def+']').length !== 0){
			$('#mq_add_account_type').val(def);
		}
	}else{
		$('#mq_add_account_type').prepend('<option val="-1" disabled>---</option>');
		$("#mq_add_account_type")[0].selectedIndex = 0;
	}
}

function ajax_get_page(input_data, target){
	$("#mt4_"+input_data["id"]+", #mt4_resp_"+input_data["id"]).removeClass("blurring");
	$(".trading_accounts_row:not(#mt4_"+input_data["id"]+"),.rectangle_trading_accounts:not(#mt4_resp_"+input_data["id"]+")").addClass("blurring");
	$('.ajax_div').not('#ajax_' + input_data["id"]).addClass('hidden');
	$(".ajax_error_div").html("").addClass('hidden');
	ResetTimers();
	$.ajax({
		type : "POST",
		url : "index.php",
		data : input_data,
		beforeSend : function () {
			$("#" + target).html('');
			$("#" + target).html('<div style="text-align: center;"><i class="fa fa-spinner fa-spin fa-4x spinner"></i></div>');
			$("#" + target).show();
		},
		success : function (data) {
			$("#" + target).removeClass("hidden");
			//$("#" + target+ "_error").removeClass("hidden");
			$("#" + target).html(data);
			$('[data-toggle="tooltip"]').tooltip(); 
			$('.show_tooltip').tooltip({placement:'top'});
		}
	});
}

function ajax_submit(form_id, target){
	$(".ajax_error_div").html("");
	$("#"+form_id+" :input").removeClass("input-field-error");
	
	$.ajax({
		type : "POST",
		url : "index.php",
		data : $("#"+ form_id).serialize(),
		dataType : "json",
		beforeSend : function () {
			$("#" + target).html('');
			$("#" + target).html('<div style="text-align: center;"><i class="fa fa-spinner fa-spin fa-4x spinner"></i></div>');
			$("#" + target).removeClass('hidden');
			$('.clear_me_after').val('');
			$('#deposit_button,#withdrawal_button,#internal_button').prop('disabled', true);
			$('input[type="password"]').val('');
			$("input:checkbox").prop("checked", false);
		},
		success : function (data) {
			if (!data.success){
				for (var key in data.errors){
					$("#" + key).addClass("input-field-error");
					//console.log(key);
				}
				$("#" + target).html(data.message);
			}else{
				$("#" + target).html(data.message);
				//$('.clear_me_after').val('');
				//$('input[type="password"]').val('');
				//$("input:checkbox").prop("checked", false);
			}
		},
		error : function (xhr, ajaxOptions, thrownError){
			$("#" + target).html('');
		}
	});
}

function ajax_submit_table(form_id){
	$.ajax({
		type : "POST",
		url : "index.php",
		data : $("#"+ form_id).serialize(),
		dataType : "json",
		success : function (data) {
			if (!data.success){
				window.location.hash = 'form_messages';
				$("#form_messages").html(data.message);
			}else{
				$('#responsive_sortable').bootgrid('reload');
			}
		}
	});
}

function convertCurrency(source_curr, source_amount, dest_curr, target){
	$.ajax({
		data : {
			"ccy_info" : [{"currency":source_curr,"amount":source_amount}],
			"dest" : dest_curr
		},
		type : "POST",
		url : "conv.php",
		success : function (data) {
			$('#' + target).val(parseFloat(data).formatMoney(2, '.', ''));
		}
	});
}
function close_ajax(){
	$(".trading_accounts_row,.rectangle_trading_accounts").removeClass("blurring");
	$(".ajax_div, .ajax_error_div").html('');
	$(".ajax_div, .ajax_error_div").addClass('hidden');
}

function changeMessage(timeOutCounter) {
	var current = $('#minute_counter').html();
	var newer = Math.ceil((timeOutCounter / 60));
	if (timeOutCounter > 60) {
		if (current != newer) {
			$('#minute_counter').html(newer);
		}
	} else {
		$('#minute_counter').html(timeOutCounter);
		if (timeOutCounter > 1) {
			$('#counter_text').html(UNITS[0]);
		} else {
			$('#counter_text').html(UNITS[1]);
		}
	}
}


function StartTimers() {
    warningTimer = setTimeout("IdleWarning()", timoutWarning * 1000);
    timeoutTimer = setTimeout("IdleTimeout()", (timoutWarning + messageTimeout) * 1000);
}

function ResetTimers() {
	clearTimeout(warningTimer);
	clearTimeout(timeoutTimer);
	clearInterval(messageTime);
}
function RefreshSession(){
	$.ajax({
		type : "POST",
		url : "index.php?task=2002",
		success : function (data) {
			ResetTimers();
		}
	});
}

function IdleWarning() {
	var timeOutCounter = messageTimeout;
	$('#minute_counter').html(messageTimeout / 60);
	$('#session_logout').modal('show');
	messageTime = setInterval(function () {
			changeMessage(timeOutCounter);
			timeOutCounter--;
		}, 1000);
}

function reactToFileInput(input){
	var name = $(input).val().replace(/\\/g, '/').replace(/.*\//, '');
	var field = $(input).parents('.input-group').find(':text')
	if( field.length ) {
		field.val(name);
	}
	var elem = $(input).parents(".upload_elem").next(".upload_elem");
	$(elem).show();
	$(elem).find("input").attr("disabled", false);
}

function showLeverage(input) {
	var old_lev = parseInt($('#change_leverage_old_leverage').val());
	var new_lev = parseInt($('#change_leverage_new_leverage').children("option:selected").text().split(":")[1]);
	console.log(new_lev);
	if (new_lev < old_lev) {
		$('#leverage_popup').modal('show');
	} else {
		ajax_submit('mt4_leverage_change_form', 'ajax_error_'+input);$('#leverage_popup').modal('hide');return false;
		//changeLeverage(input);
	}
}