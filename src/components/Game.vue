<template lang="pug">
.game
  Player
  .player__position
    p x: {{ player.position.x }}
    p y: {{ player.position.y }}
    p(v-for="key in pressedKeys") {{ key }}
  .game__objects
    .game__block(v-for="(block, i) in blocks" :key="'block:' + i" :is="block.component" v-bind="block.data" :offsetX="0")
</template>

<script>
import { mapGetters } from 'vuex'

import constants from '@/constants'

export default {
  components: {
    Player: () => import('@/components/Player'),
    Brick: () => import('@/components/blocks/Brick')
  },
  computed: {
    ...mapGetters({
      player: 'getPlayer',
      blocks: 'getBlocks'
    })
  },
  data () {
    return {
      pressedKeys: []
    }
  },
  created () {
    document.addEventListener('keydown', this.keydown)
    document.addEventListener('keyup', this.keyup)
    setInterval(() => { this.draw() }, constants.FRAME_RATE)
  },
  methods: {
    keydown (e) {
      if (e.key === 'Meta' || e.key === 'Unidentified') return
      this.pressedKeys.push(e.key)
      this.pressedKeys = [...new Set(this.pressedKeys)]
    },
    keyup (e) {
      this.pressedKeys = this.pressedKeys.filter(key => e.key !== key)
      if (e.key === ' ') this.$store.dispatch('stopPlayerJump')
    },
    handleKey () {
      if (this.pressedKeys.includes('ArrowLeft')) this.$store.dispatch('movePlayer', { x: -5, y: 0 })
      if (this.pressedKeys.includes('ArrowRight')) this.$store.dispatch('movePlayer', { x: +5, y: 0 })
      if (this.pressedKeys.includes('ArrowDown')) this.$store.dispatch('movePlayer', { x: 0, y: -5 })
      if (this.pressedKeys.includes('ArrowUp')) this.$store.dispatch('movePlayer', { x: 0, y: +5 })
      if (this.pressedKeys.includes(' ')) this.$store.dispatch('startPlayerJump')
    },
    draw () {
      this.handleKey()
      const movement = { x: 0, y: -2 }
      if (this.player.status.floating) {
        this.$store.dispatch('decrementPlayerJump')
      }
      this.$store.dispatch('movePlayer', movement)
    }
  }
}
</script>

<style lang="stylus" scoped>
//.game
.player
  &__position
    position: absolute
    top: 5px
    right: 5px
</style>
