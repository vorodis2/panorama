
function DownloadUtill () {
	var self = this;
	var name = 'pic.jpeg';

	function saveFile (_link, _name) {
		var request = new XMLHttpRequest();
		request.open('GET', _link, true);
		request.responseType = 'blob';
		request.onload = function () {

			_link = window.URL.createObjectURL(request.response);

			if (request.response.type !== undefined) {
				name = request.response.type.replace('/', '.');
			}

			download(_link, name);
		};

		request.send();
	}

	function download (uri, name) {

		var link = document.createElement('a');

		link.download = name;
		link.href = uri;

		document.body.appendChild(link);

		link.click(function (e) { e.preventDefault(); });

		document.body.removeChild(link);

		delete link;
	}

	function savePdf (base64, fileName, orientation) {
		var img = new Image();
		img.onload = function () {
			var pdf = new jsPDF(orientation || 'p', 'px', [img.height, img.width]);
			pdf.addImage(img, 0, 0, img.width, img.height);
			pdf.save((fileName || 'pic') + '.pdf');/**/
		};
		img.src = base64;
	}
	/**
     * Сохранить в файл fileName[pic.png]
     * @param {String} base64 - картинка.
     * @param {String} fileName - имя файла.
     */
	function saveBase64 (base64, fileName) {
		var block = base64.split(';'); // 'data:image/jpeg и base64,...
		var typeImg = block[0].split(':')[1]; // image/jpeg
		var typeFile = '.' + block[0].split('/')[1]; // .jpeg
		var realData = block[1].split(',')[1]; // куча кода после base64,
		saveDataBlob(b64toBlob(realData, typeImg), (fileName || 'pic') + typeFile);
	}
	// открыть окно печати c base64
	function openPrintWindow (base64) {
		var ow = window.open();

		if (ow === null) {
			// в хром почему-то появляется возможность после второго звпроса
			return;
		}

		ow.document.write('<img id="printPic" width="100%" src="' + base64 + '"/> <script> setTimeout(function() { focus(); print(); close();}, 1) </script> ');
	}
	// конвертация base64 в блоб
	function b64toBlob (b64Data, contentType, sliceSize) {
		contentType = contentType || '';
		sliceSize = sliceSize || 512;
		var byteCharacters = atob(b64Data);
		var byteArrays = [];
		for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			var slice = byteCharacters.slice(offset, offset + sliceSize);
			var byteNumbers = new Array(slice.length);
			for (var i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}
			var byteArray = new Uint8Array(byteNumbers);
			byteArrays.push(byteArray);
		}
		var blob = new Blob(byteArrays, {type: contentType});
		return blob;
	}

	// сохранение блоба
	function saveDataBlob (blob, fileName) {
		var a = document.createElement('a');
		document.body.appendChild(a);
		var url = window.URL.createObjectURL(blob);
		a.style = 'display: none';
		a.href = url;
		a.download = fileName;
		a.click();
		window.URL.revokeObjectURL(url);
		document.body.removeChild(a);
	}

	// переворот base64 . base64Image - base64. isClockwise - по часовой стрелке. return base64
	function rotateBase64Image90deg (callback, base64Image, isClockwise) {
		var offScreenCanvas = document.createElement('canvas');// create an off-screen canvas
		offScreenCanvasCtx = offScreenCanvas.getContext('2d');
		var img = new Image();
		img.src = base64Image;
		img.onload = function () {
			offScreenCanvas.height = img.width;// set its dimension to rotated size
			offScreenCanvas.width = img.height;
			if (isClockwise) { // rotate and draw source image into the off-screen canvas:
				offScreenCanvasCtx.rotate(90 * Math.PI / 180);
				offScreenCanvasCtx.translate(0, -offScreenCanvas.width);
			} else {
				offScreenCanvasCtx.rotate(-90 * Math.PI / 180);
				offScreenCanvasCtx.translate(-offScreenCanvas.height, 0);
			}
			offScreenCanvasCtx.drawImage(img, 0, 0);
			callback(offScreenCanvas.toDataURL('image/jpeg'));// encode image to data-uri with base64
		};
	}

	this.saveFile = saveFile;
	this.savePdf = savePdf;
	this.saveBase64 = saveBase64;
	this.openPrintWindow = openPrintWindow;
	this.b64toBlob = b64toBlob;
	this.saveDataBlob = saveDataBlob;
	this.rotateBase64Image90deg = rotateBase64Image90deg;
}
