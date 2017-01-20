$(function($){

$("#submit").click(function(){
  var emailRegex = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;
  var phoneRegex = /^\+?[0-9-()\s]+$/;
  var nameRegex = /^[\u2E80-\u9FFF\sa-zA-Z]+$/;
  var name = $("#name").val();  
  var email = $("#email").val();  
  var contact = $("#contact").val();  
  var phone = $("#phone").val();  
  var content = $("#message").val();

  if(!nameRegex.test(name)){
    alert("请输入中文或英文姓名");
    return;
  }
  if(!content){
    alert("请输入您的问题");
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
      url : SystemProp.appServerUrl+"/content/send-question!callback.json?ln=0",
      async : false,
      type : "POST",
      dataType:'jsonp',
      data : {"name":name,"email":email,"contact":contact,"phone":phone,"content":content},
      success: function(rs){
      if(rs.code == 200){
        alert("您的问题已经提交，谢谢。");
        $("#name").val(''); 
        $("#email").val('');  
        $("#contact").val('');  
        $("#phone").val('');  
        $("#message").val('');
      }
      else{
        alert(rs.message);
      }
      }
    });
  
});

  
})