import map from './map000.json'

const level = {
  mapConfig: map,
  startingCode: "step(s)\nstep(s)\n",
  startingEditorType: "graph",
  maxStep: Infinity,
  speedTarget: 3,
  lengthTarget: 3,
  compilerConfig: {
    excludePrimary: [],
    terrainTypes: ['wall', 'floor'],
    objectTypes: ['hero', 'egg', 'nothing', 'bonfire', ],
    actionFunctions: ['step', 'fireball', 'take', 'drop', 'write'],
    valueFunctions: ['set', 'calc'],
    variables: 26,
    leftComparisonExpressions: ['direction', 'myitem'],
    rightComparisonExpressions: ['object_type', 'terrain_type', 'direction', 'myitem']
  },
}

export default level