<?php
header("Content-Type:text/html; charset=utf-8");

$oldPwd = $_POST['oldPwd'];

if($oldPwd == "123456"){
        echo '"密码修改成功"';
    } else {
        echo '0';
        }


/*$arr = array();

if(return) {
$arr['status'] = 1;
} else {
$arr['status'] =0;
}*/
//echo json_encode($arr);

?>
