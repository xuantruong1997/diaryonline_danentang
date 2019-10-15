<?php 
	include 'connect.php';
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);

	$username = $obj["username"];
	$id_diary = $obj["id_diary"];
	$title = $obj["title"];
	$content = $obj["content"];
	//$date = $obj["date"];
	$note = $obj["note"];

	// $username = "xuantruong";
	// $id_diary = "13";
	// $title = "chồng thốiiii";
	// $content = "Hôm nay NÔ đánh rắm hơi nhiều. Xin lỗi Hĩm nhé huhuu";
	// //$date = $obj["date"];
	// $note = "Mãi Yêu hahahhaha";

	//Lay iduser
	$sql1 = "SELECT id_user FROM user WHERE username ='$username'";
		$result1 = $db->query($sql1);
		if (mysqli_num_rows($result1) > 0) {
			while($row = $result1->fetch_assoc()) {
				$id_user = $row['id_user'];
			}
		}


	$result = "UPDATE diary SET title = '$title', content = '$content', note='$note' WHERE id_diary = '$id_diary' AND id_user = '$id_user'";
	if ($db->query($result)) {
		$MSG = 'Xong' ;
		$json = json_encode($MSG);
		echo $json ;	 
		}
	else{	 
		$MSGTry = 'Thử lại' ;
		$jsonTry = json_encode($MSGTry);
		echo $jsonTry ; 
	}
	
 	mysqli_close($db);
?>