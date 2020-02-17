import movePlayer from '@/logics/movePlayer'

export default {

  // param(x): Integer
  // param(y): Integer
  movePlayer ({ commit, state }, { x, y }) {
    const movement = movePlayer(Object.assign({}, state), { x, y })
    commit('MOVE_PLAYER', { x: movement.x, y: movement.y })
    if (movement.land) commit('SET_PLAYER_STATUS', { floating: false })
    if (movement.hitHead) commit('SET_PLAYER_JUMP_STATUS', { timer: 0, power: 0 })
    if (movement.floating) commit('SET_PLAYER_STATUS', { floating: true })
  },
  // forceMovePlayer ({ commit }, { x, y }) {
  //   commit('FORCE_MOVE_PLAYER', { x, y })
  // },

  // // param(eventName): String
  // addPlayerEvent ({ commit }, eventName) {
  //   commit('ADD_PLAYER_EVENT', eventName)
  // },

  // clearPlayerEvents ({ commit }) {
  //   commit('CLEAR_PLAYER_EVENTS')
  // },

  // // param(height): Integer
  // // param(width): Integer
  // setPlayerSize ({ commit }, { height, width }) {
  //   commit('SET_PLAYER_SIZE')
  // },

  startPlayerJump ({ state, commit }) {
    if (!state.player.status.floating && !state.player.status.jumping) {
      commit('SET_PLAYER_STATUS', { floating: true, jumping: true })
      commit('SET_PLAYER_JUMP_STATUS', { power: 12, timer: 25 })
    }
  },
  decrementPlayerJump ({ state, commit }) {
    if (state.player.jumpStatus.timer > 0) {
      commit('SET_PLAYER_JUMP_STATUS', { timer: state.player.jumpStatus.timer - 1 })
    } else if (state.player.jumpStatus.power > 0) {
      commit('SET_PLAYER_JUMP_STATUS', { power: Math.max(state.player.jumpStatus.power - 0.2, 0) })
    }
  },
  stopPlayerJump ({ commit }) {
    commit('SET_PLAYER_JUMP_STATUS', { timer: 0 })
    commit('SET_PLAYER_STATUS', { jumping: false })
  }
}
