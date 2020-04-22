// то что возврощаеться от событий
export default function MEvent3D () {
	this.target = undefined;
	this.face = undefined;
	this.point = undefined;
	this.faceIndex = undefined;
	this.type = undefined;
	this.uv = undefined;
	this.originalEvent = undefined;
	this.copy = function () {
		var r = new MEvent3D();
		r.target = this.target;
		r.face = this.face;
		r.point = this.point;
		r.faceIndex = this.faceIndex;
		r.type = this.type;
		r.uv = this.uv;
		r.originalEvent = this.originalEvent;
		return r;
	};
}
