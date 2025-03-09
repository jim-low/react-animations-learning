import { Vector2D } from "../types/common";
import GameObject from "./GameObject";

type AntOverTimeProps = {
  position: Vector2D;
};

class AntOverTime extends GameObject {
  constructor(props: AntOverTimeProps) {
    const { position } = props;

    const size: number = 100;
    super({
      position,
      drawImageCentered: true,
      imagePath: './src/assets/ant-overtime.png',
      dim: { width: size, height: size }
    });
  }
}

export default AntOverTime;
