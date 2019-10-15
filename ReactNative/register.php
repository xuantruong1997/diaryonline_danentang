<?php
	include 'connect.php';
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);

	$username =	$obj['username'];
	$password =	$obj['password'];


	$qr = "SELECT * FROM user WHERE username = '$username'";
	$result = $db->query($qr);

	if (mysqli_num_rows($result) > 0) {
		$msgExist = 'Tài khoản đã tồn tại';
		$msgExistJson = json_encode($msgExist);
		echo $msgExistJson;
	}
	else{
		$Sql_Query = "INSERT INTO user VALUES (null,'$username','$password')";
		if(mysqli_query($db,$Sql_Query)){
			$MSG = 'Thanh Cong' ;
			$json = json_encode($MSG);
			 echo $json ;	 
		}
		else{	 
		 	$MSGTry = 'Thử lại' ;
			$jsonTry = json_encode($MSGTry);
			 echo $jsonTry ; 
		}
	}
 	mysqli_close($db);

 ?>