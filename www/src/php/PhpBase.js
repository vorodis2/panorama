//var php;
function PhpBase() { 

	var self = this;
	//php=this;
	

	this.ser = window.location.href + '/';

	this.server ="http://uptask3d/";
	//this.server ="http://vorodis2.com/";
	if(this.ser.indexOf("uptask3d")>0)this.server ="http://uptask3d/";	
	if(this.ser.indexOf("vorodis2")>0)this.server ="http://vorodis2/";
	if(this.ser.indexOf("vorodis2.com")>0)this.server ="http://vorodis2.com/";
	if(this.ser.indexOf("v2xz")>0)this.server ="http://v2xz/";

	this.arrServerPath = ["https://domikGit/","http://vorodis2.com/test/planer/www61/","https://vorodis2.com/test/domik/www3/","https://vorodis2.com/test/domik/", "https://planer/"];
	
	this.puth = "portfolio/planerAdmin.php";
	//this.opDir=main.opDir;
	var isPuth= false;
	for (var i = 0; i < this.arrServerPath.length; i++) {
		if (this.server.toUpperCase() == this.arrServerPath[i].toUpperCase()) {
			isPuth = true;
			break;
		}
	}
	/*if (!isPuth) {
		console.warn("в масиве путей серверов этот путь не найдет", this.server);
	} else {
		console.log("с путем сервера все ок");
	}*/


	
	this._idUnik=Math.round(Math.random()*1000000);


	this.load = function(obj, fun){	
		var s=this.server+this.puth;
		$.post(s, obj, function(data){			
			if (fun) fun(data);
		});
	}

	
	this.savePhoto = function(_file, _image, fun){
		var s=this.server+"portfolio/forModel.php"		
		$.post(s, {file : _file, image : _image}, function(){
			if (fun) fun();			
		});
	};




}	


PhpBase.prototype = {
	
}


