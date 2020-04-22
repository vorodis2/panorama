<?php




//require('phpmailer/class.phpmailer.php');
require('phpmailer/PHPMailerAutoload.php');

$mail = new PHPMailer();


$mail->CharSet = 'UTF-8';

//$mail->From      = $_POST['mailMeil'];//'xz@gmail.com';//от кого
$mail->From      = 'vorodis2jm@gmail.com';//'xz@gmail.com';//от кого
$mail->FromName  = 'stair';//
$mail->Subject   = $_POST['mailTitle'];
$mail->Body      = $_POST['mailText'];
//$mail->addAddress('vorodis2jm@gmail.com'); // mail получателя
$mail->AddAddress($_POST['mailmy']);//куда



// Прикрепление файлов
for ($ct = 0; $ct < count($_FILES[‘userfile’][‘tmp_name’]); $ct++) {
    $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES[‘userfile’][‘name’][$ct]));
    $filename = $_FILES[‘userfile’][‘name’][$ct];

    if (move_uploaded_file($_FILES[‘userfile’][‘tmp_name’][$ct], $uploadfile)) {
        $mail->addAttachment($uploadfile, $filename);
    } else {
       // $msg .= ‘Failed to move file to ‘ . $uploadfile;
    }
} 
// Результат
if(!$mail->send()) {
 echo 'Message could not be sent.';
 echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
 echo 'ok v3. ! '.$_POST['mailTitle'].$_POST['mailText'];
}
/*
$mail->Send();
echo 'mailMeil: '.$_POST['mailMeil'].' mailmy= '.$_POST['mailmy'];*/


?>
