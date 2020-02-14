export default {
  MOVE_PLAYER (state, { x, y }) {
    Object.assign(state.player.position.previous, state.player.position.current)
    Object.assign(state.player.position.current, {
      x: state.player.position.current.x + x,
      y: Math.max(state.player.position.current.y + y, 0)
    })
  }
}
