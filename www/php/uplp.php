<?php
$xz=date("U");//'tmp1.pdf';
move_uploaded_file(	$_FILES['pdf']['tmp_name'],	"tmppdf/".$xz.'.pdf');
echo $xz;
?>


