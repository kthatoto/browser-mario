<template lang="pug">
#app
  .screen
    Game
</template>

<script>
export default {
  components: {
    Game: () => import('@/components/Game')
  }
}
</script>

<style lang="stylus">
*
  margin: 0
  padding: 0
  box-sizing: border-box
  list-style: none
a
  text-decoration: none
  color: inherit
#app
  position: relative
  height: 100vh
  width: 100vw
  min-height: 500px
  min-width: 800px
  overflow: hidden
  .screen
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    margin: auto
    overflow: hidden
    border: 1px solid black
    width: 800px
    height: 500px
</style>
