export type Vector2D = {
  x: number;
  y: number;
};

export type Dimension2D = {
  width: number;
  height: number;
};

export type Object2D = Vector2D & Dimension2D;
