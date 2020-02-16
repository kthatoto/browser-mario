import movePlayer from '@/logics/movePlayer'

export default {

  // param(x): Integer
  // param(y): Integer
  movePlayer ({ commit, state }, { x, y }) {
    const movement = movePlayer(Object.assign({}, state), { x, y })
    commit('MOVE_PLAYER', { x: movement.x, y: movement.y })
    if (movement.land) commit('SET_PLAYER_STATUS', { floating: false })
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
      commit('SET_PLAYER_JUMP_STATUS', { power: 10, timer: 20 })
    }
  },
  decrementPlayerJump ({ state, commit }) {
    if (state.player.jumpStatus.timer > 0) {
      commit('SET_PLAYER_JUMP_STATUS', { timer: state.player.jumpStatus.timer - 1 })
    } else if (state.player.jumpStatus.power > 0) {
      commit('SET_PLAYER_JUMP_STATUS', { power: state.player.jumpStatus.power - 0.2 })
    }
  },
  stopPlayerJump ({ commit }) {
    commit('SET_PLAYER_JUMP_STATUS', { timer: 0 })
    commit('SET_PLAYER_STATUS', { jumping: false })
  }
}
