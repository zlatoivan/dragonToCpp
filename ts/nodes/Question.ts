import {addTabs, headerInterface, Node, Point} from "./Node";
import {Action, QuestionHeader} from "./SimpleIcons";
import {Body} from "./Body";
import {drawLineBetween, drawLineDL, drawLineRD} from "../drawing_simple";
import {a, lDis} from "../consts";


export class Question extends Node {
    header: QuestionHeader
    bodyYes: Body
    bodyNo: Body
    constructor(data: string) {
        super()
        this.header = new QuestionHeader(data)
        this.bodyYes = new Body()
        this.bodyNo = new Body()
        // this.bodyNo.statements.push(new Action('---'))
    }
    calc(x: number, y: number): Point {
        this.x = x
        this.y = y

        const headerSize = this.header.calc(x, y)
        const bodyYesSize = this.bodyYes.calc(x,
            y + headerSize.y + lDis)
        if (this.bodyYes.statements.length === 0)
            bodyYesSize.x = headerSize.x
        const bodyNoSize = this.bodyNo.calc(x + bodyYesSize.x + lDis,
            y + headerSize.y + lDis)

        this.top = this.header.top
        this.bottom = {
            x: x + a / 2,
            y: Math.max(this.bodyYes.bottom.y, this.bodyNo.bottom.y) // последнее - для узла с остальными ветвями
        }

        // console.log('Q calc', {
        //     x: bodyYesSize.x + bodyNoSize.x + lDis,
        //     y: this.bottom.y - y
        // })
        return {
            x: bodyYesSize.x + bodyNoSize.x + lDis,
            y: this.bottom.y - y
        }
    }

    draw(ctx) {
        this.header.draw(ctx)
        this.bodyYes.draw(ctx)
        this.bodyNo.draw(ctx)

        // 'Yes' lines
        drawLineBetween(ctx, this.header.bottom, this.bodyYes.top)
        drawLineBetween(ctx, this.bodyYes.bottom, this.bottom) // Если bodyYes < bodyNo

        // 'No' lines
        drawLineRD(ctx, this.header, this.bodyNo.top)
        drawLineDL(ctx, this.bodyNo.bottom, this.bottom)
    }

    convToCpp() {
        let cppProg = ''
        cppProg += 'if (' +  this.header.label + ') {\n' +
                addTabs(this.bodyYes.convToCpp()) +
            '} else {\n' +
                addTabs(this.bodyNo.convToCpp()) +
            '}' // body сам добавит в конце сюда '\n'

        return cppProg
    }

    getHeader(): headerInterface {
        return this.header.getHeader()
    }
}