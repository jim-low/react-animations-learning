import { Vector2D } from "../types/common";
import GameObject from "./GameObject";

type MoneyProps = {
  position: Vector2D;
};

class Money extends GameObject {
  constructor(props: MoneyProps) {
    const { position } = props;
    const size: number = 100;

    super({
      position,
      drawImageCentered: true,
      imagePath: './src/assets/money.png',
      dim: { width: size, height: size }
    });
  }
}

export default Money;
