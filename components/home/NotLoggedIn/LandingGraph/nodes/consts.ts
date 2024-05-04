export const componentNodeHeight = 175;
export const componentNodeWidth = 250;

export const gap = 50;

export const parentNodeXOffset = gap;
export const parentNodeYOffset = gap;

export const parentTextHeight = 25;

export const parentNodeHeight = componentNodeHeight * 2 + gap + parentNodeYOffset * 2 + parentTextHeight;

export const userNodeWidth = componentNodeWidth + parentNodeXOffset * 2;
export const secondBrainNodeWidth = componentNodeWidth * 2 + parentNodeXOffset * 3;

export const graphWidth = userNodeWidth + secondBrainNodeWidth + gap
export const graphHeight = parentNodeHeight

