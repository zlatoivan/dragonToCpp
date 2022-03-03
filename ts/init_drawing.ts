// Очистка
function clear(ctx, w, h) {
    ctx.clearRect(0,0, w, h);
}

// Холст
function drawSheet(ctx, w, h, a, b, lDis) {
    // // Квдратик для разметки
    // ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
    // ctx.fillRect(0, 0, 20, 20);

    // Края холста
    ctx.strokeStyle="rgb(0, 0, 0)"
    ctx.strokeRect(0, 0, w, h)

    // Клетки
    ctx.strokeStyle="rgba(0, 0, 0, 0.1)"
    // Числа, обозначения
    ctx.font = "12px Serif";
    ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
    for (let i = 0; i < h / b; i++) {
        // Горизонтальные линии
        ctx.beginPath()
        ctx.moveTo(0, b * i + 10)
        ctx.lineTo(w, b * i + 10)
        ctx.stroke();
        ctx.fillText((b * i + 10).toString(), 10, b * i + 10)
        // Вертикальные линии
        ctx.beginPath()
        ctx.moveTo((a + lDis) * i, 0)
        ctx.lineTo((a + lDis) * i, h)
        ctx.stroke();
        ctx.fillText(((a + lDis) * i).toString(), (a + lDis) * i - 17, 10)
    }
}

// Базовые элементы для начала работы
export function initDrawing(ctx, w, h, x, y, a, b, lDis) {
    // Очистка
    clear(ctx, w, h)

    // Холст
    drawSheet(ctx, w, h, a, b, lDis)

    // Стиль блоков
    ctx.strokeStyle="rgb(0, 0, 0)"
    // Стиль текста
    ctx.font = "15px Serif";
    ctx.fillStyle = "rgb(0, 0, 255)";
}