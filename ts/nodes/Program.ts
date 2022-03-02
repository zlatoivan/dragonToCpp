import {addTabs, Node, Point} from "./Node";
import {End, Title} from "./SimpleIcons";
import {lDis} from "../consts";
import {Body} from "./Body";
import {drawLineBetween} from "../drawing";

export class Program extends Node {
    title: Title // Объект класса Title
    body: Body
    end: End
    calc(x: number, y: number) : Point {
        this.x = x
        this.y = y
        let dopLDis = 2 * lDis
        if (this.body.statements.length === 0)
            dopLDis = lDis
        const titleSize = this.title.calc(x, y) // Размеры title
        const bodySize = this.body.calc(x, y + titleSize.y + lDis) // передаем смещение title
        const endSize = this.end.calc(x, y + titleSize.y + bodySize.y + dopLDis)
        const maxX = Math.max(titleSize.x, bodySize.x, endSize.x)
        const sumY = titleSize.y + bodySize.y + endSize.y + dopLDis
        return {x: maxX, y: sumY}
    }
    draw(ctx) {
        this.title.draw(ctx)
        this.body.draw(ctx)
        this.end.draw(ctx)

        drawLineBetween(ctx, this.title.bottom, this.body.top)
        drawLineBetween(ctx, this.body.bottom, this.end.top)
    }
    convToCpp() {
        let cppProg = this.title.convToCpp()
        cppProg += addTabs(this.body.convToCpp())
        cppProg += this.end.convToCpp()
        return cppProg
    }
}