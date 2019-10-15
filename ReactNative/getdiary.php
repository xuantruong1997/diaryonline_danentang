<?php
	include 'connect.php';
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);

	// $username = 'xuantruong';
	$username =$obj['username'];

	$qr = "SELECT id_user FROM user WHERE username = '$username'";
	$result = $db->query($qr);
	if (mysqli_num_rows($result)>0) {
		while ($row=$result->fetch_assoc()) {
			$id_user=$row['id_user'];
		}
	}

	$sql="SELECT * FROM diary where id_user ='$id_user'";
	$query= $db->query($sql);

	$Array = array();

	class Diary{

		var $id_diary;
		var $id_user;
		var $title;
		var $content;
		var $date;
		var $note;

		function Diary($id_diary,$id_user,$title,$content,$date,$note){
			$this->id_diary=$id_diary;
			$this->id_user=$id_user;
			$this->title=$title;
			$this->content=$content;
			$this->date=$date;
			$this->note=$note;
		}
	}
	while ($row = mysqli_fetch_assoc($query)) {
		array_push($Array, new Diary(
			$row['id_diary'],
			$row['id_user'],
			$row['title'],
			$row['content'],
			$row['date'],
			$row['note']));
	}
	echo json_encode($Array);

 ?>