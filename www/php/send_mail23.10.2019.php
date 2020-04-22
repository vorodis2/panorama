<?php
//Почта получателя
$mailTo = $_POST['mailmy'];
//Почта отпровителя
$mailFrom = $_POST['mailMeil'];
//Заголовок письма
$mailTitle = $_POST['mailTitle'];
//Текст письма
$mailText = $_POST['mailText'];
//Путь к папке для файлов
$mailDirect = $_POST['mailDirect'];


/*
$fileData = base64_decode($_POST['fileData']);
$fileName = $_POST['fileName']. '.png';
file_put_contents($fileName, $fileData);*/

/*
$arrayLink = $_POST['arrayLink'];
$arrayBase64 = $_POST['arrayBase64'];

for ($i=0; $i < count($arrayLink); $i++) { 
    $fileData= $arrayLink[$i];
    $fileName=$arrayLink[$i];
    if($arrayBase64){
        if($arrayBase64[$i]){
            $fileData= base64_decode($arrayBase64[$i]);
        }
    }
    file_put_contents($fileName,$fileData);    
}*/





function xLog($msg){
    global $mailTo, $fileName;
    $res = date("d.m.y H:i") ."; To: $mailTo; pic: $fileName" . "; $msg";
    $log = fopen("uplog.log", "a");
    fwrite($log, "\n$res");
    fclose($log);
    
    return $res;
}
// вариант 1
/*require_once 'lib/xmail.php';
if(XMail($mailFrom, $mailTo, $mailTitle, $mailText, $fileName) === true) {
    echo "XMail Success";
}
else {
    echo "XMail Failure";
}*/

// вариант 2
require_once 'lib/libmail.php';
$m = new Mail("UTF-8");
$m->From($mailFrom);
$m->To($mailTo);
$m->Subject($mailTitle);
$m->Body($mailText);
/*$m->Attach($fileName);
$xz='==';
$xz='=='.$arrayLink.length.'==';
for ($i=0; $i < count($arrayLink); $i++) { 
    //file_put_contents($arrayLink[$i],$arrayLink[$i]);
    $m->Attach($arrayLink[$i]);
    $xz=$xz.' !!  '.$arrayLink[$i];
}*/

if($m->Send() === true){
    echo xLog("Libmail Successn");
}
else {
    echo xLog("Libmail Failure");
}


?>
