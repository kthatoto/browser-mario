import constants from '@/constants'

export default {
  player: {
    status: {
      alive: true,
      dead: false,
      floating: false,
      jumping: false,
      direction: 'right'
    },
    movement: {
      horizontalVelocity: 0
    },
    size: {
      height: constants.GRID_LENGTH,
      width: constants.GRID_LENGTH
    },
    position: {
      y: 30,
      x: 400
    },
    jumpStatus: {
      power: 0,
      timer: 0
    },
    events: []
  },
  objects: {
    blocks: []
  }
}
