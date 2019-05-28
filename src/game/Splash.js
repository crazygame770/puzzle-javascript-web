import Phaser from 'phaser'

import elf_f from './images/elf_f.png'
import elf_m from './images/elf_m.png'
import knight_f from './images/knight_f.png'
import knight_m from './images/knight_m.png'
import wizzard_f from './images/wizzard_f.png'
import wizzard_m from './images/wizzard_m.png'

// import tiny_zombie from './images/tiny_zombie.png'
// import goblin from './images/goblin.png'
// import imp from './images/imp.png'
// import skelet from './images/skelet.png'
// import muddy from './images/muddy.png'
// import swampy from './images/swampy.png'
// import zombie from './images/zombie.png'
// import masked_orc from './images/masked_orc.png'
// import orc_warrior from './images/orc_warrior.png'
// import orc_shaman from './images/orc_shaman.png'
// import necromancer from './images/necromancer.png'
// import wogol from './images/wogol.png'
// import chort from './images/chort.png'
// import big_zombie from './images/big_zombie.png'
// import ogre from './images/ogre.png'
// import big_demon from './images/big_demon.png'

import button_blue from './images/button_blue.png'
import button_red from './images/button_red.png'
// import lever from './images/lever.png'
import bonfire from './images/bonfire.png'
import egg from './images/egg.png'

import explosion from './images/explosion.png'
import ashes from './images/ashes.png'
import sleep_zzz from './images/sleep_zzz.png'
import follow_cursor from './images/follow_cursor.png'
import observation from './images/observation.png'
import direction_e from './images/direction_e.png'
import direction_s from './images/direction_s.png'
import direction_w from './images/direction_w.png'
import direction_n from './images/direction_n.png'
import direction_ne from './images/direction_ne.png'
import direction_se from './images/direction_se.png'
import direction_sw from './images/direction_sw.png'
import direction_nw from './images/direction_nw.png'

import fireworks1 from './images/fireworks1.png'
import fireworks2 from './images/fireworks2.png'

// AUDIO

import fireworks_sfx from './audio/fireworks.mp3'
import tests_sfx from './audio/tests.mp3'
import scream_sfx from './audio/scream.mp3'
import step_sfx from './audio/step.mp3'
import fireball_sfx from './audio/fireball.mp3'
import bonfire_sfx from './audio/bonfire.mp3'

// FONTS

import digits_font from './images/digits.fnt'
import digits_font_texture from './images/digits.png'


export default class extends Phaser.Scene {
  constructor() {
    super({
      key: 'SplashScene'
    })
  }

  preload() {
    this.disablePhaserFullscreenManagement()

    // load assets
    this.load.spritesheet('elf_f', elf_f, {
      frameWidth: 32,
      frameHeight: 56
    })
    this.load.spritesheet('elf_m', elf_m, {
      frameWidth: 32,
      frameHeight: 56
    })
    this.load.spritesheet('knight_f', knight_f, {
      frameWidth: 32,
      frameHeight: 56
    })
    this.load.spritesheet('knight_m', knight_m, {
      frameWidth: 32,
      frameHeight: 56
    })
    this.load.spritesheet('wizzard_f', wizzard_f, {
      frameWidth: 32,
      frameHeight: 56
    })
    this.load.spritesheet('wizzard_m', wizzard_m, {
      frameWidth: 32,
      frameHeight: 56
    })
    // this.load.spritesheet('tiny_zombie', tiny_zombie, {
    //   frameWidth: 32,
    //   frameHeight: 32
    // })
    // this.load.spritesheet('goblin', goblin, {
    //   frameWidth: 32,
    //   frameHeight: 32
    // })
    // this.load.spritesheet('imp', imp, {
    //   frameWidth: 32,
    //   frameHeight: 32
    // })
    // this.load.spritesheet('skelet', skelet, {
    //   frameWidth: 32,
    //   frameHeight: 32
    // })
    // this.load.spritesheet('muddy', muddy, {
    //   frameWidth: 32,
    //   frameHeight: 32
    // })
    // this.load.spritesheet('swampy', swampy, {
    //   frameWidth: 32,
    //   frameHeight: 32
    // })
    // this.load.spritesheet('zombie', zombie, {
    //   frameWidth: 32,
    //   frameHeight: 32
    // })
    // this.load.spritesheet('masked_orc', masked_orc, {
    //   frameWidth: 32,
    //   frameHeight: 40
    // })
    // this.load.spritesheet('orc_warrior', orc_warrior, {
    //   frameWidth: 32,
    //   frameHeight: 40
    // })
    // this.load.spritesheet('orc_shaman', orc_shaman, {
    //   frameWidth: 32,
    //   frameHeight: 40
    // })
    // this.load.spritesheet('necromancer', necromancer, {
    //   frameWidth: 32,
    //   frameHeight: 40
    // })
    // this.load.spritesheet('wogol', wogol, {
    //   frameWidth: 32,
    //   frameHeight: 40
    // })
    // this.load.spritesheet('chort', chort, {
    //   frameWidth: 32,
    //   frameHeight: 48
    // })
    // this.load.spritesheet('big_zombie', big_zombie, {
    //   frameWidth: 64,
    //   frameHeight: 68
    // })
    // this.load.spritesheet('ogre', ogre, {
    //   frameWidth: 64,
    //   frameHeight: 64
    // })
    // this.load.spritesheet('big_demon', big_demon, {
    //   frameWidth: 64,
    //   frameHeight: 72
    // })
    this.load.spritesheet('button_blue', button_blue, {
      frameWidth: 32,
      frameHeight: 32
    })
    this.load.spritesheet('button_red', button_red, {
      frameWidth: 32,
      frameHeight: 32
    })
    // this.load.spritesheet('lever', lever, {
    //   frameWidth: 32,
    //   frameHeight: 32
    // })
    this.load.spritesheet('bonfire', bonfire, {
      frameWidth: 28,
      frameHeight: 74
    })
    this.load.image('egg', egg)
    this.load.spritesheet('explosion', explosion, {
      frameWidth: 32,
      frameHeight: 32
    })
    this.load.spritesheet('ashes', ashes, {
      frameWidth: 56,
      frameHeight: 56
    })
    this.load.spritesheet('sleep_zzz', sleep_zzz, {
      frameWidth: 32,
      frameHeight: 56
    })
    this.load.spritesheet('fireworks1', fireworks1, {
      frameWidth: 100,
      frameHeight: 100
    })
    this.load.spritesheet('fireworks2', fireworks2, {
      frameWidth: 100,
      frameHeight: 100
    })
    this.load.image('follow_cursor', follow_cursor)
    this.load.image('observation', observation)
    this.load.image('direction_e', direction_e)
    this.load.image('direction_s', direction_s)
    this.load.image('direction_w', direction_w)
    this.load.image('direction_n', direction_n)
    this.load.image('direction_ne', direction_ne)
    this.load.image('direction_se', direction_se)
    this.load.image('direction_sw', direction_sw)
    this.load.image('direction_nw', direction_nw)

    // AUDIO
    this.load.audio('fireworks_sfx', fireworks_sfx)
    this.load.audio('tests_sfx', tests_sfx)
    this.load.audio('scream_sfx', scream_sfx)
    this.load.audio('step_sfx', step_sfx)
    this.load.audio('fireball_sfx', fireball_sfx)
    this.load.audio('bonfire_sfx', bonfire_sfx)

    //FONTS
    this.load.bitmapFont('digits_font', digits_font_texture, digits_font)

    // LEVEL SPECIFIC
    const level = this.game.gameSceneConfig.level
    this.load.json('map', level.mapPath)
    this.load.image('tileset_image', level.tilesetImagePath)
  }

  disablePhaserFullscreenManagement() {
    var vendors = ['webkit', 'moz', '']
    const listeners = this.scale.listeners

    vendors.forEach(prefix => {
      document.removeEventListener(prefix + 'fullscreenchange', listeners.fullScreenChange, false)
      document.removeEventListener(prefix + 'fullscreenerror', listeners.fullScreenError, false)
    })

    //  MS Specific
    document.removeEventListener('MSFullscreenChange', listeners.fullScreenChange, false)
    document.removeEventListener('MSFullscreenError', listeners.fullScreenError, false)
  }

  create() {
    this.scene.start('GameScene', this.game.gameSceneConfig)
  }

  update() {}
}