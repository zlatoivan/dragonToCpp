import {a, b} from "./consts";


export function drawPlus(ctx, x, y, dPlus) {
    ctx.fillStyle = "rgb(0, 0, 255)";
    ctx.fillRect(x - dPlus / 2, y - dPlus / 2, dPlus, dPlus)
}

export function drawLabel(ctx, x, y, a, b, label: string) {
    ctx.fillText(label, x + 25, y + b / 2 + 1)
}

// Овал
function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.stroke();
}

// Title
export function drawTitleIcon(ctx, x, y, a, b) {
    roundedRect(ctx, x, y, a, b, b / 2)
}

// End
export function drawEndIcon(ctx, x, y, a, b) {
    roundedRect(ctx, x, y, a, b, b / 2)
}

// Action
export function drawActionIcon(ctx, x, y, a, b) {
    ctx.strokeRect(x, y, a, b)
}

// Question
export function drawQuestionIcon(ctx, x, y, a, b) {
    ctx.beginPath();
    ctx.moveTo(x + 20, y);
    ctx.lineTo(x + a - 20, y);
    ctx.lineTo(x + a, y + b / 2);
    ctx.lineTo(x + a - 20, y + b);
    ctx.lineTo(x + 20, y + b);
    ctx.lineTo(x, y + b / 2);
    ctx.closePath();
    ctx.stroke();

    ctx.fillText('yes', x + 33, y + b + 10)
    ctx.fillText('no', x + a + 10, y + 13)
}

// Choice
export function drawChoiceIcon(ctx, x, y, a, b) {
    ctx.beginPath();
    ctx.moveTo(x + 20, y);
    ctx.lineTo(x + a, y);
    ctx.lineTo(x + a - 20, y + b);
    ctx.lineTo(x, y + b);
    ctx.closePath();
    ctx.stroke();
}

// Case
export function drawCaseIcon(ctx, x, y, a, b) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + a, y);
    ctx.lineTo(x + a, y + 2/3 * b);
    ctx.lineTo(x + a / 2, y + b);
    ctx.lineTo(x, y + 2/3 * b);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath()
    ctx.moveTo(x, y + 2/3 * b)
    ctx.lineTo(x + a, y + 2/3 * b)
    ctx.stroke();
}

// For open
export function drawForOpenIcon(ctx, x, y, a, b) {
    ctx.beginPath();
    ctx.moveTo(x, y + b);
    ctx.lineTo(x, y + 1/2 * b);
    ctx.lineTo(x + 20, y);
    ctx.lineTo(x + a - 20, y);
    ctx.lineTo(x + a, y + 1/2 * b);
    ctx.lineTo(x + a, y + b);
    ctx.closePath();
    ctx.stroke();
}

// For close
export function drawForCloseIcon(ctx, x, y, a, b) {
    ctx.beginPath()
    ctx.moveTo(x, y);
    ctx.lineTo(x + a, y);
    ctx.lineTo(x + a, y + 1/2 * b);
    ctx.lineTo(x + a - 20, y + b);
    ctx.lineTo(x + 20, y + b);
    ctx.lineTo(x, y + 1/2 * b);
    ctx.closePath();
    ctx.stroke()
}


export function drawLineBetween(ctx, ta, tb) {
    const ax = ta.x
    const ay = ta.y
    const bx = tb.x
    const by = tb.y
    drawLine(ctx, ax, ay, bx, by)
}

export function drawLineRD(ctx, header, bodyNoTop) { // Right + Down
    const ax = header.x + a
    const ay = header.y + b / 2
    const tx = bodyNoTop.x
    const ty = ay
    const bx = tx
    const by = bodyNoTop.y
    drawLine(ctx, ax, ay, tx, ty)
    drawLine(ctx, tx, ty, bx, by)
}

export function drawLineDL(ctx, bodyNoBot, bot) { // Down + Left
    const ax = bodyNoBot.x
    const ay = bodyNoBot.y
    const tx = ax
    const ty = bot.y + b / 2
    const bx = bot.x
    const by = ty
    drawLine(ctx, ax, ay, tx, ty)
    drawLine(ctx, tx, ty, bx, by)
}

export function drawLine(ctx, ax, ay, bx, by) {
    ctx.beginPath()
    ctx.moveTo(ax, ay)
    ctx.lineTo(bx, by)
    ctx.stroke();
}