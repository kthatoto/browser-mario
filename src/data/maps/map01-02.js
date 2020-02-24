export default {
  previousMapName: 'map01-01',
  nextMapName: 'map01-03',
  chips: `
... ... ... ... ... ... ...
... ... ... ... ... ... ...
... ... ... ... ... ... ...
... ... blk blk blk ... ...
... ... ... ... blk ... ...
... ... blk blk blk ... ...
... ... blk ... ... ... ...
... ... blk blk blk ... ...
... ... ... ... ... ... ...
... ... ... ... ... ... ...
... ... ... ... ... ... ...
f20 mmm mmm mmm mmm mmm mmm
`,
  chipMeta: {
    '...': { empty: true },
    mmm: { empty: true },
    blk: {
      empty: false,
      componentName: 'Brick',
      componentType: 'Block',
      styles: {
        // backgroundImage: `url(${require('@/assets/brick.png')})`
      }
    },
    f20: {
      empty: false,
      componentName: 'Floor',
      componentType: 'Block',
      horizontalGridCount: 7,
      styles: {
        // backgroundImage: `url(${require('@/assets/floor.png')})`
      }
    }
  }
}
