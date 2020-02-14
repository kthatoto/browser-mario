import movePlayer from '@/logics/movePlayer'

export default {

  // param(x): Integer
  // param(y): Integer
  movePlayer ({ commit, state }, { x, y }) {
    const movement = movePlayer(Object.assign({}, state), { x, y })
    commit('MOVE_PLAYER', movement)
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
