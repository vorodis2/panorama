

var timeTest;
function TimeTest () {

	timeTest = this;
	var self = this;
	this.text = '';
	this.stTime;
	this.diTime;
	this.diTimeOt = 0;
	this.diTimeOt2;
	this.diplus = 0;

	this.startTime = function () {
		this.text = '';
		this.dateObj = new Date();
		this.diTimeOt = 0;
		this.diplus = 0;
		this.diTimeOt2 = this.dateObj.getTime();
		this.stTime = this.dateObj.getTime();
		this.addSob('---startTime---');

	};

	this.addSob = function (s, tip) {
		if (tip != undefined) {
			if (tip == 'plus') {
				this.diplus = 0;
			}
			if (tip == 'visiplus') {
				if (this.text != '') this.text += '\n';
				this.text += 'время группы==' + Math.round(this.diplus) / 1000 + ' сек';
				this.diplus = 0;
				return;
			}

		}


		this.dateObj = new Date();
		this.diTimeOt2 = this.dateObj.getTime() - this.diTime;
		this.diTime = this.dateObj.getTime();
		this.diTimeOt = this.diTime - this.stTime;
		this.diplus += this.diTimeOt2;
		if (this.text != '') this.text += '\n';
		this.text += s + '::' + this.diTimeOt + '::' + this.diTimeOt2 + '::' + this.diplus;
	};


	this.log = function (s) {
		if (s == undefined)console.log('-------Выводим Лог TimeTest---------------');
		else console.log(s);
		console.log(this.text);
	};


	this.startTime();
}
