//мобильные девайсы
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


//Запустить отображение в полноэкранном режиме
function launchFullScreen(element) {
if(element.requestFullScreen) {
element.requestFullScreen();
} else if(element.mozRequestFullScreen) {
element.mozRequestFullScreen();
} else if(element.webkitRequestFullScreen) {
element.webkitRequestFullScreen();
}
}
// Выход из полноэкранного режима
function cancelFullscreen() {
if(document.cancelFullScreen) {
document.cancelFullScreen();
} else if(document.mozCancelFullScreen) {
document.mozCancelFullScreen();
} else if(document.webkitCancelFullScreen) {
document.webkitCancelFullScreen();
}
}
var onfullscreenchange =  function(e){
var fullscreenElement = 
document.fullscreenElement || 
document.mozFullscreenElement || 
document.webkitFullscreenElement;
var fullscreenEnabled = 
document.fullscreenEnabled || 
document.mozFullscreenEnabled || 
document.webkitFullscreenEnabled;
//main.fs=!main.fs;
//if(main.funFS)main.funFS(main.fs);
}
// Событие об изменениии режима
document.addEventListener("webkitfullscreenchange", onfullscreenchange);
document.addEventListener("mozfullscreenchange",    onfullscreenchange);
document.addEventListener("fullscreenchange",       onfullscreenchange);