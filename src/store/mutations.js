export default {
  MOVE_PLAYER (state, { x, y }) {
    Object.assign(state.player.position, {
      x: state.player.position.x + x,
      y: state.player.position.y + y
    })
  },
  SET_PLAYER_STATUS (state, status) {
    Object.assign(state.player.status, status)
  },
  SET_PLAYER_JUMP_STATUS (state, jumpStatus) {
    Object.assign(state.player.jumpStatus, jumpStatus)
  },
  SET_PLAYER_MOVEMENT (state, movement) {
    Object.assign(state.player.movement, movement)
  },

  ADD_BLOCK (state, block) {
    state.objects.blocks.push(block)
  },

  SET_MAP (state, map) {
    Object.assign(state.map, map)
  }
}
