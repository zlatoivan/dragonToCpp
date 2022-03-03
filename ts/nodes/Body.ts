import {Node, Point} from "./Node";
import {drawLineBetween} from "../drawing_simple";
import {a, lDis} from "../consts";
import {ClickableIcon, ClickableStandardPlus} from "../Clickable";
import {clickableIcons, clickableStandardPluses} from "../Editor";

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
        // this.statements.forEach((x) => x.calc())
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
        if (this.statements.length === 0)
            clickableStandardPluses.push(new ClickableStandardPlus(this, 0, 'top'))
        for (let i = 0; i < this.statements.length; i++) {
            this.statements[i].draw(ctx)
            if (i > 0)
                drawLineBetween(ctx, this.statements[i - 1].bottom, this.statements[i].top)
            clickableIcons.push(new ClickableIcon(this, i))
            clickableStandardPluses.push(new ClickableStandardPlus(this, i, 'top'))
            const nodeName = this.statements[i].constructor.name
            if (nodeName !== 'Question' && nodeName !== 'Choice') {
                clickableStandardPluses.push(new ClickableStandardPlus(this, i, 'bottom'))
            }
        }
    }

    convToCpp() {
        let cppProg = ''
        for (const s of this.statements)
            cppProg += s.convToCpp() + '\n'
        return cppProg
    }
}