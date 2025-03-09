import { Vector2D } from "../types/common";

type PositionBoundary = {
  min: Vector2D;
  max: Vector2D;
};

export const getRandomPosition = (boundary: PositionBoundary): Vector2D => {
  const { min, max } = boundary;

  return {
    x: Math.random() * (max.x - min.x) + min.x,
    y: Math.random() * (max.y - min.y) + min.y,
  };
}

export const getRandomNumber = (min: number = 1, max: number = 10): number => {
  return Math.random() * (max - min) + min;
}

