import constants from '@/constants'
import store from '@/store'

export default async (mapName, offset, isPrevious) => {
  const mapData = (await import(`@/data/maps/${mapName}`)).default
  const chips = mapData.chips.split('\n')
    .filter(row => row)
    .map(row => row.split(' ').map(col => mapData.chipMeta[col].empty ? null : col))
  const mapWidth = Math.max.apply(null, chips.map(chipsRow => chipsRow.length)) * constants.GRID_LENGTH
  const computedOffset = offset - (isPrevious ? mapWidth : 0)
  chips.reverse().forEach((chipsRow, gridY) => {
    chipsRow.forEach((chip, gridX) => {
      if (chip === null) return
      const chipMeta = mapData.chipMeta[chip]
      if (chipMeta.componentType === 'Block') blockHandler(mapName, mapData.chipMeta[chip], computedOffset, gridX, gridY)
    })
  })
  return {
    mapWidth,
    previousMapName: mapData.previousMapName,
    nextMapName: mapData.nextMapName
  }
}

const blockHandler = (mapName, chipMeta, offset, gridX, gridY) => {
  const width = (chipMeta.horizontalGridCount || 1) * constants.GRID_LENGTH
  const height = (chipMeta.verticalGridCount || 1) * constants.GRID_LENGTH
  store.dispatch('addBlock', {
    component: chipMeta.componentName,
    data: {
      mapName,
      positionX: gridX * constants.GRID_LENGTH + offset,
      positionY: gridY * constants.GRID_LENGTH,
      styles: chipMeta.styles,
      width,
      height
    }
  })
}
