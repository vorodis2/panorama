/** @module unility */
/**
 * @see {Calc}
 * @global
 */
var calc;

/**
 * Хранитель математических функций.

 * @class
 */
function Calc () {


	if (calc) return calc; // если уже создан

	calc = this;

	var rez1 = new THREE.Vector3(0, 0, 0);
	var rez2 = new THREE.Vector3(0, 0, 0);
	var rez3 = new THREE.Vector3(0, 0, 0);
	var rezNull = new THREE.Vector3(0, 0, 0);
	var rDin;
	var re, a, a1, d, d1;

	/** Перевод градусы в радианы.
     * @example var rad = degress * calc.DEG2RAD; */
	this.DEG2RAD = Math.PI / 180;
	/** Перевод радианы в градусы.
     * @example var degress = rad * calc.RAD2DEG; */
	this.RAD2DEG = 180 / Math.PI;

	/**
     * Получение угла между двумя точками радианы  -PI - 0 - PI
     * @param {Point} a - Первая точка.
     * @param {Point} b - Вторая точка.
     * @return {number} угол между точками.
     */
	this.getAngle = function (a, b) {
		b = b || rezNull;
		a = a || rezNull;
		return Math.atan2(b.y - a.y, b.x - a.x);
	};

	var res = 0;
	/**
     * Получение угла между двумя точками радианы полный круг 0 - PI*2
     * @param {Point} a - Первая точка.
     * @param {Point} b - Вторая точка.
     * @return {number} угол между точками.
     */
	this.getAngle2 = function (a, b) {
		b = b || rezNull;
		a = a || rezNull;
		res = Math.atan2(b.y - a.y, b.x - a.x);
		if (res < 0) { //
			res += Math.PI * 2;
		}
		return res;
	};

	/**
     * Получение дистанции между точками
     * @param {Point} p1 - Первая точка.
     * @param {Point} p2 - Вторая точка.
     * @return {number} дистанция(растояние) между точками.
     */
	this.getDistance = function (p1, p2) {
		if (p1 == undefined) {
			return 0;
		}
		if (p2 == undefined) {
			p2 = rezNull;
		}
		p2 = p2 || rezNull;
		return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
	};

	/**
     * Получение точки от угла и длинны
     * @param {number} length - длинна вектора.
     * @param {number} angle - угол в радианах
     * @return {Point} от угла и длины получаем вектор точки
     */
	this.getVector = function (length, angle, point) {
		if (point == undefined) var point = new THREE.Vector2(0, 0);
		if (length < 0) angle += Math.PI;
		point.x = Math.abs(length) * Math.cos(angle);
		point.y = Math.abs(length) * Math.sin(angle);
		return point;
	};

	// от угла и длины получаем вектор точки
	this.isPointInLin = function (p1, p2, pTest, dist, otstup) {
		this.getTreeAngel(p1, p2, pTest);
		if (otstup < 0) { if (Math.abs(otstup) * 2 > d1) return null; }

		if (rez2.x <= d1 + otstup) {
			if (rez2.x >= -otstup) {
				if (Math.abs(rez2.y) <= dist) {
					if (rez2.x < 0) {
						rez3 = this.getVector(rez2.x, a - Math.PI);
					} else rez3 = this.getVector(rez2.x, a);

					rez3.x += p2.x;
					rez3.y += p2.y;
					rez3.z = rez2.y;
					return rez3;
				}
			}
		}


		return null;
	};

	this.okrugPoint = function (p, num) {
		if (num == undefined) num = 100;
		p.x = Math.round(p.x / num) * num;
		p.y = Math.round(p.y / num) * num;
	};

	this.okrugNumber = function (p, num) {
		if (num == undefined) num = 100;
		var rez = Math.round(p * num) / num;
		p = rez;
		return rez;
	};

	//
	/**
     * Находиться ли точка в треугольнике
     * @param {Point} p1 - точки треугольника
     * @param {Point} p2 - точки треугольника
     * @param {Point} p3 - точки треугольника
     * @param {Point} pTest - проверяемая точка
     * @return {boolean} Находиться ли точка в треугольнике ?
     */
	this.isInTriangle = function (p1, p2, p3, pTest) {
		var a = (p1.x - pTest.x) * (p2.y - p1.y) - (p2.x - p1.x) * (p1.y - pTest.y);
		var b = (p2.x - pTest.x) * (p3.y - p2.y) - (p3.x - p2.x) * (p2.y - pTest.y);
		var c = (p3.x - pTest.x) * (p1.y - p3.y) - (p1.x - p3.x) * (p3.y - pTest.y);
		if ((a >= 0 && b >= 0 && c >= 0) || (a <= 0 && b <= 0 && c <= 0)) return true;
		return false;
	};


	this.getTreeAngel = function (p, p1, p2, bool) {
		a = this.getAngle(p1, p);
		a1 = this.getAngle(p1, p2);
		d = this.getDistance(p1, p2);
		d1 = this.getDistance(p, p1);
		this.getVector(d, a1 - a, rez2);
		a1 = this.getAngle(rezNull, rez2);
		if (bool == undefined) return a1;
		if (a1 > 0) return a1;

		return Math.PI * 2 + a1;
	};

	this.getTreeAngelPI2 = function (a, b, c) {
		x1 = a.x - b.x;
		x2 = c.x - b.x;
		y1 = a.y - b.y;
		y2 = c.y - b.y;
		d1 = Math.sqrt(x1 * x1 + y1 * y1);
		d2 = Math.sqrt(x2 * x2 + y2 * y2);
		// res = calc.sign(a,  b,  c);
		var res = (x1 * x2 + y1 * y2) / (d1 * d2);
		if (res > 1.0) res = 1.0;
		if (res < -1.0) res = -1.0;
		return Math.acos(res); // Math.acos(num>1 || num<1)==NAN
	};

	// пересикает ли линия треугольник
	this.isLineInTriangle = function (p1, p2, p3, pTest1, pTest2) {
		re = this.getPointOfIntersection(p1, p2, pTest1, pTest2);
		if (re) {
			rez1.x = re.x;
			rez1.y = re.y;
			rez1.z = 0;
			return rez1;
		}

		re = this.getPointOfIntersection(p2, p3, pTest1, pTest2);
		if (re) {
			rez1.x = re.x;
			rez1.y = re.y;
			rez1.z = 1;
			return rez1;
		}

		re = this.getPointOfIntersection(p3, p1, pTest1, pTest2);
		if (re) {
			rez1.x = re.x;
			rez1.y = re.y;
			rez1.z = 2;
			return rez1;
		}
		return false;
	};

	


	// проверяем пересечений
	var d, da, db, ta, tb, dx, dy, distans, angel;
	var rez = new THREE.Vector2(0, 0);
	this.getPointOfIntersection = function (p1, p2, p3, p4) {
		d = (p1.x - p2.x) * (p4.y - p3.y) - (p1.y - p2.y) * (p4.x - p3.x);
		da = (p1.x - p3.x) * (p4.y - p3.y) - (p1.y - p3.y) * (p4.x - p3.x);
		db = (p1.x - p2.x) * (p1.y - p3.y) - (p1.y - p2.y) * (p1.x - p3.x);

		ta = da / d;
		tb = db / d;
		if (ta >= 0 && ta <= 1 && tb >= 0 && tb <= 1) {
			dx = p1.x + ta * (p2.x - p1.x);
			dy = p1.y + ta * (p2.y - p1.y);
			rez.x = dx;
			rez.y = dy;
			return rez; // точка пересечения
		}
		return null;
	};

	/** Увеличиваем линию на дистанция и смещаем на отступ
        для определения пересечений стен
        !! точки изменяються
    */
	this.korektToLine = function (p1, p2, dist, otstup, _ang) {
		distans = this.getDistance(p1, p2);
		if (_ang == undefined) angel = this.getAngle(p1, p2);
		else angel = _ang;

		if (otstup != 0) { // подкоректировали отступ
			if (otstup < 0) {
				rez = this.getVector(-otstup, angel - Math.PI / 2);
			} else {
				rez = this.getVector(otstup, angel + Math.PI / 2);
			}
			p1.x += rez.x;
			p1.y += rez.y;
			p2.x += rez.x;
			p2.y += rez.y;
		}

		rez = this.getVector(dist, angel);

		p2.x += rez.x;
		p2.y += rez.y;
		rez = this.getVector(dist, angel + Math.PI);
		p1.x += rez.x;
		p1.y += rez.y;


	};

	// Возврощаеться процент точка между двумя точками
	this.getProsent3Point = function (p, p1, pTest) {
		da = this.getDistance(p, p1);
		db = this.getDistance(p, pTest);
		return db / da;
	};

	/** Увеличиваем линию на дистанция и смещаем на отступ
        для определения пересечений стен
        !! точки изменяються
    */

	this.povotorOtAngel = function (p1, p2, _angel) {
		angel = this.getAngle(p1, p2);
		distans = this.getDistance(p1, p2);
		return this.getVector(distans, angel + _angel);
	};

	// сравнивает положение двух точек с округлением
	this.testPositPoint = function (p, p1, _num) {
		if (_num == undefined) _num = 100;
		if ((Math.round(p.x * _num) / _num) == (Math.round(p1.x * _num) / _num)) {
			if ((Math.round(p.y * _num) / _num) == (Math.round(p1.y * _num) / _num)) {
				return true;
			}
		}
		return false;
	};

	var di, di1, kol, sahN;

	// коперктирует угол относительно его границ, для прилепания к энному углу
	this.okrugAngel = function (a, aSah, aRad) {
		var r = a;
		di = 1;
		if (a < 0) di = -1;
		di1 = Math.abs(a);
		kol = Math.round(di1 / aSah) + 1;
		sahN = 0;
		for (var i = kol; i >= 0; i--) {
			if ((di1 > i * aSah - aRad) && (di1 < i * aSah + aRad)) {
				r = i * aSah * di;
				return r;
			}
			sahN++;
			if (sahN == 3) return r;
		}
		return r;
	};


	var point = new Position();
	var point1 = new Position();
	var result = [];
	this.getLineCircleIntersectionPoints = function (p, p1, pc, r, bool) {
		result.length = 0;

		var baX = p1.x - p.x;
		var baY = p1.y - p.y;
		var caX = pc.x - p.x;
		var caY = pc.y - p.y;

		var a = baX * baX + baY * baY;
		var bBy2 = baX * caX + baY * caY;
		var c = caX * caX + caY * caY - r * r;

		var pBy2 = bBy2 / a;
		var q = c / a;

		var disc = pBy2 * pBy2 - q;

		if (disc < 0) {
		    return result;
		}
		// if disc == 0 ... dealt with later
		var tmpSqrt = Math.sqrt(disc);
		var abScalingFactor1 = -pBy2 + tmpSqrt;
		var abScalingFactor2 = -pBy2 - tmpSqrt;

		point.set(p.x - baX * abScalingFactor1, p.y - baY * abScalingFactor1);
		if (this.isPointInLine(p, p1, point)) {
			result.push(point);
		}

		if (disc == 0) { // abScalingFactor1 == abScalingFactor2
			return result;
		}
		point1.set(p.x - baX * abScalingFactor2, p.y - baY * abScalingFactor2);

		if (this.isPointInLine(p, p1, point1)) {
			result.push(point1);
		}

		if (bool) {
			if (result.length == 2) {
				di = this.getDistance(p, result[0]);
				di1 = this.getDistance(p, result[1]);
				if (di > di1) {
					result.reverse();
				}
			}
		}

		return result;
	};
	/**
	* Лежит ли точка на отрезке
	* @return {boolean} true принадлежит, false НЕ принадлежит.
	*/
	this.isPointInLine = function (p, p1, pTest) {
		// пока реализация Точка принадлежит отрезку, если сумма расстояний от этой точки до конечных точек отрезка равна длине отрезка
		var d = calc.getDistance(p, p1);
		var d1 = calc.getDistance(p, pTest);
		var d2 = calc.getDistance(p1, pTest);
		return (calc.okrugNumber(d1 + d2) === calc.okrugNumber(d));// Math.abs(d - (d1 + d2)) < 0.001;//((d1 + d2) === d)//
	};

	/**
	* Получить растояние точки до прямой
	* @return {number} растояние точки до прямой. Если дистанция p, p1 == 0 вернет 0
	*/
	this.getDistancePointToLine = function (p, p1, pTest) {
		var res = ((p1.y - p.y) * pTest.x - (p1.x - p.x) * pTest.y + p1.x * p.y - p1.y * p.x) / calc.getDistance(p, p1);
		return -calc.okrugNumber(Number.isFinite(res) ? res : 0);
	};
	/**
     * Получение точек пересечения двох окружностей
     * @param {Point} p - Центр первой окружности.
     * @param {number} r1 - Радиус первой окружности.
     * @param {Point} p1 - Центр второй окружности.
     * @param {number} r2 - Радиус второй окружности.
     * @return {Array} масив с точками пересечения если они есть или пустой масив
     */
	this.getCircleCircleIntersectionPoints = function (p, r1, p1, r2) {
		result.length = 0;
		var x0, y0; // координаты точки пересечения всех линий
		var d; // расстояние между центрами окружностей
		var a; // расстояние от r1 до точки пересечения всех линий
		var h; // расстояние от точки пересеч окружностей до точки пересеч всех линий

		d = Math.sqrt(Math.pow(Math.abs(p.x - p1.x), 2) + Math.pow(Math.abs(p.y - p1.y), 2));
		if (d > r1 + r2) return result; // окружности не пересекаются
		a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
		h = Math.sqrt(Math.pow(r1, 2) - Math.pow(a, 2));
		if (isNaN(h)) return result;
		x0 = p.x + a * (p1.x - p.x) / d;
		y0 = p.y + a * (p1.y - p.y) / d;

		point.x = x0 + h * (p1.y - p.y) / d;
		point.y = y0 - h * (p1.x - p.x) / d;
		result.push(point);
		if (a == r1) return result; // окружности соприкасаются

		point1.x = x0 - h * (p1.y - p.y) / d;
		point1.y = y0 + h * (p1.x - p.x) / d;
		result.push(point1);


		return result;
	};

	var arrPoint = [new Position(), new Position(), new Position(), new Position()];
	var mArrPoint = [new Position(), new Position(), new Position(), new Position()];
	// проверка на пересечение прямоугольников
	this.isIntersectionRect = function (r, rect) { //   true - перечение false - непересекаются

		arrPoint[0].set(r.x, r.y);
		arrPoint[1].set(r.x + r.width, r.y);
		arrPoint[2].set(r.x + r.width, r.y + r.height);
		arrPoint[3].set(r.x, r.y + r.height);

		mArrPoint[0].set(rect.x, rect.y);
		mArrPoint[1].set(rect.x + rect.width, rect.y);
		mArrPoint[2].set(rect.x + rect.width, rect.y + rect.height);
		mArrPoint[3].set(rect.x, rect.y + rect.height);

		return this.isIntersectionFromPoint(arrPoint, mArrPoint);
	};

	// пересечение полигонов
	// arrPoint - обход ректа по часовой стрелки
	// arrPoint1 - обход ректа1 по часовой стрелки
	this.isIntersectionFromPoint = function (arrPoint, arrPoint1) { //   true - перечение false - непересекаются
		for (var i = 0; i < arrPoint.length - 2; i++) { // перечечение диагоналей
			for (var j = 0; j < arrPoint1.length - 2; j++) {
				if (calc.getPointOfIntersection(arrPoint[i], arrPoint[(i + 2) % arrPoint.length],
					arrPoint1[j], arrPoint1[(j + 2) % arrPoint1.length])) {
					return true;
				}
			}
		}
		for (var i = 0; i < arrPoint.length; i++) { // перечечение граней
			for (var j = 0; j < arrPoint1.length; j++) {
				if (calc.getPointOfIntersection(arrPoint[i], arrPoint[(i + 1) % arrPoint.length],
					arrPoint1[j], arrPoint1[(j + 1) % arrPoint1.length])) {
					return true;
				}
			}
		}
		for (var i = 0; i < arrPoint1.length; i += 2) { // в случае когда один в нутри другого и не пересекаются диагонали
			if (calc.contains(arrPoint1[i].x, arrPoint1[i].y, arrPoint)) {
				return true;
			}
		}
		for (var i = 0; i < arrPoint.length; i += 2) { // в случае когда один в нутри другого и не пересекаются диагонали
			if (calc.contains(arrPoint[i].x, arrPoint[i].y, arrPoint1)) {
				return true;
			}

		}
		return false;
	};

	// паралельные ли линии ? eps - погрешность
	this.isParalel = function (p, p1, p2, p3, eps) {
		eps = eps || 0;
		var angelFirstLine = Math.abs(calc.getAngle(p, p1) % Math.PI);
		var angelFirstLine1 = Math.abs(calc.getAngle(p1, p) % Math.PI);
		var angelSecondLine = Math.abs(calc.getAngle(p2, p3) % Math.PI);
		var angelSecondLine1 = Math.abs(calc.getAngle(p3, p2) % Math.PI);
		var dif = Math.min(
			Math.abs(angelFirstLine - angelSecondLine),
			Math.abs(angelFirstLine1 - angelSecondLine1),
			Math.abs(angelFirstLine - angelSecondLine1),
			Math.abs(angelFirstLine1 - angelSecondLine));
		return dif <= eps;
	};

	// поворот точки на угол.   point - точка которую вращаем, centerPoint - если есть вращаем вокруг нее или вокруг 0,0(центра координат)
	this.rotationPoint = function (point, angel, centerPoint) {
		var X = 0;
		var Y = 0;
		if (centerPoint) {
			X = centerPoint.x + (point.x - centerPoint.x) * Math.cos(angel) - (point.y - centerPoint.y) * Math.sin(angel);
			Y = centerPoint.y + (point.y - centerPoint.y) * Math.cos(angel) + (point.x - centerPoint.x) * Math.sin(angel);
		} else {
			X = point.x * Math.cos(angel) - point.y * Math.sin(angel);
			Y = point.y * Math.cos(angel) + point.x * Math.sin(angel);
		}
		point.x = X;
		point.y = Y;
	};

	// полотор точки по длинне
	this.rotationPointByLength = function (point, lengthTo, centerPoint) {
		centerPoint = centerPoint || rezNull;
		var circleRadius = calc.getDistance(point, centerPoint);
		var circleLen = calc.getLenghtCircle(circleRadius);
		var angleByOnePixel = (Math.PI * 2) / circleLen;
		var angleToRotate = lengthTo * angleByOnePixel;
		calc.rotationPoint(point, angleToRotate, centerPoint);
	};

	// пересекаются ли треугольники true|false
	this.isIntersectionTriangle = function (p, p1, p2, pt, pt1, pt2) {
		var isIntersect = false;
		var ar = [p, p1, p2];
		var ar1 = [pt, pt1, pt2];

		for (var i = 0; i < ar.length; i++) {
			if (isIntersect) break;
			isIntersect = calc.isInTriangle(pt, pt1, pt2, ar[i]);
		}
		for (var i = 0; i < ar1.length; i++) {
			if (isIntersect) break;
			isIntersect = calc.isInTriangle(p, p1, p2, ar1[i]);
		}

		if (!isIntersect) {
			for (var i = 0; i < ar.length; i++) { // перечечение граней
				for (var j = 0; j < ar1.length; j++) {
					if (isIntersect) break;
					isIntersect = calc.getPointOfIntersection(ar[i], ar[(i + 1) % ar.length], ar1[j], ar1[(j + 1) % ar1.length]);
				}
			}
		}
		return isIntersect;
	};

	/**
	* получить точки на окружности
	* @param {Position} pointCenter - центр окружности.
	* @param {number} radius - радиус окружности.
	* @param {Position} pointAngleStart - точка начало отсчета.
	* @param {Position} pointAngleFinish - точка конец отсчета.
	* @param {number} segment[5] - количество точек.
	* @param {boolean} anticlockwise[false] - направление окружности.
	* @param {boolean} arrPoint[undefined] - чтоб не создавать новые точки будем использовать етот масив.
	* @return {Array<Position>} Масив точек на окнужности.
	*/
	this.getArrPointCircle = function (pointCenter, radius, pointAngleStart, pointAngleFinish, segment, anticlockwise, arrPoint) {
		var startAngle = calc.getAngle(pointAngleStart, pointCenter) - Math.PI; // вычисляем углы начало
		var endAngle = calc.getAngle(pointAngleFinish, pointCenter) - Math.PI; // конец

		var points;
		if (arrPoint) {
			points = arrPoint;
		} else {
			points = [new Position()];
		}
		segment = segment || 5; // количество сколько брать точек на окружности
		anticlockwise = anticlockwise || false; // направление по часовой = false
		if (!anticlockwise && endAngle <= startAngle) { // перевороты
			endAngle += Math.PI * 2;
		} else if (anticlockwise && startAngle <= endAngle) {
			startAngle += Math.PI * 2;
		}
		var sweep = anticlockwise ? (startAngle - endAngle) * -1 : (endAngle - startAngle);
		var segs = Math.ceil(Math.abs(sweep) / (Math.PI * 2)) * (segment - 1);
		var theta = sweep / (segs * 2);
		var theta2 = theta * 2;
		var cTheta = Math.cos(theta);
		var sTheta = Math.sin(theta);
		var segMinus = segs - 1;
		var remainder = (segMinus % 1) / segMinus;
		var angle = 0;
		var c = 0;
		var s = 0;
		var px = 0;
		var py = 0;

		points[0].x = pointCenter.x + Math.cos(startAngle) * radius;
		points[0].y = pointCenter.y + Math.sin(startAngle) * radius;
		for (var i = 0; i <= segMinus; i++) {
			angle = ((theta) + startAngle + (theta2 * i + remainder * i));
			c = Math.cos(angle);
			s = -Math.sin(angle);
			px = ((cTheta * c) + (sTheta * s)) * radius + pointCenter.x;
			py = ((cTheta * -s) + (sTheta * c)) * radius + pointCenter.y;
			if (points[i + 1]) {
				points[i + 1].x = px;
				points[i + 1].y = py;
			} else {
				points.push(new Position(px, py));
			}
		}

		return points;
	};

	/**
	* получить длинну окружности
	* @param {number} radius - радиус окружности.
	* @param {Position} pointCenter[undefined] - центр окружности.
	* @param {Position} pointAngleStart[undefined] - точка начало отсчета длины.
	* @param {Position} pointAngleFinish[undefined] - точка конец отсчета длины.
	* @param {boolean} anticlockwise[undefined] - направление окружности.
	* @return {number} длина окружности
	*/
	this.getLenghtCircle = function (radius, pointCenter, pointAngleStart, pointAngleFinish, anticlockwise) {
		if (!pointCenter) pointCenter = pointAngleStart = pointAngleFinish = rezNull;

		var startAngle = calc.getAngle(pointAngleStart, pointCenter) - Math.PI; // вычисляем углы начало
		var endAngle = calc.getAngle(pointAngleFinish, pointCenter) - Math.PI; // конец
		if (startAngle === endAngle && pointAngleStart !== pointAngleFinish) {
			return 0;
		}

		anticlockwise = anticlockwise || false; // направление по часовой = false
		if (!anticlockwise && endAngle <= startAngle) { // перевороты
			endAngle += Math.PI * 2;
		} else if (anticlockwise && startAngle <= endAngle) {
			startAngle += Math.PI * 2;
		}
		return (Math.PI * radius * (anticlockwise ? (startAngle - endAngle) : (endAngle - startAngle))) / Math.PI;
	};

	/** todo оптимизировать
	* Получить длину по кривой от ширины
	* @return {number} длина окружности
	*/
	this.getLengthByWidth = function (width, curvature) {
		var p = new Position(0, 0);
		var p1 = new Position(width, 0);
		var p2 = calc.getVector(curvature, Math.PI * 0.5);
		p2.x = width / 2;
		var pc = calc.getCenterCircle(p, p1, p2);
		if (!pc) return width;
		return calc.getLenghtCircle(calc.getDistance(pc, p), pc, p, p1, (curvature > 0));
	};

	/**
	* Получение центра окружности описаной тремя точками
	* @return {Position | null} центр окружности или null если точки лежат на одной прямой
	*/
	this.getCenterCircle = function (p1, p2, p3) {
		var A = p2.x - p1.x;
		var B = p2.y - p1.y;
		var C = p3.x - p1.x;
		var D = p3.y - p1.y;
		var E = A * (p1.x + p2.x) + B * (p1.y + p2.y);
		var F = C * (p1.x + p3.x) + D * (p1.y + p3.y);
		var G = 2 * (A * (p3.y - p2.y) - B * (p3.x - p2.x));
		if (G === 0.0) return null;// Точки лежат на одной прямой, круга не существует
		return new Position((D * E - B * F) / G, (A * F - C * E) / G);
	};

	/**
	* Получение точек между двумя точками по кривой
	* @param {Position} p - начало отрезка.
	* @param {Position} p2 - конец отрезка.
	* @param {number} offset - смещение кривой от отрезка.
	* @param {number} segment[5] - количество точек.
	* @param {boolean} arrPoint[undefined] - чтоб не создавать новые точки будем использовать етот масив.
	* @return {Array<Position>} точки кривой
	*/
	this.getArcPoint = function (p, p2, offset, segment, arrPoint) {
		segment = segment || 5;
		var angle = calc.getAngle(p, p2) + (90 * calc.DEG2RAD);
		var pp = calc.getVector(offset, angle);
		var p1 = new Position((p.x + p2.x) / 2, (p.y + p2.y) / 2);
		p1.x += pp.x;
		p1.y += pp.y;
		var pc = calc.getCenterCircle(p, p1, p2);
		if (!pc) return [p, p2];
		return calc.getArrPointCircle(pc, calc.getDistance(pc, p), p, p2, segment, offset > 0, arrPoint);
	};

	// Вкрнуть площадь
	this.getArea = function (contour) {
		var n = contour.length;
		var a = 0.0;
		for (var p = n - 1, q = 0; q < n; p = q++) {
			a += contour[p].x * contour[q].y - contour[q].x * contour[p].y;
		}
		return (a * 0.5) || 0;
	};

	// возвращает уникальный id
	this.generateUUID = (function () {
		// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
		var lut = [];
		for (var i = 0; i < 256; i++) {
			lut[ i ] = (i < 16 ? '0' : '') + (i).toString(16);
		}
		return function generateUUID () {
			var d0 = Math.random() * 0xffffffff | 0;
			var d1 = Math.random() * 0xffffffff | 0;
			var d2 = Math.random() * 0xffffffff | 0;
			var d3 = Math.random() * 0xffffffff | 0;
			var uuid = lut[ d0 & 0xff ] + lut[ d0 >> 8 & 0xff ] + lut[ d0 >> 16 & 0xff ] + lut[ d0 >> 24 & 0xff ] + '-' +
				lut[ d1 & 0xff ] + lut[ d1 >> 8 & 0xff ] + '-' + lut[ d1 >> 16 & 0x0f | 0x40 ] + lut[ d1 >> 24 & 0xff ] + '-' +
				lut[ d2 & 0x3f | 0x80 ] + lut[ d2 >> 8 & 0xff ] + '-' + lut[ d2 >> 16 & 0xff ] + lut[ d2 >> 24 & 0xff ] +
				lut[ d3 & 0xff ] + lut[ d3 >> 8 & 0xff ] + lut[ d3 >> 16 & 0xff ] + lut[ d3 >> 24 & 0xff ];
			// .toUpperCase() here flattens concatenated strings to save heap memory space.
			return uuid.toUpperCase();
		};
	}());

	this.diffNum = function (a, b) { // разница между числами diffNum(-1, 1) == 2
		if (a >= 0 && b >= 0) return Math.abs(a - b);
		if (a <= 0 && b <= 0) return Math.abs(Math.abs(a) - Math.abs(b));
		if (a <= 0 && b >= 0) return Math.abs(a) + b;
		if (a >= 0 && b <= 0) return a + Math.abs(b);
	};

	this.getPercentNum = function (val, min, max) { // получить процент от значения
		val = val != undefined ? val : 0;
		min = min != undefined ? min : 0;
		max = max != undefined ? max : 100;
		var percent = ((val - min) / (max - min)) * 100;
		return percent;
	};

	this.getValueNum = function (per, min, max) { // получить значение от процента
		per = per != undefined ? per : 0;
		min = min != undefined ? min : 0;
		max = max != undefined ? max : 100;
		var value = ((per / 100) * (max - min)) + min;
		return value;
	};

	this.getValueBetween = function (val, min, max) {
		var mx = Math.max(min, max);
		var mn = Math.min(min, max);
		return Math.max(Math.min(val, mx), mn);
	};

	this.contains = function (px, py, arrPoint) { // принадлежит ли точка полигону (Метод трассировки луча)
		var inside = false;
		var length = arrPoint.length;
		for (var i = 0, j = length - 1; i < length; j = i++) {
			if (arrPoint[i].x === px && arrPoint[i].y === py) return true; // если точка является углом считаем что пересечение есть

			var xi = arrPoint[i].x;
			var yi = arrPoint[i].y;
			var xj = arrPoint[j].x;
			var yj = arrPoint[j].y;
			var intersect = ((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
			if (intersect) {
				inside = !inside;
			}
		}
		return inside;
	};

	// получаем рект блоков при повороте
	var bounds = {
		maxX: 0,
		minX: 0,
		maxY: 0,
		minY: 0
	};
	var rectF = new Position();
	var arp = [new Position(), new Position(), new Position(), new Position()];
	var pn = new Position();
	this.getBoundsRect = function (_rect, angel) {
		pn.set(_rect.width / 2, _rect.height / 2);
		arp[0].set(0, 0);
		arp[1].set(_rect.width, 0);
		arp[2].set(_rect.width, _rect.height);
		arp[3].set(0, _rect.height);
		for (var i = 0; i < arp.length; i++) {
			this.rotationPoint(arp[i], angel, pn);
		}
		bounds.maxX = -_rect.width;
		bounds.minX = _rect.width;
		bounds.maxY = -_rect.height;
		bounds.minY = _rect.height;
		for (var i = 0; i < arp.length; i++) {
			bounds.maxX = Math.max(bounds.maxX, arp[i].x);
			bounds.minX = Math.min(bounds.minX, arp[i].x);
			bounds.maxY = Math.max(bounds.maxY, arp[i].y);
			bounds.minY = Math.min(bounds.minY, arp[i].y);
		}
		rectF.x = bounds.minX;
		rectF.y = bounds.minY;
		rectF.width = bounds.maxX - bounds.minX;
		rectF.height = bounds.maxY - bounds.minY;
		return rectF;
	};

	/**
	 * Получение высоты сегмента круга
	 * @param {number} chord - хорда круга (расстояние между двумя точка на окружности).
	 * @param {number} radius - радиус круга.
	 * @return {number|null} результат вычислений.
	 */
	this.getCurvatureByWidth = function (chord, radius) {
		if (Math.abs(chord) > radius * 2) return null;
		var baseSide = Math.pow(Math.abs(chord), 2);
		var hipSide = Math.pow(radius, 2);
		var angle = Math.acos((hipSide + hipSide - baseSide) / (2 * hipSide));
		return (radius * (1 - (Math.cos(angle / 2)))) * (chord < 0 ? -1 : 1);
	};

	/**
	* Получение ширины(длины хорды) относительно кривизны и радиуса
	*/
	this.getWidthByCurvature = function (curvature, radius) {
		return (radius * 2) * Math.sin(Math.acos(1 - ((2 * Math.abs(curvature)) / (radius * 2)))) * (curvature < 0 ? -1 : 1);
	};


	// одинаковы ли обекты
	var compare = function (obj1, obj2) {
		if (isPrimitive(obj1) && isPrimitive(obj2)) {
			return obj1 === obj2;
		}
		for (var p in obj1) {
			if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;
			switch (typeof (obj1[p])) {
				case 'object':
					if (!compare(obj1[p], obj2[p])) return false;
					break;
				case 'function':
					if (typeof (obj2[p]) === 'undefined' || (p !== 'compare' && obj1[p].toString() !== obj2[p].toString())) return false;
					break;
				case 'number':
					if (Number(Number(obj1[p]).toFixed(3)) !== Number(Number(obj2[p]).toFixed(3))) return false;
					break;
				default:
					if (obj1[p] !== obj2[p]) return false;
			}
		}
		for (var p in obj2) {
			if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;
		}
		return true;
	};
	function isPrimitive (test) {
		return (test !== Object(test));
	}
	this.compare = compare;
}

/**
 * Описывает линию.
 * @class
 */
function LinePosition (_p, _p1) {
	this.p = _p || new Position();
	this.p1 = _p1 || new Position();
	this.p2 = new Position();
	this.status = 0;
	this.perpendik = true;
	this.angel = 0;
	this.set = function (_p, _p1) {
		this.p = _p || 0;
		this.p1 = _p1 || 0;
	};
}

/**
 * Описывает точку.
 * @class
 * @param [_x=0] {number} кордината
 * @param [_y=0] {number} кордината
 * @param [_z=0] {number} кордината
 */
function Position (_x, _y, _z) {
	/** {number} кордината */
	this._x = _x || 0;
	/** {number} кордината */
	this._y = _y || 0;
	/** {number} кордината */
	this._z = _z || 0;

	this.xx=0;
	this.yy=0;	
	this.zz=0;
	/** Установка значений.
     * @param [_z=0] {number} _x - Центр первой окружности.
     * @param [_z=0] {number} _y - Центр первой окружности.
     * @param {number} _z - Центр первой окружности.
     */
	this.set = function (_x, _y, _z) {
		this._x = _x || 0;
		this._y = _y || 0;
		if (_z !== undefined) this._z = _z;
	};
	this.setPoint = function (p) {
		this._x = p.x;
		this._y = p.y;
		if (p.z !== undefined) this._z = p.z;
	};

	this.getObj = function () {
		var o = {};
		o.x = this._x;
		o.y = this._y;
		o.z = this._z;
		return o;
	};
	this.copy = function () {
		return new Position(this._x, this._y, this._z);
	};
}
Position.prototype = {
	set x (v) {
		// if(this._x==v)return;
		this._x = v;
	},
	get x () {
		return this._x;
	},

	set y (v) {
		// if(this._y==v)return;
		this._y = v;
	},
	get y () {
		return this._y;
	},
	set z (v) {
		// if(this._z==v)return;
		this._z = v;
	},
	get z () {
		return this._z;
	}
};


/**
 * Описывает точку.
 * @class
 * @param [_x=0] {number} кордината
 * @param [_y=0] {number} кордината
 * @param [_z=0] {number} кордината
 */
function PositionFun (_x, _y, _z, _fun) {
	/** {number} кордината */
	this._x = _x || 0;
	/** {number} кордината */
	this._y = _y || 0;
	/** {number} кордината */
	this._z = typeof _z !== 'function' ? (_z || 0) : 0;

	this.fun = typeof _z === 'function' ? _z : _fun;

	this.set = function (_x, _y, _z) {
		this._x = _x || 0;
		this._y = _y || 0;
		this._z = _z || 0;
		if (this.fun) this.fun();

	};
	this.setPoint = function (p) {
		this._x = p.x;
		this._y = p.y;
		this._z = p.z;
		if (this.fun) this.fun();
	};

	this.getObj = function () {
		var o = {};
		o.x = this._x;
		o.y = this._y;
		o.z = this._z;
		return o;
	};

	this.copy = function () {
		return new PositionFun(this._x, this._y, this._z);
	};
}
PositionFun.prototype = {
	set x (v) {
		// if(this._x==v)return;
		this._x = v;
		if (this.fun) this.fun();
	},
	get x () {
		return this._x;
	},

	set y (v) {
		// if(this._y==v)return;
		this._y = v;
		if (this.fun) this.fun();
	},
	get y () {
		return this._y;
	},
	set z (v) {
		// if(this._z==v)return;
		this._z = v;
		if (this.fun) this.fun();
	},
	get z () {
		return this._z;
	}
};
