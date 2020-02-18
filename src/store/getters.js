export default {
  getPlayer (state) {
    return state.player
  },
  getBlocks (state) {
    return state.objects.blocks
  },
  getMap (state) {
    return state.map
  }
}
