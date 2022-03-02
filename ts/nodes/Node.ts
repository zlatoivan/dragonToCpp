import {a, b} from "../consts";

export function addTabs(s: string): string {
    // Разбили по '\n', добавили '\t' в начало каждого куска и склеили по '\n'
    const t = s.split('\n').map( (curS: string) => '\t' + curS ).join('\n')
    return t.substr(0, t.length - 1)
}

export interface Point { // список полей у объекта. Если есть, то реализует. У возвращ. есть
    x: number
    y: number
}

export interface headerInterface { // Только для типов!! А так не помогает
    label: string
    x: number
    y: number
}

export class Node { // Базовый класс. от него будут наследоваться
    x: number // Смещение - начало
    y: number
    top: Point
    bottom: Point
    calc(x: number, y: number) : Point { // тип возвр. значений Словарь (объект в js), чтобы подсказывалось
        // Стандартная реализация (простой блок, не составной)
        this.x = x
        this.y = y
        this.top = {x: x + a / 2, y}
        this.bottom = {x: x + a / 2, y: y + b}
        return {x: a, y: b}; // Смещение - габаритные размеры
    }
    draw(ctx) { // Виртуальный метод // Заглушка, чтотбы не забыли сделать draw у наследников
        throw Error('Not implemented')
    }
    convToCpp() {
        throw Error('Not implemented')
    }
    getHeader() : headerInterface {
        throw Error('Not implemented')
    }
}

// calc() :
// Принимает (x, y) - начало блока. Чтобы его вычислить, прибавляем к предыдущему блоку:
// ) размер предыдущего блока
// ) и lDis
// Возвращает габаритные размеры (РАЗМЕР, А НЕ КООРДИНАТЫ!)