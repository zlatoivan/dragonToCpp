import {headerInterface, Node} from "./Node";
import {
    drawActionIcon, drawCaseIcon, drawChoiceIcon,
    drawEndIcon,
    drawForCloseIcon,
    drawForOpenIcon,
    drawLabel,
    drawQuestionIcon,
    drawTitleIcon
} from "../drawing_simple";
import {a, b, begin, end} from "../consts";


class SimpleIcon extends Node {
    label: string
    constructor(data: string) {
        super()
        this.label = data
    }
    convToCpp() {
        return this.label
    }
    getHeader() : headerInterface {
        return this
    }
}

export class Title extends SimpleIcon {
    draw(ctx) {
        drawTitleIcon(ctx, this.x, this.y, a, b)
        drawLabel(ctx, this.x, this.y, a, b, this.label)
    }
    convToCpp() {
        return begin
    }
}

export class End extends SimpleIcon {
    draw(ctx) {
        drawEndIcon(ctx, this.x, this.y, a, b)
        drawLabel(ctx, this.x, this.y, a, b, this.label)
    }
    convToCpp() {
        return end
    }
}

export class Action extends SimpleIcon {
    draw(ctx) {
        drawActionIcon(ctx, this.x, this.y, a, b)
        drawLabel(ctx, this.x, this.y, a, b, this.label)
    }
}

export class QuestionHeader extends SimpleIcon {
    draw(ctx) {
        drawQuestionIcon(ctx, this.x, this.y, a, b)
        drawLabel(ctx, this.x, this.y, a, b, this.label)
    }
}

export class Switch extends SimpleIcon {
    draw(ctx) {
        drawChoiceIcon(ctx, this.x, this.y, a, b)
        drawLabel(ctx, this.x, this.y, a, b, this.label)
    }
}

export class CaseHeader extends SimpleIcon {
    draw(ctx) {
        drawCaseIcon(ctx, this.x, this.y, a, b)
        drawLabel(ctx, this.x, this.y, a, b, this.label)
    }
}

export class ForOpen extends SimpleIcon {
    draw(ctx) {
        drawForOpenIcon(ctx, this.x, this.y, a, b)
        drawLabel(ctx, this.x, this.y, a, b, this.label)
    }
}

export class ForClose extends SimpleIcon {
    draw(ctx) {
        drawForCloseIcon(ctx, this.x, this.y, a, b)
        drawLabel(ctx, this.x, this.y, a, b, this.label)
    }
}