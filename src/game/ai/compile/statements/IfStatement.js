import PrimaryStatement from './PrimaryStatement'
import BooleanExpression from './BooleanExpression'
import {
  MismatchStatementException
} from '../CompilerException'

import {
  indexOfStringInLines
} from '../utils'

export default class IfStatement extends PrimaryStatement {
  constructor(line, column = 0) {
    super('IfStatement', line, column)
    this.condition = null
    this.elseStatement = null
    this.endIfStatement = null
  }

  isCodeComplete() {
    return IfStatement.codeRegExp.test(this.code.join(' '))
  }

  setElseStatement(elseStatement) {
    this.elseStatement = elseStatement
  }

  setEndIfStatement(endIfStatement) {
    this.endIfStatement = endIfStatement

    if (this.elseStatement) {
      this.elseStatement.setEndIfStatement(endIfStatement)
    }
  }

  compile(config) {
    let joinedCode = this.code.join(' ')
    let groups = joinedCode.match(IfStatement.codeRegExp)
    if (!groups) {
      throw new MismatchStatementException('you try to compile as a if statement a statement which is not one', this)
    }

    let conditionStr = groups[1]
    let position = indexOfStringInLines(conditionStr, this.code)[0]

    this.condition = new BooleanExpression(this.line + position.start.line, position.start.column)
    for (let i = position.start.line; i <= position.end.line; i++) {
      let line = this.code[i]
      if (i === position.start.line) {
        line = line.substring(position.start.column)
      }
      if (i === position.end.line) {
        line = line.substring(0, line.length - (this.code[i].length - position.end.column))
      }
      this.condition.pushLine(line)
    }

    this.condition.compile(config)
  }

  execute(context) {
    let goto = null
    if (!this.condition.computeValue(context).value) {
      goto = this.elseStatement ? this.elseStatement : this.endIfStatement
    }
    return {
      step: true,
      complete: true,
      goto: goto,
      action: null
    }
  }
}

IfStatement.codeRegExp = /^\s*if\s+(.+)\s*:\s*$/
IfStatement.startLineRegExp = /^\s*if/