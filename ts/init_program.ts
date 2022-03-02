import {Action, End, Switch, Title} from "./nodes/SimpleIcons";
import {For} from "./nodes/For";
import {Question} from "./nodes/Question";
import {Case, Choice} from "./nodes/Choice";
import {Body} from "./nodes/Body";


export function initProgram(program) {
    // Action 1
    const action1 = new Action('a = 1;')
    const actionFor = new Action('a = 1;')

    // For
    const for1 = new For()
    for1.forOpen.label = 'i = 0; i < 5; i++'
    for1.forClose.label = ''
    // for1.body.statements.push(action1)
    for1.body.statements.push(actionFor)

    // Questions 1, 2
    const question1 = new Question()
    const actionYes = new Action('actionYes')
    const actionNo = new Action('actionNo')
    const actionYes2 = new Action('actionYes2')
    const actionNo2 = new Action('actionNo2')
    const question2 = new Question()
    const Q2actionYes = new Action('Q2actionYes')
    const Q2actionNo = new Action('Q2actionNo')
    question1.header.label = 'a < 2'
    question2.header.label = 'Q2'

    // Cases
    const cAction1 = new Action('a++;')
    const cAction2 = new Action('a == 2')
    const cAction3 = new Action('a = 3')
    const cAction4 = new Action('a = 4')
    const case1 = new Case()
    const case2 = new Case()
    const case3 = new Case()
    case1.header.label = 'case1'
    case2.header.label = 'case2'
    case3.header.label = 'case3'

    case1.body.statements.push(cAction1)
    case2.body.statements.push(for1)
    // case2.body.statements.push(cAction2)
    case3.body.statements.push(cAction3)
    case3.body.statements.push(cAction4)

    // Choice
    const choice = new Choice()
    choice.switch.label = 'a'
    choice.caseArr.push(case1)
    // choice.caseArr.push(case2)
    choice.caseArr.push(case3)

    const action3 = new Action('a = 3;')


    // ------------
    program.title = new Title('main')
    program.body = new Body()
    program.end = new End('End')

    program.body.statements.push(action1)

    question1.bodyYes.statements.push(actionYes)
    question1.bodyNo.statements.push(actionNo)
    question1.bodyYes.statements.push(actionYes2)
    // question1.bodyNo.statements.push(actionNo2)

    question2.bodyYes.statements.push(Q2actionYes)
    question2.bodyNo.statements.push(Q2actionNo)

    // question1.bodyNo.statements.push(question2)
    // question1.bodyNo.statements.push(choice)

    // program.body.statements.push(for1)
    program.body.statements.push(question1)
    // program.body.statements.push(choice)

    // program.body.statements.push(action3)


    console.log(program)
    // console.log(program.body.statements[1])

    // console.log(program.body.statements[1].bottom)
    // console.log(question1.bodyNo.statements[1].bottom)
    // console.log(program.calc(x0, y0), 'program.calc')
    // console.log(program.body.calc(x0, y0), 'program.body.calc')
}