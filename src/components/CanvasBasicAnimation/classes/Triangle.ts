import { ctx, mouse } from "..";
import { Vector2D } from "../types";
import { toRadians } from "../utils";

type TriangleProps = {
  pos: Vector2D;
  followMouse: boolean;
  shrinkRate?: number;
};

class Triangle {
  private static MAX_LINE_LENGTH: number = 100;
  private static MIN_LINE_LENGTH: number = 5;
  private static SHRINK_RATE: number = 3;

  public static HUE: number = 0;
  public static HUE_CHANGE_RATE: number = 1;
  public static ANGLE: number = 0;
  public static ROTATE_SPEED: number = 0.025;

  private pos: Vector2D;
  private lineLength: number;
  private followMouse: boolean;
  private shrinkRate: number;

  constructor(props: TriangleProps) {
    const { pos, followMouse, shrinkRate } = props;

    this.pos = pos;
    this.lineLength = Triangle.MAX_LINE_LENGTH;
    this.followMouse = followMouse;
    this.shrinkRate = shrinkRate ?? Triangle.SHRINK_RATE;
  }

  setPosition(pos: Vector2D) {
    this.pos = pos;
  }

  getPosition(): Vector2D {
    return this.pos;
  }

  shouldRemove(): boolean {
    return this.lineLength <= Triangle.MIN_LINE_LENGTH;
  }

  render() {
    const p1Angle = toRadians(0);
    const p2Angle = toRadians(120);
    const p3Angle = toRadians(240);

    const p1 = {
      x: this.pos.x + Math.cos(Triangle.ANGLE + p1Angle) * this.lineLength,
      y: this.pos.y + Math.sin(Triangle.ANGLE + p1Angle) * this.lineLength,
    };
    const p2 = {
      x: this.pos.x + Math.cos(Triangle.ANGLE + p2Angle) * this.lineLength,
      y: this.pos.y + Math.sin(Triangle.ANGLE + p2Angle) * this.lineLength,
    };
    const p3 = {
      x: this.pos.x + Math.cos(Triangle.ANGLE + p3Angle) * this.lineLength,
      y: this.pos.y + Math.sin(Triangle.ANGLE + p3Angle) * this.lineLength,
    };

    ctx.strokeStyle = `hsl(${Triangle.HUE}, 80%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.closePath();
    ctx.stroke();
  }

  update() {
    this.lineLength -= this.shrinkRate;

    if (!this.followMouse) {
      return;
    }

    const delay: number = 0.05;
    const resultVector: Vector2D = {
      x: mouse.x - this.pos.x,
      y: mouse.y - this.pos.y,
    };
    this.pos.x += resultVector.x * delay;
    this.pos.y += resultVector.y * delay;
  }
}

export default Triangle;
