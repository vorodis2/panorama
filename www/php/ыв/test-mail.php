<?php 
if (mail("vorodis2@gmail.com", "the subject", "Example message",   
"From: webmaster@example.com \r\n")) { 
    echo "messege acepted for delivery"; 
} else { 
    echo "some error happen"; 
} 
?> 