import Level from '../Level'
import CompilerConfig from '../../world/ai/compile/CompilerConfig'

/* speed: 71
if s == bonfire :
	a:
	fireball(s)
	step(e)
	jump a
else
	b:
	fireball(n)
	step(e)
	jump b
endif
*/

/* length: 4
a:
fireball(s)
fireball(n)
step(e)
jump a
*/

export default class Level8 extends Level {
  constructor(id) {
    super(id, {
      nameTemplate: "level8_name",
      objectiveTemplate: "level8_objective",
      startingCode: "a:\nstep(e)\njump a\n",
      startingEditorType: "graph",
      maxStep: 200,
      speedTarget: 71,
      lengthTarget: 4
    })

    Object.freeze(this)
  }

  buildCompilerConfig() {
    return new CompilerConfig({
      excludePrimary: ['assign'],
      variables: 0,
      terrainTypes: ['wall', 'floor'],
      objectTypes: ['bonfire'],
      valueFunctions: [],
      actionFunctions: ['step_once', 'fireball'],
      leftComparisonExpressions: ['direction'],
      rightComparisonExpressions: ['object_type', 'terrain_type']
    })
  }

  buildRuleset(world) {
    return super.buildRuleset(world, {
      win: 'all_bonfires',
      lose: 'default_loss'
    })
  }
}