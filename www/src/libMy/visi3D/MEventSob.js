
// 'евент диспатча'

export default function MEventSob () {

	this.event = undefined;

	this.arrSobName = ['up', 'down', 	'move',	'out', 	'over', 'wheel'];
	this.arrSob = [[], [], [], [], [], []];

	this.pozSob = undefined;

	this.dispatcherEvent = function (tipSob, event) {		
		for (var i = 0; i < this.arrSobName.length; i++) {
			if (this.arrSobName[i] == tipSob) {

				if (event) event.type = tipSob;
				for (var j = 0; j < this.arrSob[i].length; j++) {
					this.arrSob[i][j](event);
				}
			}
		}
	};

	this.removeEvent = function (str, fun) {
		for (var i = 0; i < this.arrSobName.length; i++) {
			if (this.arrSobName[i] == str) {
				for (var j = 0; j < this.arrSob[i].length; j++) {
					if (this.arrSob[i][j] == fun) {
						this.arrSob[i].splice(j, 1);
					}
				}
			}
		}
	};

	this.addEvent = function (str, fun) {

		for (var i = 0; i < this.arrSobName.length; i++) {
			if (this.arrSobName[i] == str) {
				this.arrSob[i].push(fun);
			}
		}
	};
}
