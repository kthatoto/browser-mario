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
    blocks: [
      {
        component: 'Brick',
        data: {
          positionX: 200,
          positionY: 30,
          width: constants.GRID_LENGTH,
          height: constants.GRID_LENGTH,
          styles: {}
        }
      },
      {
        component: 'Brick',
        data: {
          positionX: 320,
          positionY: 60,
          width: constants.GRID_LENGTH,
          height: constants.GRID_LENGTH,
          styles: {}
        }
      }
    ]
  }
}
