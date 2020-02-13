<template lang="pug">
.game
  Player
</template>

<script>
export default {
  components: {
    Player: () => import('@/components/Player')
  },
  data () {
    return {}
  },
  created () {
  },
  methods: {
    send () {
    }
  }
}
</script>

<style lang="stylus" scoped>
//.game
</style>
