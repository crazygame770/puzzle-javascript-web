/* length: 6
a:
take(w)
drop(e)
if nw < sw :
	take(sw)
endif
take(nw)
jump a
*/

/* speed: 23
a:
take(w)
drop(e)
if sw > nw :
	take(sw)
else
	take(nw)
endif
drop(e)
take(w)
drop(e)
jump a
*/

const winCondition = {
  beforeStart() {
    this.maxEggValue = this.world.eggs.reduce((accumulator, egg) => Math.max(egg.value, accumulator), 0)
  },

  check() {
    const cauldronID = 30
    let cauldron = this.world.findWorldObjectByID(cauldronID)
    return cauldron.items.length === 1 && cauldron.items[0].value === this.maxEggValue
  }
}

const notMaximumEggLossCondition = {
  beforeStart() {
    this.maxEggValue = this.world.eggs.reduce((accumulator, egg) => Math.max(egg.value, accumulator), 0)
  },

  check() {
    const cauldronID = 30
    let cauldron = this.world.findWorldObjectByID(cauldronID)
    return cauldron.items.length > 0 && cauldron.items[0].value < this.maxEggValue
  },

  getReason() {
    return 'not_maximum_egg_loss_condition'
  }
}

const level = {
  name: {
    en: "Human chain 2",
    fr: "Chaîne humaine 2",
  },
  objective: {
    en: "Put the %%icon icon-egg$%% egg of maximum value\ninto the %%icon icon-cauldron$%% cauldron\n\n%%icon mdi mdi-information-outline$%% In case of a tie, choose one of the two",
    fr: "Mets l'%%icon icon-egg$%% œuf de valeur maximum\ndans le %%icon icon-cauldron$%% chaudron\n\n%%icon mdi mdi-information-outline$%% En cas d'égalité, choisis l'un des deux",
  },
  messages: {
    not_maximum_egg_loss_condition: {
      en: "You put an %%icon icon-egg$%% egg which is not the maximum into the %%icon icon-cauldron$%% cauldron",
      fr: "Tu as mis un %%icon icon-egg$%% œuf qui n'est pas le maximum dans le %%icon icon-cauldron$%% chaudron",
    }
  },
  startingCode: "",
  startingEditorType: "graph",
  maxStep: 150,
  speedTarget: 23,
  lengthTarget: 6,

  compilerConfig: {
    excludePrimary: ['assign'],
    variables: 0,
    terrainTypes: ['wall', 'floor'],
    objectTypes: ['egg', 'cauldron', 'nothing'],
    valueFunctions: [],
    actionFunctions: ['take', 'drop'],
    leftComparisonExpressions: ['direction', 'myitem'],
    rightComparisonExpressions: ['direction', 'object_type', 'terrain_type', 'myitem']
  },

  ruleset: {
    win: [winCondition],
    lose: [notMaximumEggLossCondition, 'default_loss']
  }
}

export default level