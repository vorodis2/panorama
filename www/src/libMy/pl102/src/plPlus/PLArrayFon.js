
export function PLArrayFon(cont,_link) {
    PIXI.Container.call(this);
    this.type = 'PLArrayFon';
    var self = this;
    cont.addChild(this);

    this.content = new PIXI.Container();
    this.addChild(this.content);

    this.contentGraph = new PIXI.Container();
    this.addChild(this.contentGraph);

    this.link=_link||pl102.base;
    this._width  = 100;
    this._alphaIm = 0.3;
    this.colorLine = 0xa4a4a4;//pl102.color10//0xa4a4a4;
    this.lineWidth = 1;
    this.content.alpha = this._alphaIm;
    this.otstupLineImg = 1;
    //this._nizNum = 30;
    //this._nizAlpha = 0.2;

    this.graphics = new PIXI.Graphics();
    this.contentGraph.addChild(this.graphics);

    this.array;
    this.arrayImage = [];

    // this.y = 300

    var img;
    this.setArrFon = function (_arr){
        this.array = _arr;
        this.clear();

        for (var i = 0; i < this.array.length; i+=2) {

            if (this.arrayImage[i/2]) {
                this.arrayImage[i/2].visible = true; 
            } else {
                img = new PLImage(this.content, 0, 0, this.link);
                //img.alpha= this._nizAlpha;
                //img.height = this._nizNum;

                img.visible = true;
                img.width = this._width;
                this.arrayImage.push(img);
            }

            this.arrayImage[i/2].y = this.array[i];
            this.arrayImage[i/2].height = this.array[i+1] - this.lineWidth - this.otstupLineImg;
            this.arrayImage[i/2].kontur = false;
            //this.editHeight(this.arrayImage[i/2], this.array[i+1]);

            this.draw102();
        }
    }

    this.editHeight = function(_img, _h) {
        if (this._nizNum <= 0){
            _img.height = _h; 
            _img.y = 0;
        } else {
            if (_h > this._nizNum){
                _img.height = this._nizNum; 
                _img.y = _img.y + _h - this._nizNum;
            } else {
                _img.height = _h;
            }
        }      
    }

    
    var h;
    this.draw102 = function() {
        this.graphics.clear();

        for (var i = 0; i < this.arrayImage.length; i++) {
            if (this.arrayImage[i].visible == true) {
                h = this.arrayImage[i].y + this.arrayImage[i].height + this.lineWidth + this.otstupLineImg;
                this.graphics.beginFill();
                this.graphics.lineStyle(this.lineWidth, this.colorLine);
                this.graphics.moveTo(0, h);
                this.graphics.lineTo(this._width, h);
                this.graphics.endFill(); 
            }
        }

        
    }

    this.clear = function () {
        for (var i = 0; i < this.arrayImage.length; i++) {
            this.arrayImage[i].visible = false;
            this.arrayImage[i].y = 0;
        }
    }
};

PLArrayFon.prototype = Object.create(PIXI.Container.prototype);
PLArrayFon.prototype.constructor = PLArrayFon;
Object.defineProperties(PLArrayFon.prototype, {
    width: {
        set: function (value) {
            if(this._width == value) return;
            this._width = value;

            for (var i = 0; i < this.arrayImage.length; i++) {                                    
                this.arrayImage[i].width = this._width;                
            }
            this.draw102();
        },
        get: function () {
            return this._width;
        }
    },
    alphaIm: {
        set: function (value) {
            if(this._alphaIm == value) return;
            this._alphaIm = value
            this.content.alpha = value;

        },
        get: function () {
            return this._alphaIm;
        }
    },
});



