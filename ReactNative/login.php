<?php
include 'connect.php';
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);

	$username = $obj['username'];
	$password = $obj['password'];
	$Sql_Query = "SELECT * FROM user WHERE username = '$username' and password = '$password' ";
	 
	$check = mysqli_fetch_array(mysqli_query($db,$Sql_Query));
	 
	if(isset($check)){ 
		$SuccessLoginMsg = 'Trung Khop';
		$SuccessLoginJson = json_encode($SuccessLoginMsg);
		echo $SuccessLoginJson ;
	}
	 
	else{
		$InvalidMSG = 'Thông tin đăng nhập chưa chính xác. Vui lòng nhập lại!' ;
		$InvalidMSGJSon = json_encode($InvalidMSG);
	 	echo $InvalidMSGJSon ; 
	}
	mysqli_close($db);

?>