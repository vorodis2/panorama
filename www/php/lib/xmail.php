<?php
/**
 * Отправка почты функцией `mail()` с вложением.
 * @param string $from
 * @param string $to
 * @param string $subj
 * @param string $text
 * @param string $filename
 * @return boolean
 */
function XMail($from, $to, $subj = "No subject", $text = "Test message", $filename = "") {
    $f         = fopen($filename,"rb");
    $un        = strtoupper(uniqid(time()));
    
    $head      = "From: $from\n";
    $head     .= "To: $to\n";
    $head     .= "Subject: $subj\n";
    $head     .= "X-Mailer: PHPMail Tool\n";
    $head     .= "Reply-To: $from\n";
    $head     .= "Mime-Version: 1.0\n";
    $head     .= "Content-Type:multipart/mixed;";
    $head     .= "boundary=\"----------".$un."\"\n\n";
    
    $zag       = "------------".$un."\nContent-Type:text/html;\n";
    $zag      .= "Content-Transfer-Encoding: 8bit\n\n$text\n\n";
    $zag      .= "------------".$un."\n";
    $zag      .= "Content-Type: application/octet-stream;";
    $zag      .= "name=\"".basename($filename)."\"\n";
    $zag      .= "Content-Transfer-Encoding:base64\n";
    $zag      .= "Content-Disposition:attachment;";
    $zag      .= "filename=\"".basename($filename)."\"\n\n";
    $zag      .= chunk_split(base64_encode(fread($f,filesize($filename))))."\n";

    if (!@mail("$to", "$subj", $zag, $head))
        return false;
    else
        return true;
}
?>
