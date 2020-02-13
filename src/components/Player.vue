<template lang="pug">
.player(:style="playerStyle")
</template>

<script>
export default {
  computed: {
    playerStyle () {
      return {
        bottom: 0
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.player
  width: 30px
  height: 30px
  position: absolute
  z-index: 1
  background-color: black
  // background-size: 30px 30px
</style>
