export default class MTipVisi {
    constructor(par, parDCont, fun) {
        this.type = 'MTipVisi'
        this.par = par
        this.fun = fun
        this.otstup = this.par.otstup
        this.dCont = new DCont(parDCont)
        this.view2d = true

        this.button = new DButton(this.dCont, this.otstup, this.otstup, "", () => {
            this.button.loadImeg(`resources/data/${this.view2d ? 7 : 6}/100.png`)
            this.view2d = !this.view2d
            this.fun('tipVisi', +this.view2d)
        }, 'resources/data/6/100.png')

        this.button.width = this.button.height = 80
    }

    set x(value) {
        this.dCont.x = value
    }
    get x() {
        return this.dCont.x
    }

    set y(value) {
        this.dCont.y = value
    }
    get y() {
        return this.dCont.y
    }

    set width(value) {
        this.button.width = value
    }
    get width() {
        return this.button.width
    }

    set height(value) {
        this.button.height = value
    }
    get height() {
        return this.button.height
    }
}