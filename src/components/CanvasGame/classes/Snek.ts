import { mouse } from "..";
import { Vector2D } from "../types/common";
import GameObject from "./GameObject";

class Snek extends GameObject {
  private static MAX_SPEED: number = 5;
  private static MIN_SPEED: number = 1;
  private static SPEED_DIFFERENTIAL_RATE: number = 0.25;
  private static SPEED: number = 5;

  public static SPEED_RADIUS: number = 150;

  constructor() {
    super({
      position: { x: 100, y: 100 },
      imagePath: './src/assets/ant-international-logo.png',
      drawImageCentered: true,
      dim: { width: 50, height: 50 }
    });
  }

  private speedUp() {
    if (Snek.SPEED >= Snek.MAX_SPEED) {
      Snek.SPEED = Snek.MAX_SPEED;
      return;
    }

    Snek.SPEED += Snek.SPEED_DIFFERENTIAL_RATE;
  }

  private slowDown() {
    if (Snek.SPEED <= Snek.MIN_SPEED) {
      Snek.SPEED = Snek.MIN_SPEED;
      return;
    }

    Snek.SPEED -= Snek.SPEED_DIFFERENTIAL_RATE;
  }

  update() {
    const distance = Math.sqrt(Math.pow(mouse.x - this.position.x, 2) + Math.pow(mouse.y - this.position.y, 2));
    if (distance <= Snek.SPEED_RADIUS) {
      this.slowDown();
    } else {
      this.speedUp();
    }

    const resultVector: Vector2D = {
      x: mouse.x - this.position.x,
      y: mouse.y - this.position.y,
    };

    const angleRad = Math.atan2(resultVector.y, resultVector.x);
    this.position.x += Math.cos(angleRad) * Snek.SPEED;
    this.position.y += Math.sin(angleRad) * Snek.SPEED;
  }
}

export default Snek;
