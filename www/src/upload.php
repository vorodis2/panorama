
<?php
   /*// if ( 0 < $_FILES['file']['error'] ) {
        echo 'Error: ' . $_FILES['file']['error'];// . '<br>';
   /* }
    else {*/
    	echo 'Error: ' . $_FILES['file']['tmp_name'];
        move_uploaded_file($_FILES['file']['tmp_name'], '../resources/tmp/' . $_FILES['file']['name']);
    /*} */
?>
