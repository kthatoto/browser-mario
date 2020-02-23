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
      x: 10
    },
    jumpStatus: {
      power: 0,
      timer: 0
    },
    events: []
  },
  map: {
    previous: { name: null, offset: null, previousName: null, width: null },
    current: { name: null, offset: null, width: null },
    next: { name: null, offset: null, nextName: null, width: null }
  },
  objects: {
    blocks: []
    // component: chipMeta.componentName,
    // data: {
    //   mapName,
    //   positionX: gridX * constants.GRID_LENGTH + offset,
    //   positionY: gridY * constants.GRID_LENGTH,
    //   styles: chipMeta.styles,
    //   width,
    //   height
    // }
  }
}
