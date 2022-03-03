import {addTabs, headerInterface, Node, Point} from "./Node";
import {Action, CaseHeader, Switch} from "./SimpleIcons";
import {Body} from "./Body";
import {drawLine, drawLineBetween, drawLineDL} from "../drawing_simple";
import {a, b, lDis} from "../consts";
import {clickableCasePluses} from "../Editor";
import {ClickableCasePlus} from "../Clickable";

export class Case extends Node {
    header: CaseHeader
    body: Body
    constructor(data: string) {
        super()
        this.header = new CaseHeader(data)
        this.body = new Body()
        // this.body.statements.push(new Action('defActionCase'))
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
        // clickableIcons.push(new ClickableIcon(this))
    }

    convToCpp() {
        return 'case ' + this.header.convToCpp() + ':\n' +
                    addTabs(this.body.convToCpp()) +
                    addTabs('break;\n')
    }

    getHeader(): headerInterface {
        return this.header.getHeader()
    }
}

export class Choice extends Node {
    switch: Switch
    caseArr: Array<Case>
    constructor(data: string) {
        super()
        this.switch = new Switch(data)
        this.caseArr = [new Case('c1'), new Case('c2')]
    }
    calc(x: number, y: number): Point {
        this.x = x
        this.y = y

        const switchSize = this.switch.calc(x, y)

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
            clickableCasePluses.push(new ClickableCasePlus(this.caseArr, i, 'left'))
            clickableCasePluses.push(new ClickableCasePlus(this.caseArr, i, 'right'))
        }
    }

    convToCpp() {
        let cppProg = 'switch (' + this.switch.label + ') {\n'
        for (const c of this.caseArr)
            cppProg += addTabs(c.convToCpp())
        cppProg += '}'

        return cppProg
    }

    getHeader(): headerInterface {
        return this.switch.getHeader()
    }
}