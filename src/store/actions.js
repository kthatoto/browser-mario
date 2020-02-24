import movePlayer from '@/logics/movePlayer'
import mapReader from '@/logics/mapReader'
import constants from '@/constants'

export default {

  // param(acceleration): Float
  acceleratePlayer ({ state, commit }, acceleration) {
    const newVelocity = state.player.movement.horizontalVelocity + acceleration
    if (acceleration > 0) {
      commit('SET_PLAYER_MOVEMENT', { horizontalVelocity: Math.min(newVelocity, constants.MAX_SPEED) })
    } else {
      commit('SET_PLAYER_MOVEMENT', { horizontalVelocity: Math.max(newVelocity, -constants.MAX_SPEED) })
    }
  },
  decelerationPlayer ({ state, commit }) {
    const v = state.player.movement.horizontalVelocity
    if (Math.abs(v) < constants.DECELERATION) {
      commit('SET_PLAYER_MOVEMENT', { horizontalVelocity: 0 })
    } else {
      commit('SET_PLAYER_MOVEMENT', { horizontalVelocity: v + -constants.DECELERATION * Math.sign(v) })
    }
  },

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
  },

  addBlock ({ commit }, block) {
    commit('ADD_BLOCK', block)
  },
  putBlocks ({ commit }, blocks) {
    commit('PUT_BLOCKS', blocks)
  },

  setMap ({ commit }, map) {
    commit('SET_MAP', map)
  },
  async moveToNextMap ({ state, commit }) {
    if (state.map.previous) {
      commit('PUT_BLOCKS', state.objects.blocks.filter(b => b.data.mapName !== state.map.previous.name))
    }
    const previous = {
      name: state.map.current.name,
      offset: state.map.current.offset,
      previousName: state.map.previous ? state.map.previous.name : null,
      width: state.map.current.width
    }
    const current = { name: state.map.next.name, offset: state.map.next.offset, width: state.map.next.width }
    if (state.map.next.nextName) {
      const result = await mapReader(state.map.next.nextName, state.map.next.offset + state.map.next.width, false)
      const next = {
        name: state.map.next.nextName,
        offset: state.map.next.offset + state.map.next.width,
        nextName: result.nextMapName,
        width: result.mapWidth
      }
      commit('SET_MAP', { previous, current, next })
    } else {
      commit('SET_MAP', { previous, current, next: null })
    }
  },
  async moveToPreviousMap ({ state, commit }) {
    if (state.map.next) {
      commit('PUT_BLOCKS', state.objects.blocks.filter(b => b.data.mapName !== state.map.next.name))
    }
    const next = {
      name: state.map.current.name,
      offset: state.map.current.offset,
      nextName: state.map.next ? state.map.next.name : null,
      width: state.map.current.width
    }
    const current = { name: state.map.previous.name, offset: state.map.previous.offset, width: state.map.previous.width }
    if (state.map.previous.previousName) {
      const result = await mapReader(state.map.previous.previousName, state.map.previous.offset, true)
      const previous = {
        name: state.map.previous.previousName,
        offset: state.map.previous.offset - result.mapWidth,
        previousName: result.previousMapName,
        width: result.mapWidth
      }
      commit('SET_MAP', { previous, current, next })
    } else {
      commit('SET_MAP', { previous: null, current, next })
    }
  }
}
