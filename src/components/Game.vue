<template lang="pug">
.game
  Player
  .debugconsole
    p x: {{ player.position.x }}
    p y: {{ player.position.y }}
  .game__objects
    .game__block(v-for="(block, i) in blocks" :key="'block:' + i" :is="block.component" v-bind="block.data" :offsetX="0")
</template>

<script>
import { mapGetters } from 'vuex'

import constants from '@/constants'
import mapReader from '@/logics/mapReader'

export default {
  components: {
    Player: () => import('@/components/Player'),
    Brick: () => import('@/components/blocks/Brick'),
    Floor: () => import('@/components/blocks/Floor')
  },
  computed: {
    ...mapGetters({
      player: 'getPlayer',
      blocks: 'getBlocks',
      map: 'getMap'
    })
  },
  data () {
    return {
      pressedKeys: []
    }
  },
  async created () {
    document.addEventListener('keydown', this.keydown)
    document.addEventListener('keyup', this.keyup)
    await this.mapInitialize()
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
      if (this.pressedKeys.includes('ArrowLeft')) this.$store.dispatch('acceleratePlayer', -constants.ACCELERATION)
      if (this.pressedKeys.includes('ArrowRight')) this.$store.dispatch('acceleratePlayer', constants.ACCELERATION)
      if (this.pressedKeys.includes(' ')) this.$store.dispatch('startPlayerJump')
    },
    async mapInitialize () {
      const currentResult = await mapReader(constants.INITIAL_CURRENT_MAP_NAME, 0, true)
      const nextResult = await mapReader(currentResult.nextMapName, currentResult.mapWidth, true)
      this.$store.dispatch('setMap', {
        previous: null,
        current: { name: constants.INITIAL_CURRENT_MAP_NAME, offset: 0, width: currentResult.mapWidth },
        next: {
          name: currentResult.nextMapName,
          offset: currentResult.mapWidth,
          nextName: nextResult.nextMapName,
          width: nextResult.mapWidth
        }
      })
    },
    draw () {
      this.handleKey()
      const movement = { x: this.player.movement.horizontalVelocity, y: -8 }
      if (this.player.status.floating) {
        this.$store.dispatch('decrementPlayerJump')
        movement.y += this.player.jumpStatus.power
      }
      this.$store.dispatch('decelerationPlayer')
      this.$store.dispatch('movePlayer', movement)
      if (this.player.position.x < this.map.current.offset && this.map.previous) {
        this.$store.dispatch('moveToPreviousMap')
      } else if (this.map.next.offset < this.player.position.x && this.map.next.nextName) {
        this.$store.dispatch('moveToNextMap')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
//.game
.debugconsole
  position: absolute
  top: 5px
  right: 5px
  width: 100px
  background-color: rgba(0, 0, 0, .7)
  color: white
  padding: 5px
  font-size: 10px
</style>
