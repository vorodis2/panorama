<?php
	$msg = "";
	$tip = $_REQUEST['tip']; 



	if($tip == "saveProdject") {//Сохронения конфигурации проекта	
		$mytext = stripslashes($_REQUEST['text']);	
		$fp2 = fopen ("../resources/project/".$_REQUEST['idUnik'].".js", "w");  
		fwrite($fp2,$mytext);  
		fclose($fp2);		
		echo "okSave";	
		return;
	}


	if($tip == "idUnik") {//Унникальный ид 
		$fp = @fopen("idtext.txt", "r+");
		if ($fp){
			while (!feof($fp))
			{
				$mytext = fgets($fp, 999);
				//echo $mytext."<br />";
			}
		}
		$mytext = $mytext +1;
		$mytext2 = $mytext;	
		fclose($fp);
		
		$fp2 = fopen ("idtext.txt", "w");  
		fwrite($fp2,$mytext2);  
		fclose($fp2);
		echo $mytext;	
		return;
	}

	if($tip == "setGal") {//Унникальный ид 
		/*$fp = @fopen("galeri.txt", "r+");
		if ($fp){
			while (!feof($fp))
			{
				$mytext = fgets($fp, 999);
				//echo $mytext."<br />";
			}
		}
		$mytext = $mytext +1;
		$mytext2 = $mytext +1;	
		fclose($fp);*/
		
		$fp2 = fopen ("galeri.txt", "w");  
		fwrite($fp2,$_REQUEST['text']);  
		fclose($fp2);
		echo $mytext;	
		return;
	}	

	if($tip == "galeri") {//Унникальный ид 
		$fp = @fopen("galeri.txt", "r+");
		if ($fp){
			while (!feof($fp))
			{
				$mytext = fgets($fp, 999);
				//echo $mytext."<br />";
			}
		}
		echo $mytext;	
		return;
	}	


	if($tip == "setIdUnik") {//Обновления уникального ид	
		$mytext = $_REQUEST['num']+1;	
		$fp2 = fopen ("idtext.txt", "w");  
		fwrite($fp2,$mytext);  
		fclose($fp2);		
		echo $mytext;	
		return;
	}


	if($tip == "saveConfig") {//Сохронения конфигурации проекта	
		$mytext = stripslashes($_REQUEST['text']);	
		$fp2 = fopen ("../resources/config2.js", "w");  
		fwrite($fp2,$mytext);  
		fclose($fp2);		
		echo "okSave";	
		return;
	}

	if($tip == "saveConfigJSON") {//Сохронения конфигурации проекта	
		$mytext = stripslashes($_REQUEST['text']);	
		$fp2 = fopen ("../resources/config2.json", "w");  
		fwrite($fp2,$mytext);  
		fclose($fp2);		
		echo "okSave";	
		return;
	}


	if($tip == "createProdject") {//Создание нового проекта		
		$dir='../resources/projects/'.$_REQUEST['idUnik'];
		mkdir($dir, 0700);
		copy("../resources/bazaProject/model.js",$dir."/model.js"); 
		copy("../resources/bazaProject/pic50.png",$dir."/pic50.png"); 
		/*copy("../resources/bazaProject/pic64.png",$dir."/pic64.png");*/ 
		copy("../resources/bazaProject/pic100.png",$dir."/pic100.png"); 
		/*copy("../resources/bazaProject/pic128.png",$dir."/pic128.png"); 
		copy("../resources/bazaProject/pic512.png",$dir."/pic512.png"); */
		echo "okCreate";	
		return;
	}

	if($tip == "createBlok") {//Создание нового проекта		
		$dir='../resources/blok/'.$_REQUEST['idUnik'];
		mkdir($dir, 0700);
		copy("../resources/bazaProject/model.js",$dir."/model.js"); 
		copy("../resources/bazaProject/pic50.png",$dir."/pic50.png"); 
		/*copy("../resources/bazaProject/pic64.png",$dir."/pic64.png"); */
		copy("../resources/bazaProject/pic100.png",$dir."/pic100.png"); 
		/*copy("../resources/bazaProject/pic128.png",$dir."/pic128.png"); 
		copy("../resources/bazaProject/pic512.png",$dir."/pic512.png"); */
		echo "okCreate";	
		return;
	}
	if($tip == "createObject") {//Создание нового проекта		
		$dir='../resources/object/'.$_REQUEST['idUnik'];
		mkdir($dir, 0700);
		copy("../resources/bazaProject/model.js",$dir."/model.js"); 
		copy("../resources/bazaProject/pic50.png",$dir."/pic50.png"); 
		/*copy("../resources/bazaProject/pic64.png",$dir."/pic64.png"); */
		copy("../resources/bazaProject/pic100.png",$dir."/pic100.png"); 
		/*copy("../resources/bazaProject/pic128.png",$dir."/pic128.png"); 
		copy("../resources/bazaProject/pic512.png",$dir."/pic512.png"); */
		echo "okCreate";	
		return;
	}

	if($tip == "zamenaModel") {//Заменяем директории 		
		//s=../resources/object/406
		//s1../bazModel/resources/parsObj/91	
		$dir=$_REQUEST['s']."/mod3d";
		removeDirRec($dir);
		mkdir($dir, 0700);

		copy_files($_REQUEST['s1']."/mod3d/",$dir); 

		copy($_REQUEST['s1']."/mod3d/pic.png",$_REQUEST['s']."/pic100.png"); 
		echo "=====================msg";
		return;
	}

	

	if($tip == "getDirect") {//Создание нового проекта	
		$msg = "";

		if ($objs = glob($_REQUEST['dir']."/*")) {
			foreach($objs as $obj) {
				$msg=$msg.$obj.";;;";
			}
		}

		echo $msg;
		return;
	}


	if($tip == "removeDirRec") {//Создание нового проекта	
		removeDirRec($_REQUEST['dir']);
	}


	// функция копирования файлов (включая вложеные) из папки $source в $res 
	function copy_files($source, $res){ 
	    $hendle = opendir($source); // открываем директорию 
	    while ($file = readdir($hendle)) { 
	        if (($file!=".")&&($file!="..")) { 
	            if (is_dir($source."/".$file) == true) { 
	                if(is_dir($res."/".$file)!=true) // существует ли папка 
	                    mkdir($res."/".$file, 0777); // создаю папку 
	                    copy_files ($source."/".$file, $res."/".$file); 
	            } 
	            else{ 
	                if(!copy($source."/".$file, $res."/".$file)) {  
	                    print ("при копировании файла $file произошла ошибка...<br>\n");  
	                }// end if copy 
	            }  
	        } // else $file == .. 
	    } // end while 
	    closedir($hendle); 
	}





	function removeDirRec($dir){	
		if ($objs = glob($dir."/*")) {
			foreach($objs as $obj) {
			   is_dir($obj) ? removeDirRec($obj) : unlink($obj);
			}
		}
		rmdir($dir);
	}

	echo "not";	
/*$tip = $_REQUEST['tip']; 
if($tip == "newMod") {//Удоление проекта
	//$mmmm = $_REQUEST['model'];
	
	$mmmm = '../'.$_REQUEST['prodject'].'/model';
	//mkdir($dir, 0700);
	
	
	if($mmmm!='null')removeDirRec('model');	
	mkdir('model', 0700);
	
	$msg = "kill;";
	
	
	$text = stripslashes($_REQUEST['text']);
	$file = fopen($mmmm."/object3dLoad.js","w"); 
    //fwrite($file, ''); 
    fclose($file);	
	$imeg = $_REQUEST['imeg'];
	
	if($imeg!='null')mkdir($mmmm."/imege", 0700);
	
	
	echo "dfg";	
	return;
}

if($tip == "zapisKusok") {//записываем частями фаил
	
	$mmmm = '../'.$_REQUEST['prodject'].'/model';
	$file = fopen($mmmm."/object3dLoad.js","a"); 
	$text = stripslashes($_REQUEST['text']);
	fwrite($file, $text); 
	fclose($file);
	//$text = stripslashes($_REQUEST['text']);
	echo 'okText';	
	return;
}*/

	




/*	if($tip == "save") {//записываем частями фаил		
		$file = fopen("../bazaMod/objModel.js","w"); 
		$text = stripslashes($_REQUEST['text']);
		fwrite($file, $text); 
		fclose($file);		
		echo 'okText';	
		return;
	}

	if($tip == "save2") {//записываем частями фаил		
		$file = fopen("../bazaMod/objMask.js","w"); 
		$text = stripslashes($_REQUEST['text']);
		fwrite($file, $text); 
		fclose($file);		
		echo 'okText';	
		return;
	}


	if($tip == "base64") {//записываем частями фаил		
		$file = $_POST['file']; 
		$data = base64_decode(substr($_POST['image'], strpos($_POST['image'], 'base64,') + 7));
		$fp = fopen($file, "wb"); // ("r" - считывать "w" - создавать "a" - добовлять к тексту)
		fwrite($fp, $data);
	    fclose ($fp);
	    echo 'ok';	
		return;
	}
	if($tip == "killPhoto") {//записываем частями фаил
		$dir = '../bazaMod/imege';	
		if($dir!='null'){
			if ($objs = glob($dir."/*")) {
				foreach($objs as $obj) {
				   is_dir($obj) ? removeDirRec($obj) : unlink($obj);
				}
			}
		}
		echo 'ok';	
		return;
	}

	function removeDirRec($dir){	
		if ($objs = glob($dir."/*")) {
			foreach($objs as $obj) {
			   is_dir($obj) ? removeDirRec($obj) : unlink($obj);
			}
		}
		rmdir($dir);
	}
*/

	
?>
