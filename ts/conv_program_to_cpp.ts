import {Program} from "./nodes/Program";

export function convProgramToCpp(program: Program, document: Document) {
    const cppProg = program.convToCpp()
    // console.log(cppProg)

    // Вывести в textArea программу на C++
    const cppProgArea = document.getElementById('cppProgArea') as HTMLTextAreaElement
    cppProgArea.value = cppProg

    // Кнопка 'Скопировать код'
    const copyCppProgButton = document.getElementById('copyCppProgButton') as HTMLButtonElement
    copyCppProgButton.onclick = () => {
        cppProgArea.select()
        navigator.clipboard.writeText(cppProgArea.value)
    }
}