/**
*   тоскалка картинок по экрану в диве выше
*/
export function DragerImage () {
	window.dragerImage = this;
	var self = this;
	var offsetX = 0;
	var offsetY = 0;
	var coordX = 0;
	var coordY = 0;
	var isDrag = false;
	var image;
	image = new Image();
	var div = document.createElement('div');
	div.style.position = 'absolute';
	div.style.zIndex = '10';
	div.style.pointerEvents = 'none'; // Предотвращает события мыши для дива(прозрачний для событий)
	div.appendChild(image);
	var scale = 1;
	var moveX = 0;
	var moveY = 0;

	function move (e) {
		e = e || window.event;
		moveX = e.clientX;
		moveY = e.clientY;
		if (moveY === undefined) {
			moveX = e.touches[0].clientX;
			moveY = e.touches[0].clientY;
		} else {
			e.preventDefault();
		}
		div.style.left = coordX + moveX - (offsetX) + 'px';
		div.style.top = coordY + moveY - (offsetY) + 'px';
	}

	function onload () {
		if (!isDrag) return;
		image.style.width = (100 * scale) + '%';
		image.style.height = (100 * scale) + '%';
		div.width = image.width;
		div.height = image.height;
		div.style.left = offsetX - (div.width * scale) / 2 + 'px';
		div.style.top = offsetY - (div.height * scale) / 2 + 'px';
		coordX = parseInt(div.style.left);
		coordY = parseInt(div.style.top);
		document.body.appendChild(div);
		div.style.left = coordX + moveX - (offsetX) + 'px';
		div.style.top = coordY + moveY - (offsetY) + 'px';
		image.style.width = image.width + 'px';
		image.style.height = image.height + 'px';
	}

	this.start = function (link, p, _scale, stopWhenUp) {
		scale = _scale || 1;

		if (isDrag === true) return;
		offsetX = p.x;
		offsetY = p.y;
		moveX = offsetX;
		moveY = offsetY;

		image.src = link;
		image.onload = onload;

		isDrag = true;
		document.addEventListener('mousemove', move);
		document.addEventListener('touchmove', move);

		if (stopWhenUp) {
			document.addEventListener('mouseup', self.stop);
		}
	};

	this.stop = function () {
		isDrag = false;
		document.removeEventListener('mousemove', move);
		document.removeEventListener('touchmove', move);
		document.removeEventListener('mouseup', self.stop);
		div.remove();
	};
}
