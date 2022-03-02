import {addTabs, Node, Point} from "./Node";
import {ForClose, ForOpen} from "./SimpleIcons";
import {a, lDis} from "../consts";
import {Body} from "./Body";
import {drawLineBetween} from "../drawing";

export class For extends Node {
    forOpen: ForOpen
    body: Body
    forClose: ForClose

    constructor() {
        super()
        this.forOpen = new ForOpen()
        this.body = new Body()
        this.forClose = new ForClose()
    }
    calc(x: number, y: number): Point {
        this.x = x
        this.y = y

        let dopLDis = 2 * lDis
        if (this.body.statements.length === 0)
            dopLDis = lDis
        const forOpenSize = this.forOpen.calc(x, y)
        const bodySize = this.body.calc(x, y + forOpenSize.y + lDis)
        const forCloseSize = this.forClose.calc(x, y + forOpenSize.y + bodySize.y + dopLDis)

        this.top = {x: x + a / 2, y}
        this.bottom = {x: x + a / 2,
            y: y + forOpenSize.y + bodySize.y + forCloseSize.y + dopLDis}

        if (this.body.statements.length === 0)
            bodySize.x = forOpenSize.x

        return {x: bodySize.x,
            y: this.bottom.y - y}
    }
    draw(ctx) {
        this.forOpen.draw(ctx)
        this.body.draw(ctx)
        this.forClose.draw(ctx)
        drawLineBetween(ctx, this.forOpen.bottom, this.body.top)
        drawLineBetween(ctx, this.body.bottom, this.forClose.top)
    }
    convToCpp() {
        return 'for (' + this.forOpen.convToCpp() + ') {\n' +
                    addTabs(this.body.convToCpp()) +
                '}'
    }
}