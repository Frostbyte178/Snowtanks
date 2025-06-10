Class.towerBase = {
    PARENT: 'wall',
    LABEL: "Tower",
    SHAPE: 4,
    COLOR: {BASE: 9, BRIGHTNESS_SHIFT: 7.5},
    LAYER: 100,
    BORDER_FIRST: true,
}
Class.towerShort = {
    PARENT: 'towerBase',
    HEIGHT_SCALE: 1.5,
}
Class.towerMedium = {
    PARENT: 'towerBase',
    HEIGHT_SCALE: 2,
}
Class.towerTall = {
    PARENT: 'towerBase',
    HEIGHT_SCALE: 2.5,
}

Class.barrier = {
    PARENT: 'wall',
    ALPHA: 0,
    BORDERLESS: true,
}
