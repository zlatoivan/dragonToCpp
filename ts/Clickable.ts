import {Point} from "./nodes/Node";
import {Body} from "./nodes/Body";

export function getIconDataInput(): string {
    return (document.getElementById('iconDataInput') as HTMLInputElement).value
}

class Clickable {
    top: Point
    bottom: Point
    onclick() {
        throw Error('Not implemented')
    }
}

export class ClickableIcon extends Clickable {
    body: Body
    index: number
    constructor(body: Body, index: number) {
        super()
        this.body = body
        this.index = index
    }
    // Т.к. обводим все блоки одинаково, то в этом классе метод onclick() не нужен
    onclick() {
        console.log('icon clicked')
    }
}

export class ClickablePlus extends Clickable {
    body: Body
    index: number
    constructor(body: Body, index: number) {
        super()
        this.body = body
        this.index = index
    }
    onclick() {
        // get let d = document.getElementById('')
        // addIcon()
    }
}