import { Vector2D } from "../types/common";
import GameObject from "./GameObject";

type MoneyProps = {
  position: Vector2D;
};

class Money extends GameObject {
  constructor(props: MoneyProps) {
    const { position } = props;

    super({
      position,
      drawImageCentered: true,
      imagePath: './assets/money.png',
      dim: { width: 80, height: 60 }
    });
  }
}

export default Money;
