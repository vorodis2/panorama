
function TestDesign(_cont, _arrLink, _fun) {
    var self = this;
    this.contentImage = new PIXI.Container();
    _cont.addChild(this.contentImage);
    this.content = new PIXI.Container();
    _cont.addChild(this.content);
    

    this.image = new PLImage(this.contentImage);
    this.image.interactive = false;

    this.fun = _fun;
    this._index = -1;
    var wh = 20;
    var otstup = 2;
    this._alpha = 0.5;
    this._activ = false;
    this._boolScale = true;
    this.arrLink = _arrLink;

    this._x = 0;
    this._y = 0;
    this._visible = true; 

    this.content.x = this._x;
    this.content.y = this._y;
    this.content.visible = this._visible;


    /*this.btn = new PLButton(this.content, 0, 0, "");
    this.btn.otstup = otstup;
    this.btn.boolKontur = true;
    this.btn.loadImeg("resources/images/admin/10.png");
    this.btn.setStile(1, wh, wh);
    this.btn.fun = function() {
        activ = !activ;
        self.window.visible = activ;
        self.image.visible = activ;
        if (self.arrLink.length != 0) self.image.link = self.arrLink[0];
    }*/
    this.checkBox = new PLCheckBox(this.content, 0, 0, "debag", function() {
        self.activ = this.value;
    });



    this.window = new PLWindow(this.content, wh + otstup, 0, "design");
    this.window.visible = false;
    this.window.scale.set(0.6, 0.6);
    this.window.panel.image.visible = false;
    this.window.width = 200;
    this.window.hasMinimizeButton = true;



    this.loadImage = function(_link) {
        this.image.link = _link;
        this.image.sprite.interactive = false;
    }

    this.down = function() {
        self.index = this.id;
        //self.image.link = this.arrLink[this.id]
    }

    this.image.funComplit = function() {
        this.width = this.picWidth;
        this.height = this.picHeight;
    }

    var shag = otstup * 2;
    for (var i = 0; i < this.arrLink.length; i++) {
        var btn = new PLButton(this.window.content, shag, otstup * 2, i + "", this.down);
        btn.id = i;
        btn.setStile(1, wh, wh);
        shag += btn.width + otstup * 2;
    }

    this.slider = new PLSliderBig(this.window.content, otstup * 2, wh + otstup * 2, "", function() {
        self.alpha = this.value;
    }, 0, 1);
    this.slider.width = 180;
    this.slider.okrug = 100;
    this.slider.value = this._alpha;
    self.image.alpha = this._alpha;

    var ccc = new PLCheckBox(this.window.content, otstup, 80, "scale0.75", function() {
        self.boolScale = this.value;
    });
    this.window.height = 111
}

TestDesign.prototype = {
    set alpha(v) {
        this._alpha = v;
        this.slider.value = v;
        this.image.alpha = this._alpha;
    },
    get alpha() {
        return this._alpha;
    },

    set activ(v) {
        this._activ = v;
        this.window.visible = v;
        this.checkBox.value = v;
        this.image.visible = v;
    },
    get activ() {
        return this._activ;
    },

    set index(v) {
        this._index = v;
        if (this.arrLink[this._index] != undefined) {
            this.image.link = this.arrLink[this._index];
            this.activ = true;
        }
    },
    get index() {
        return this._index;
    },
    set boolScale(v) {
        this._boolScale = v;
        if (this._boolScale == true) this.image.scale.y = this.image.scale.x = 0.75
        else this.image.scale.y = this.image.scale.x = 1;
    },
    get boolScale() {
        return this._boolScale;
    },
    set x(v) {
        if (this._x == v) return;
        this._x = v;
        this.content.x = this._x;
    },
    get x() {
        return this._x;
    },
    set y(v) {
        if (this._y == v) return;
        this._y = v;
        this.content.y = this._y;
    },
    get y() {
        return this._y;
    },
    set visible(v) {
        if (this._visible == v) return;
        this._visible = v;
        this.content.visible = this._visible;
        this.contentImage.visible = this._visible;
    },
    get visible() {
        return this._visible;
    }
};