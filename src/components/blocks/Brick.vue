<template lang="pug">
.brick(:style="style")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    positionX: { type: Number, required: true },
    positionY: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    offsetX: { type: Number, default: 0 },
    styles: { type: Object, default: () => {} }
  },
  computed: {
    ...mapGetters({
      player: 'getPlayer'
    }),
    style () {
      const left = this.positionX + this.offsetX - this.player.position.current.x
      return Object.assign({
        left: `calc(50% + ${left}px)`,
        bottom: `${this.positionY}px`,
        width: `${this.width}px`,
        height: `${this.height}px`
      }, this.styles)
    }
  }
}
</script>

<style lang="stylus" scoped>
.brick
  position: absolute
  background-color: tan
</style>
