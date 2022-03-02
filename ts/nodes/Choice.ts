import {addTabs, Node, Point} from "./Node";
import {CaseHeader, Switch} from "./SimpleIcons";
import {Body} from "./Body";
import {clickableElements} from "../main";
import {drawLine, drawLineBetween, drawLineDL} from "../drawing";
import {a, b, lDis} from "../consts";

export class Case extends Node {
    header: CaseHeader
    body: Body
    constructor() {
        super()
        this.header = new CaseHeader()
        this.body = new Body()
    }
    calc(x: number, y: number): Point {
        this.x = x
        this.y = y

        const headerSize = this.header.calc(x, y)
        const bodySize = this.body.calc(x, y + headerSize.y + lDis)

        this.top = this.header.top
        this.bottom = {x: x + a / 2,
                       y: y + headerSize.y + lDis + bodySize.y}

        if (bodySize.x === 0)
            bodySize.x = headerSize.x

        return {x: bodySize.x,
                y: this.bottom.y - y}
    }

    draw(ctx) {
        this.header.draw(ctx)
        this.body.draw(ctx)
        drawLineBetween(ctx, this.header.bottom, this.body.top)
    }

    convToCpp() {
        return 'case ' + this.header.convToCpp() + ':\n' +
                    addTabs(this.body.convToCpp()) +
                    addTabs('break;\n')
    }
}

export class Choice extends Node {
    switch: Switch
    caseArr: Array<Case>
    constructor() {
        super()
        this.switch = new Switch()
        this.caseArr = []
    }
    calc(x: number, y: number): Point {
        this.x = x
        this.y = y

        const switchSize = this.switch.calc(x, y)
        // y = y + b + lDis

        let prevOffsetX = 0
        let maxY = 0
        for (const s of this.caseArr) {
            const caseSize = s.calc(x + prevOffsetX, y + switchSize.y + lDis)
            prevOffsetX = prevOffsetX + caseSize.x + lDis
            maxY = Math.max(maxY, s.bottom.y)
        }

        this.top = {x: x + a / 2, y}
        this.bottom = {x: x + a / 2, y: maxY}

        return {x: prevOffsetX - lDis,
                y: this.bottom.y - y}
    }

    draw(ctx) {
        this.switch.draw(ctx)
        if (this.caseArr.length > 0)
            drawLineBetween(ctx, this.switch.bottom, this.caseArr[0].top)

        for (let i = 0; i < this.caseArr.length; i++) {
            this.caseArr[i].draw(ctx)
            drawLineDL(ctx, this.caseArr[i].bottom, this.bottom)
            // Соединяем Cases
            if (i > 0) {
                const ta = this.caseArr[i - 1]
                const tb = this.caseArr[i]
                drawLine(ctx, ta.x + a, ta.y + b / 2, tb.x, tb.y + b / 2)
            }
        }
    }

    convToCpp() {
        let cppProg = 'switch (' + this.switch.label + ') {\n'
        for (const c of this.caseArr)
            cppProg += addTabs(c.convToCpp())
        cppProg += '}'

        return cppProg
    }
}