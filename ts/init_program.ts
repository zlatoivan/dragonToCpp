import {Action, End, Title} from "./nodes/SimpleIcons";
import {For} from "./nodes/For";
import {Question} from "./nodes/Question";
import {Case, Choice} from "./nodes/Choice";
import {Body} from "./nodes/Body";
import {Program} from "./nodes/Program";


export function initProgram(program: Program) {
    program.title = new Title('main')
    program.body = new Body()
    program.end = new End('End')
}

export function initProgramExample(program: Program    ) {
    // Action 1
    const action1 = new Action('int a = 1;')
    const actionFor = new Action('a = a * a;')

    // For
    const for1 = new For('i = 0; i < 5; i++')
    for1.body.statements.push(actionFor)

    // Questions 1, 2
    const question1 = new Question('a < 0')
    const question2 = new Question('a > 100')
    const actionYes = new Action('a += 100;')
    const actionNo = new Action('actionNo')
    const actionYes2 = new Action('actionYes2')
    const actionNo2 = new Action('actionNo2')
    const Q2actionYes = new Action('a = a / 2;')
    const Q2actionNo = new Action('a++;')

    // Cases
    const cAction1 = new Action('a++;')
    const cAction2 = new Action('a == 2;')
    const cAction3 = new Action('a = 3;')
    const cAction4 = new Action('a = 4;')
    const case1 = new Case('case1;')
    const case2 = new Case('case2;')
    const case3 = new Case('c3;')

    // case1.body.statements[0].getHeader().label = 'defCase1'
    case1.body.statements.push(cAction1)
    // case2.body.statements.push(for1)
    // case2.body.statements.push(cAction2)
    // case3.body.statements.push(for1)
    case3.body.statements.push(cAction4)

    // Choice
    const choice = new Choice('a mod 3')
    // choice.caseArr.push(case1)
    // choice.caseArr.push(case2)
    choice.caseArr.push(case3)
    choice.caseArr[1].body.statements.push(for1)

    const action3 = new Action('cout << a;')


    // ------------
    program.title = new Title('main')
    program.body = new Body()
    program.end = new End('End')

    program.body.statements.push(action1)

    question1.bodyYes.statements.push(actionYes)
    // question1.bodyNo.statements[0].getHeader().label = 'defActionNo' // ??
    // question1.bodyNo.statements.push(actionNo)
    // question1.bodyYes.statements.push(actionYes2)

    question2.bodyYes.statements.push(Q2actionYes)
    question2.bodyNo.statements.push(Q2actionNo)

    question1.bodyNo.statements.push(question2)
    question1.bodyNo.statements.push(choice)

    // question1.bodyNo.statements.push(actionNo2)

    // program.body.statements.push(for1)
    program.body.statements.push(question1)
    // program.body.statements.push(choice)

    program.body.statements.push(action3)


    console.log(program)
}