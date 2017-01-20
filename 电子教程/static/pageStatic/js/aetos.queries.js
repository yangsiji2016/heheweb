/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-04-03 11:40:32
 * @version $Id$
 */

 $(document).ready(function(){

 $("#submit").click(function(){
 	var emailRegex = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;
 	var phoneRegex = /^\+?[0-9-()\s]+$/;
 	var nameRegex = /^[\u2E80-\u9FFF\sa-zA-Z]+$/;
 	var name = $("#name").val();	
 	var email = $("#email").val();	
 	var phone = $("#phone").val();	
 	var titleType = $("#title").val();	
 	var content = $("textarea[name=content]").val();
 	if(titleType == '0'){
 		alert("请选择您查询的标题");
 		return;
 	}
 	if(!nameRegex.test(name)){
 		alert("请输入中文或英文姓名");
 		return;
 	}
 	if(!content){
 		alert("请输入您查询的内容");
 		return;
 	}
 	if(!emailRegex.test(email)){
 		alert("请输入真实有效的电邮");
 		return;
 	}
 	if(!phoneRegex.test(phone)){
 		alert("请输入真实有效的电话号码");
 		return;
 	}
 	
 	$.ajax({
 		  url : SystemProp.appServerUrl+"/content/send-question!callbackEnquiry.json?ln=0",
 		  async : false,
 		  type : "POST",
 		  dataType:'jsonp',
 		  data : {"name":name,"email":email,"phone":phone,"titleType":titleType,"content":content},
 		  success: function(rs){
 			if(rs.code == 200){
 				alert("您的问题已经提交，谢谢。");
 				$("#name").val('');	
 				$("#email").val('');
 				$("#qtitle").val('请选择');	
 				$("#phone").val('');	
 				$("#title").val(0);	
 				$("textarea[name=content]").val('');
 			}
 			else{
 				alert(rs.message);
 			}
 		  }
 		});
 		
 	})

 })