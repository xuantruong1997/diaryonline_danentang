	<?php
		include 'connect.php';
		$json = file_get_contents('php://input');
		$obj = json_decode($json,true);

		$username 	=	$obj['username'];
		$title 		= 	$obj['title'];
		$content 	=	$obj['content'];
		$date 		= 	$obj['date'];
		$note 		= 	$obj['note'];

		// $username 	=	"xuantruong";
		// $title 		= 	"#001";
		// $content 	=	"Hôm nay đi tập Gym 1 mình chán. Uowsc gì có ai đó để đấm 1 phát hahah";
		// $date 		= 	"2019-10-11";
		// $note 		= 	"Tired";

		$sql = "SELECT id_user FROM user WHERE username ='$username'";
		$result = $db->query($sql);
		if (mysqli_num_rows($result) > 0) {
			while($row = $result->fetch_assoc()) {
				$id_user = $row['id_user'];
			}
		}
		$Sql_Query = "INSERT INTO diary VALUES (null,'$id_user','$title', '$content', '$date','$note')";
		if(mysqli_query($db,$Sql_Query)){
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