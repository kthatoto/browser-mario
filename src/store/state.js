import constants from '@/constants'

console.log(123)
export default {
  player: {
    status: {
      alive: true,
      dead: false,
      moving: false,
      floating: false,
      direction: 'right'
    },
    size: {
      height: constants.GRID_LENGTH,
      width: constants.GRID_LENGTH
    },
    position: {
      current: {
        y: 30,
        x: 400
      },
      previous: {
        y: 30,
        x: 400
      }
    },
    jumpStatus: {
      power: 0,
      verocity: 0
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
      }
    ]
  }
}
