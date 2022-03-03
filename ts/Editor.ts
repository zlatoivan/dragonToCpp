import {Program} from "./nodes/Program";
import {ClickableCasePlus, ClickableIcon, ClickableStandardPlus, getIconTypeSelect} from "./Clickable";
import {initDrawing} from "./init_drawing";
import {a, b, dPlus, lDis, x0, y0} from "./consts";
import {initProgram, initProgramExample} from "./init_program";
import {convProgramToCpp} from "./conv_program_to_cpp";
import {getIconDataInput} from "./Clickable";

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d')
const w = canvas.width
const h = canvas.height

const program = new Program()
let selectedIcon: ClickableIcon
export let clickableIcons: Array<ClickableIcon>
export let clickableStandardPluses: Array<ClickableStandardPlus>
export let clickableCasePluses: Array<ClickableCasePlus>


function drawProgram(ctx) {
    clickableIcons = []
    clickableStandardPluses = []
    clickableCasePluses = []
    initDrawing(ctx, w, h, x0, y0, a, b, lDis)
    program.calc(x0, y0)
    program.draw(ctx)
    // console.log(clickableStandardPluses)
    console.log(program)
    if (selectedIcon !== undefined)
        drawRed(ctx, selectedIcon)
    if (getIconTypeSelect() === 'case')
        drawCasePluses(ctx)
    else
        drawStandardPluses(ctx)
}


// Заготовленный пример программы. Убрать его - F5
const programExample = document.getElementById('programExampleBtn') as HTMLButtonElement
programExample.onclick = () => {
    initProgramExample(program)
    drawProgram(ctx)
    convProgramToCpp(program, document)
}


export class Editor {
    init() {
        initProgram(program)
    }
    run () {
        drawProgram(ctx)
        convProgramToCpp(program, document)
    }
}


function drawRed(ctx, selectedIcon) {
    const node = selectedIcon.body.statements[selectedIcon.index]
    ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    ctx.fillRect(node.x, node.y, a, b);
}

function drawStandardPluses(ctx) {
    for (const c of clickableStandardPluses)
        c.draw(ctx)
}

function drawCasePluses(ctx) {
    for (const c of clickableCasePluses)
        c.draw(ctx)
}


// Кнопка 'Изменить надпись'
const changeIconDataBtn = document.getElementById('changeIconDataBtn') as HTMLButtonElement
changeIconDataBtn.onclick = () => {
    if (selectedIcon === undefined) {
        alert('Выберите блок с помощью ЛКМ')
        return
    }
    const node = selectedIcon.body.statements[selectedIcon.index]
    node.getHeader().label = getIconDataInput()
    selectedIcon = undefined // Чтоб не обводить то, что уже обработано
    drawProgram(ctx)
}

// Кнопка 'Удалить блок'
const deleteIconBtn = document.getElementById('deleteIconBtn') as HTMLButtonElement
deleteIconBtn.onclick = () => {
    if (selectedIcon === undefined) {
        alert('Выберите блок с помощью ЛКМ')
        return
    }
    selectedIcon.body.statements.splice(selectedIcon.index, 1)
    selectedIcon = undefined
    drawProgram(ctx)
}

const iconTypeSelect = document.getElementById('iconTypeSelect') as HTMLSelectElement
iconTypeSelect.onchange = () => {
    drawProgram(ctx)
}


// Мониторинг курсора ЛКМ
function getMousePosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const mx = event.clientX - rect.left
    const my = event.clientY - rect.top
    console.log("Coordinate x: " + mx, "Coordinate y: " + my)

    // Клик на блок
    let reached = false
    for (const ci of clickableIcons) {
        const node = ci.body.statements[ci.index].getHeader()
        if (node.x < mx && mx < node.x + a && node.y < my && my < node.y + b) {
            selectedIcon = ci;
            (document.getElementById('iconDataInput') as HTMLInputElement).value = node.label;
            reached = true
        }
    }
    if (!reached)
        selectedIcon = undefined

    // Клик на cтандартный плюсик
    for (const cp of clickableStandardPluses) {
        const d = dPlus / 2
        if (cp.x - d < mx && mx < cp.x + d && cp.y - d < my && my < cp.y + d) {
            cp.onclick(cp)
        }
    }

    // Клик на Case-плюсик
    for (const cp of clickableCasePluses) {
        const d = dPlus / 2
        if (cp.x - d < mx && mx < cp.x + d && cp.y - d < my && my < cp.y + d) {
            cp.onclick(cp)
        }
    }

    drawProgram(ctx)
    convProgramToCpp(program, document)
}

canvas.addEventListener("mousedown", function(e) {
    getMousePosition(canvas, e)
})