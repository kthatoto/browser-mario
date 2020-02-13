export default {

  // param(x): Integer
  // param(y): Integer
  movePlayer ({ commit }, { x, y }) {
    commit('MOVE_PLAYER', { x, y })
  },
  forceMovePlayer ({ commit }, { x, y }) {
    commit('FORCE_MOVE_PLAYER', { x, y })
  },

  // param(eventName): String
  addPlayerEvent ({ commit }, eventName) {
    commit('ADD_PLAYER_EVENT', eventName)
  },

  clearPlayerEvents ({ commit }) {
    commit('CLEAR_PLAYER_EVENTS')
  },

  // param(height): Integer
  // param(width): Integer
  setPlayerSize ({ commit }, { height, width }) {
    commit('SET_PLAYER_SIZE')
  },

  startPlayerJump ({ commit }) {
    commit('START_PLAYER_JUMP')
  },

  stopPlayerJump ({ commit }) {
    commit('STOP_PLAYER_JUMP')
  }
}
