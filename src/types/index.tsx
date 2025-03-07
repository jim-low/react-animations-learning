export enum PageTabs {
  CANVAS_CHARTS_AND_GRAPH = 'CANVAS_CHARTS_AND_GRAPH',
  CANVAS_GAME = 'CANVAS_GAME',
  CANVAS_ANTV_REPLICATE = 'CANVAS_ANTV_REPLICATE',
};

export type Vector2D = {
  x: number;
  y: number;
};

export type Dimensions2D = {
  width: number;
  height: number;
};

export enum EAntLogoState {
  INIT = 'INIT',
  EXPAND = 'EXPAND',
  BOUNCE = 'BOUNCE',
};
