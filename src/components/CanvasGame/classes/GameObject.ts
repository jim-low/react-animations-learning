import { ctx as GameContext } from "..";
import { Dimension2D, Object2D, Vector2D } from "../types/common";

type GameObjectProps = {
  position?: Vector2D;
  dim?: Dimension2D;
  imagePath?: string;
  drawImageCentered?: boolean;
};

class GameObject {
  protected position: Vector2D;
  protected dim: Dimension2D;
  protected image: HTMLImageElement | null = null;
  protected imagePath: string;
  private drawImageCentered: boolean;

  private isImageLoaded: boolean = false;

  constructor(props: GameObjectProps) {
    const { position, dim, imagePath, drawImageCentered } = props;

    this.position = position || { x: 0, y: 0 };
    this.dim = dim || { width: 0, height: 0 };

    this.imagePath = imagePath || '';
    this.image = new Image(this.dim.width, this.dim.height);
    this.image.src = this.imagePath
    this.image.onload = () => {
      this.isImageLoaded = true;
    }

    this.drawImageCentered = drawImageCentered || false;
  }

  public getMeasurement(): Object2D {
    if (!this.drawImageCentered) {
      return {
        ...this.dim,
        ...this.position,
      };
    }

    return {
      ...this.dim,
      x: this.position.x - (this.dim.width / 2),
      y: this.position.y - (this.dim.height / 2),
    };
  }

  public getPosition(): Vector2D {
    return this.position;
  }

  public update() {}

  public drawHitbox() {
    const calibrated: Vector2D = this.drawImageCentered
      ? {
        x: this.position.x - this.dim.width / 2,
        y: this.position.y - this.dim.height / 2,
      }
      : { ...this.position };

    GameContext.beginPath();
    GameContext.moveTo(calibrated.x, calibrated.y);
    GameContext.lineTo(calibrated.x + this.dim.width, calibrated.y);
    GameContext.lineTo(calibrated.x + this.dim.width, calibrated.y + this.dim.height);
    GameContext.lineTo(calibrated.x, calibrated.y + this.dim.height);
    GameContext.lineTo(calibrated.x, calibrated.y);
    GameContext.stroke();
    GameContext.closePath();
  }

  public render() {
    if (!(this.image && this.isImageLoaded)) {
      return;
    }

    let position = { ...this.position };

    if (this.drawImageCentered) {
      position = {
        x: this.position.x - (this.dim.width / 2),
        y: this.position.y - (this.dim.height / 2),
      };
    }

    GameContext.drawImage(this.image!, position.x, position.y, this.dim.width, this.dim.height);
  }
}

export default GameObject;
