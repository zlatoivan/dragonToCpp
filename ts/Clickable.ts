import {Body} from "./nodes/Body";
import {dPlus} from "./consts";
import {drawPlus} from "./drawing_simple";
import {Action} from "./nodes/SimpleIcons";
import {Question} from "./nodes/Question";
import {Case, Choice} from "./nodes/Choice";
import {For} from "./nodes/For";

export function getIconDataInput(): string {
    return (document.getElementById('iconDataInput') as HTMLInputElement).value
}

export function getIconTypeSelect(): string {
    return (document.getElementById('iconTypeSelect') as HTMLSelectElement).value
}

export class ClickableIcon {
    body: Body
    index: number
    constructor(body: Body, index: number) {
        this.body = body
        this.index = index
    }
}

export class ClickableStandardPlus {
    body: Body
    index: number
    x: number
    y: number
    orient: string
    constructor(body: Body, index: number, orient: string) {
        this.body = body
        this.index = index
        this.orient = orient
        let point = {x: body.top.x, y: this.body.top.y - 15}
        if (this.body.statements.length > 0) {
            if (orient === 'top')
                point = body.statements[index].top
            if (orient === 'bottom')
                point = body.statements[index].bottom
        }
        this.x = point.x
        this.y = point.y
    }

    onclick(csp) {
        const data = getIconDataInput()
        const type = getIconTypeSelect()

        let newObject
        switch (type) {
            case 'action': newObject = new Action(data); break
            case 'question': newObject = new Question(data); break
            case 'choice': newObject = new Choice(data); break
            case 'case': newObject = new Case(data); break
            case 'for': newObject = new For(data); break
        }

        if (csp.orient === 'top')
            if (csp.index - 1 < 0)
                csp.body.statements.unshift(newObject)
            else
                csp.body.statements.splice(csp.index - 1, 0, newObject)
        if (csp.orient === 'bottom')
            csp.body.statements.splice(csp.index + 1, 0, newObject)
    }

    draw(ctx) {
        drawPlus(ctx, this.x, this.y, dPlus)
    }
}

export class ClickableCasePlus {
    caseArr: Array<Case>
    index: number
    x: number
    y: number
    orient: string

    constructor(caseArr: Array<Case>, index: number, orient: string) {
        this.caseArr = caseArr
        this.index = index
        this.orient = orient
        let point = caseArr[index].top
        if (orient === 'left')
            point = {x: point.x - 60, y: point.y + 15}
        if (orient === 'right')
            point = {x: point.x + 60, y: point.y + 15}
        this.x = point.x
        this.y = point.y
    }

    onclick(ccp) {
        const data = getIconDataInput()
        const newObject = new Case(data)
        if (ccp.orient === 'left')
            if (ccp.index - 1 < 0) {
                ccp.caseArr.unshift(newObject)
            }
            else
                ccp.caseArr.splice(ccp.index - 1, 0, newObject)
        if (ccp.orient === 'right')
            ccp.caseArr.splice(ccp.index + 1, 0, newObject)
    }

    draw(ctx) {
        drawPlus(ctx, this.x, this.y, dPlus)
    }
}