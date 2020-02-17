import constants from '@/constants'
import store from '@/store'

export default async (mapName, offset, objectAdditional) => {
  const mapData = (await import(`@/data/maps/${mapName}`)).default
  const chips = mapData.chips.split('\n')
    .filter(row => row)
    .map(row => row.split(' ').map(col => mapData.chipMeta[col].empty ? null : col))
  const mapHorizontalGridCount = Math.max.apply(null, chips.map(chipsRow => chipsRow.length))
  if (objectAdditional) {
    chips.reverse().forEach((chipsRow, gridY) => {
      chipsRow.forEach((chip, gridX) => {
        if (chip === null) return
        const chipMeta = mapData.chipMeta[chip]
        if (chipMeta.componentType === 'Block') blockHandler(mapData, chip, offset, gridX, gridY)
      })
    })
  }
  return {
    mapWidth: mapHorizontalGridCount * constants.GRID_LENGTH,
    previousMapName: mapData.previousMapName,
    nextMapName: mapData.nextMapName
  }
}

const blockHandler = (mapData, chip, offset, gridX, gridY) => {
  const chipMeta = mapData.chipMeta[chip]
  store.dispatch('addBlock', {
    component: chipMeta.componentName,
    data: {
      positionX: gridX * constants.GRID_LENGTH,
      positionY: gridY * constants.GRID_LENGTH,
      width: constants.GRID_LENGTH,
      height: constants.GRID_LENGTH,
      styles: chipMeta.styles
    }
  })
}
