import { Object2D, Vector2D } from "../types";

export const isWithinArea = (position: Vector2D, target: Object2D): boolean => {
  const isLeftCollided = position.x > target.x;
  const isRightCollided = position.x < target.x + target.width;
  const isTopCollided = position.y > target.y;
  const isBottomCollided = position.y < target.y + target.height;

  return isLeftCollided && isRightCollided && isTopCollided && isBottomCollided;
};
