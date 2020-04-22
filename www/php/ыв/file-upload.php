<?php

require './lib/PHPMailerAutoload.php';

$msg = "";

function moveFiles($field) {
    $TEMP_FOLDER = 'temp/';
    $list = array();
    
    if(!$_FILES[$field]) return $list;
    
    if(!dir($TEMP_FOLDER)) {
        mkdir($TEMP_FOLDER, 0777);
    }
    
    foreach ($_FILES[$field]["error"] as $key => $error) {
        if ($error == UPLOAD_ERR_OK) {
            $tmp_name = $_FILES[$field]["tmp_name"][$key];
            $name = $_FILES[$field]["name"][$key];

            $filePath = $TEMP_FOLDER.basename($name);
            move_uploaded_file($tmp_name, $filePath);
            
            array_push($list, $filePath);
        }
    }
    return $list;
}

function sendToUser() {
    global $files, $msg;
    
    $msg .= "user: ";
    
    $mail = new PHPMailer;
    $mail->Subject = 'Staircase';
    $mail->CharSet = 'utf-8';
    $mail->Body = $_POST['text'];
    $mail->From = $_POST['mail'];
    $mail->FromName = 'Staircase';
    
    $mail->addAddress($_POST['usr_mail'], $_POST['usr_name']);
    
    foreach($files as $path) {
        $mail->addAttachment($path);
    }
    
    if (!$mail->send()) {
        $msg .= "ERR: " . $mail->ErrorInfo;
    } else {
        $msg .= "OK";
    }
}






function sendToOwner() {
    global $files, $msg, $add_files;
    $mytext="";
	
	$fp = @fopen("text.txt", "r+");
	if ($fp) 
	{
		while (!feof($fp))
		{
			$mytext = fgets($fp, 999);
		//echo $mytext."<br />";
		}
	}
	$mytext = $mytext +1;	
	fclose($fp);
	
	
  
	$fp2 = fopen ("text.txt", "w");  
	fwrite($fp2,$mytext);  
	fclose($fp2); 
	

	
	$kol = "K";
	if ($mytext < 100) $kol = $kol ."0";
	if ($mytext < 1000) $kol = $kol ."0";
	
	
	
	
	$ipUzer = $_SERVER["REMOTE_ADDR"];
	/*$country = geoip_country_name_by_name($ipUzer);
	$city = geoip_region_name_by_code($ipUzer);
	*/
    $msg .= "; owner: ";    
    $mail = new PHPMailer;
    $mail->Subject = 'Новый заказ '. $kol .$mytext."       ";
    $mail->CharSet = 'utf-8';
    $mail->Body = $ipUzer."\n" ."Мой телефон: " . $_POST['usr_phone']
        . "\n" . $_POST['usr_text'] . "\n" . $_GET['back_url'];
		
    
    $mail->From = $_POST['usr_mail'];
    $mail->FromName = $_POST['usr_name'];
    
    $mail->addAddress($_POST['mail'], 'Staircase');
    
    foreach($files as $path) {
        $mail->addAttachment($path);
    }
    
    foreach($add_files as $path) {
        $mail->addAttachment($path);
    }
    
    if (!$mail->send()) {
        $msg .= "ERR: " . $mail->ErrorInfo;
    } else {
        $msg .= "OK";
    }
}



$files = moveFiles("Filedata");
//sendToUser();

$add_files = moveFiles("Userdata");
sendToOwner();

echo $msg;
?>
