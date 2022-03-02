import {Node, Point} from "./Node";
import {clickableElements} from "../main";
import {drawLineBetween} from "../drawing";
import {a, lDis} from "../consts";
import {ClickableIcon} from "../Clickable";

export class Body extends Node { // - всегда прямая линия
    statements: Array<Node> // выражения (группы блоков)
    constructor() {
        super()
        this.statements = []
    }

    // calc() возвращает размеры того, что отрисовалось
    calc(x: number, y: number): Point {
        this.x = x
        this.y = y
        let prevOffsetY = 0
        let maxX = 0
        for (const s of this.statements) {
            const stateSize = s.calc(x, y + prevOffsetY)
            prevOffsetY = prevOffsetY + stateSize.y + lDis
            maxX = Math.max(maxX, stateSize.x)
        }
        if (this.statements.length > 0)
            prevOffsetY = prevOffsetY - lDis
        this.top = {
            x: x + a / 2,
            y: y
        }
        this.bottom = {
            x: x + a / 2,
            y: y + prevOffsetY
        }
        return {x: maxX, y: prevOffsetY}
    }

    draw(ctx) {
        // this.statements.forEach((x) => x.draw())
        // for (const s of this.statements) {
        for (let i = 0; i < this.statements.length; i++) {
            this.statements[i].draw(ctx)
            if (i > 0)
                drawLineBetween(ctx, this.statements[i - 1].bottom, this.statements[i].top)
            clickableElements.push(new ClickableIcon(this, i))
        }
    }

    convToCpp() {
        let cppProg = ''
        for (const s of this.statements)
            cppProg += s.convToCpp() + '\n'
        return cppProg
    }
}