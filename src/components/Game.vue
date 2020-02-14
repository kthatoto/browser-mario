<template lang="pug">
.game
  Player
  .player__position
    p x: {{ player.position.current.x }}
    p y: {{ player.position.current.y }}
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
      pressedKey: null
    }
  },
  created () {
    document.addEventListener('keydown', this.keydown)
    document.addEventListener('keyup', this.keyup)
    setInterval(() => { this.draw() }, constants.FRAME_RATE)
  },
  methods: {
    keydown (e) {
      this.pressedKey = e.key
    },
    keyup (e) {
      this.pressedKey = null
      if (e.key === ' ') {
        this.$store.dispatch('stopPlayerJump')
      }
    },
    handleKey () {
      switch (this.pressedKey) {
        case 'ArrowLeft':
          this.$store.dispatch('movePlayer', { x: -5, y: 0 })
          break
        case 'ArrowRight':
          this.$store.dispatch('movePlayer', { x: +5, y: 0 })
          break
        case 'ArrowDown':
          this.$store.dispatch('movePlayer', { x: 0, y: -5 })
          break
        case 'ArrowUp':
          this.$store.dispatch('movePlayer', { x: 0, y: +5 })
          break
        case ' ':
          this.$store.dispatch('startPlayerJump')
          break
      }
    },
    draw () {
      this.handleKey()
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
