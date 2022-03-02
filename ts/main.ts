// Реализация структурного подмножества языка ДРАКОН

import {initDrawing} from "./init_drawing";
import {Program} from "./nodes/Program";
import {a, b, lDis, x0, y0} from "./consts";
import {initProgram} from "./init_program";
import {ClickableIcon, getIconDataInput} from "./Clickable";
import {convProgramToCpp} from "./conv_program_to_cpp";

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d')
const w = canvas.width
const h = canvas.height

const program = new Program()
let selectedIcon: ClickableIcon
export let clickableElements: Array<ClickableIcon> // plusesAndIcons


// Editor

function drawRed(selectedIcon) {
    const node = selectedIcon.body.statements[selectedIcon.index]
    ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    ctx.fillRect(node.x, node.y, a, b);
}

function drawProgram(ctx) {
    clickableElements = []
    initDrawing(ctx, w, h, x0, y0, a, b, lDis)
    program.calc(x0, y0)
    program.draw(ctx)
    if (selectedIcon !== undefined)
        drawRed(selectedIcon)
    // console.log('clEsems = ', clickableElements)
}

initProgram(program)
drawProgram(ctx)

convProgramToCpp(program, document)

// ---------------------


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

// Мониторинг курсора ЛКМ
function getMousePosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const mx = event.clientX - rect.left
    const my = event.clientY - rect.top
    console.log("Coordinate x: " + mx, "Coordinate y: " + my)

    for (const c of clickableElements) {
        const node = c.body.statements[c.index].getHeader()
        if (node.x < mx && mx < node.x + a && node.y < my && my < node.y + b) {
            c.onclick()
            selectedIcon = c
        }
        // else { // Неизвестная ошибка // Чтоб не обводить, если кликнули в другое место
        //     selectedIcon = undefined
        //     console.log('selectedIcon = undefined')
        // }
    }
    drawProgram(ctx)
    convProgramToCpp(program, document)
}

canvas.addEventListener("mousedown", function(e) {
    getMousePosition(canvas, e)
})