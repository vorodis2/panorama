<?php
	$file = $_POST['file']; 
	$data = base64_decode(substr($_POST['image'], strpos($_POST['image'], 'base64,') + 7));
	$fp = fopen($file, "wb"); // ("r" - считывать "w" - создавать "a" - добовлять к тексту)
	fwrite($fp, $data);
    fclose ($fp);
?>



