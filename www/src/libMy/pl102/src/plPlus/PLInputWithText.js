export function PLInputWithText (_cont, _x, _y, _text, _fun) {
	PLInput.call(this, _cont, _x, _y, _text, _fun);
	_cont.addChild(this);
	this.type = 'PLInputWithText';
	var self = this;
	pl102.addElement(this);


	this.otstup = 6;

	this.label = new PLLabel(this, 0, 0);
	this.label.visible = false;

	this.drawRect = function () {
		this.label.text = this._text;
		if (this.label.text == '') this.label.text = '0';

		this.rect = this.label.getRect();
		this.rect.width /= this.worldTransform.a;
		this.rect.height /= this.worldTransform.a;

		this.label.y = (this.input.height - this.rect.height) / 2;

		if (this.rect.width >= this._width) this.input.htmlElement.style.paddingRight = '0';
		else this.input.htmlElement.style.paddingRight = this.paddingRight + 'px';

		this.graphRect1.clear();
		this.graphRect1.beginFill('0x909090');
		this.graphRect1.drawRect(0, 0, this._width, this._height);
		this.graphRect1.beginFill('0xffffff');
		this.graphRect1.drawRect(1, 1, this._width - 2, this._height - 2);
		this.graphRect1.endFill();

		if (!this._activMouse) {
			this.graphRect.clear();
			this.graphRect.beginFill(pl102.color);
			this.graphRect.drawRect(0, 0, this._width, this._height);
			this.graphRect.endFill();
		} else {
			this.graphRect.clear();
		}
	};

	this.setText = function (_text) {
		if (this.label.visible == false) this.label.visible = true;
		this.label.text = _text;
		var rect = this.label.getRect();
		this.label.x = this._width + this.otstup;
		this.label.y = (this._height - rect.height) / 2;

		var lblTxt;
		lblTxt = this.label;
		language.setTextComp(lblTxt);
	};
}

PLInputWithText.prototype = Object.create(PLInput.prototype);
PLInputWithText.prototype.constructor = PLInputWithText;
Object.defineProperties(PLInputWithText.prototype, {
	title: {
		set: function (value) {
			if (this._title == value) return;
			this._title = value;
			if (this._title == '') this._title = 'null';

			if (this._title != 'null') {
				if (this.label.visible == false) this.label.visible = true;
				this.label.text = this._title;
			}
		},
		get: function () {
			return this._title;
		}
	}
});
