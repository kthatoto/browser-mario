export default {
  MOVE_PLAYER (state, { x, y }) {
    Object.assign(state.player.position, {
      x: state.player.position.x + x,
      y: Math.max(state.player.position.y + y, 0)
    })
  },
  SET_PLAYER_STATUS (state, status) {
    Object.assign(state.player.status, status)
  },
  SET_PLAYER_JUMP_STATUS (state, jumpStatus) {
    Object.assign(state.player.jumpStatus, jumpStatus)
  }
}
