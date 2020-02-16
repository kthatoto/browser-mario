<template lang="pug">
.player(:style="playerStyle")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      player: 'getPlayer'
    }),
    playerStyle () {
      return {
        bottom: this.player.position.y + 'px',
        width: this.player.size.width + 'px',
        height: this.player.size.height + 'px',
        left: `calc(50% - ${this.player.size.width}px / 2)`
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.player
  position: absolute
  z-index: 1
  background-color: black
  // background-size: 30px 30px
</style>
