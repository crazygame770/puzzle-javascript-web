import Expression from './Expression'
import {
  MismatchStatementException,
  ForbiddenVariableIdentifierException
} from '../CompilerException'

export default class VariableIdentifier extends Expression {
  constructor(line, column) {
    super('VariableIdentifier', line, column)
    this.name = null
  }

  compile(config) {
    let joinedCode = this.code.join(' ')
    let res = joinedCode.match(VariableIdentifier.codeRegExp)
    if (!res) {
      throw new MismatchStatementException('you try to compile as a variable a statement which is not one', this)
    }

    this.name = joinedCode.trim()
    let allowedNames = config.getAllowedVariableIdentifiers()

    if (!allowedNames.some(allowedName => allowedName === this.name)) {
      throw new ForbiddenVariableIdentifierException(`the variable name ''${this.name}' is forbidden. You may choose between the following names: ${allowedNames}`, this)
    }
  }

  computeValue(context) {
    return context.variables[this.name]
  }
}

VariableIdentifier.codeRegExp = /^\s*([a-z])\s*$/