<?php
	include 'connect.php';
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);

	$username =$obj['username'];
	$id_diary = $obj['id_diary'];


	$qr = "SELECT id_user FROM user WHERE username = '$username'";
	$result = $db->query($qr);

	$Array=[];
	$qr="SELECT * FROM diary where id_diary = '$id_diary' AND id_user in (select id_user from user)";
	$data= $db->query($qr);

	while ($row = mysqli_fetch_assoc($data)) {
		array_push($Array, new Detail(
			$row['id_user'],
			$row['title'],
			$row['content'],
			$row['date'],
			$row['note']));
	}
	echo json_encode($Array);

	class Detail{
		function Detail($id_user,$title,$content,$date,$note){
			$this->id_user=$id_user;
			$this->title=$title;
			$this->content=$content;
			$this->date=$date;
			$this->note=$note;
		}
	}

 ?>