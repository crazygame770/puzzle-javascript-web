<template>
<div class="line-cursors-container">
  <svg class="svg-defs">
    <defs>
      <g id="code-cursor">
        <path d="M 20, 22 H 5.2 c -2.7, 0 -5 -2.3 -5 -5 V 5 c 0 -2.8, 2.3 -5, 5 -5 H 20 L 30,11 Z" />
      </g>

      <filter id="code-cursor-dropshadow"
        width="150%"
        height="150%">
        <feGaussianBlur in="SourceAlpha"
          stdDeviation="3" />
        <feOffset dx="-1"
          dy="2"
          result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear"
            slope="0.2" />
          <feFuncB type="linear"
            slope="1"
            intercept="0.01" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  </svg>

  <ul class="cursors">

    <li v-for="cursor in cursors"
      :key="cursor.heroIndex"
      :class="{
				'cursor': true,
				'selected': cursor.selected
			}"
      :style="{
				top: cursor.top + 'px',
				transform: `rotate(${cursor.rotate}deg)`
			}">
      <svg viewbox="0 0 60 60">
        <use x="10"
          y="13"
          href="#code-cursor"
          filter="url(#code-cursor-dropshadow)"
          @mousedown="$emit('select-follow-hero', cursor.heroIndex)"
          @touchstart="$emit('select-follow-hero', cursor.heroIndex)" />
      </svg>
    </li>

  </ul>

</div>
</template>

<script>
import IfStatement from '../../../world/ai/compile/statements/IfStatement'
import EndIfStatement from '../../../world/ai/compile/statements/EndIfStatement'
import AnchorStatement from '../../../world/ai/compile/statements/AnchorStatement'

const lineHeight = 26

export default {
  props: {
    'statements': {
      type: Array
    },
    'debugContext': {
      type: Object
    },
    'followHeroIndex': {
      type: Number
    }
  },

  data: function() {
    return {
      followHeroCursorLine: 0
    }
  },

  watch: {
    debugContext: function() {
      this.updateFollowHeroCursorLine()
    },
    followHeroIndex: function() {
      this.updateFollowHeroCursorLine()
    }
  },

  computed: {
    cursors: function() {
      let cursors = []
      let lineSet = []

      for (let i = 0; i < this.debugContext.heroes.length; i++) {
        let heroContext = this.debugContext.heroes[i]
        let line = 0
        if (heroContext.cursorStatement) {
          line = heroContext.cursorStatement.line
        }
        let selected = i === this.followHeroIndex

        cursors.push({
          heroIndex: i,
          line: line,
          top: line * lineHeight - 6,
          rotate: 0,
          selected: selected
        })

        if (!lineSet.includes(line)) {
          lineSet.push(line)
        }
      }


      // Space and rotation between the cursors
      // when there are more than one on the same line
      const maxSpaced = 3
      const maxHeight = 16
      const maxRotate = 15

      for (let line of lineSet) {
        let lineCursors = cursors.filter(cursor => cursor.line === line)
        if (lineCursors.length > 1) {
          let nbSpaced = Math.min(lineCursors.length, maxSpaced)

          for (let i = 0; i < lineCursors.length; i++) {
            let subIndex = i % nbSpaced
            let ratio = ((subIndex + 1) / (nbSpaced + 1)) - 0.5
            let cursor = lineCursors[i]
            cursor.top += ratio * maxHeight
            cursor.rotate = -ratio * maxRotate
          }
        }
      }

      return cursors
    }
  },

  methods: {
    updateFollowHeroCursorLine() {
      let heroContext = this.debugContext.heroes[this.followHeroIndex]
      if (heroContext && heroContext.cursorStatement) {
        let line = heroContext.cursorStatement.line

        if (line !== this.followHeroCursorLine) {
          this.setFollowHeroCursorLine = line
          this.$emit('follow-hero-cursor-line-change', line)
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '../constants';

.svg-defs {
    position: absolute;
    width: 0;
    height: 0;
}

.line-cursors-container {
    position: relative;

    .cursors {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        list-style: none;
        padding: 0;
        margin: 0;

        .cursor {
            position: absolute;
            width: 100px;
            left: -6px;

            transition-property: top, transform;
            transition-duration: 200ms;
            pointer-events: none;

            svg {
                height: 60px;
                width: 60px;
            }

            &.selected {
                z-index: 20;
                svg use {
                    fill: #5D84C7;
                }
            }

            &:hover {
                z-index: 30;
            }

            svg use {
                transition: opacity 50ms ease;
                fill: lighten(#282c34, 10%);
                opacity: 0.9;
                pointer-events: fill;
                cursor: default;
            }

            &.selected svg use,
            svg use {
                &:hover {
                    opacity: 1;
                }
            }

            &:not(.selected) svg use:hover {
                fill: lighten(#282c34, 20%);
            }
        }
    }
}
</style>