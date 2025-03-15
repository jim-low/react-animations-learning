import { Vector2D } from "../types/common";
import GameObject from "./GameObject";

type ProjectProjectileProps = {
  speed: number;
  position: Vector2D;
  target: Vector2D;
};

class ProjectProjectile extends GameObject {
  private speed: number;
  private target: Vector2D;
  private traversalPath: Vector2D;

  private lifetimeFinished: boolean = false;
  private static LIFETIME: number = 5000;

  constructor(props: ProjectProjectileProps) {
    const { position, speed, target } = props;

    super({
      position,
      imagePath: './src/assets/document.png',
      dim: { width: 60, height: 80 },
    });

    this.speed = speed;
    this.target = target;

    // Boring Vector Math
    this.traversalPath = {
      x: this.position.x - this.target.x,
      y: this.position.y - this.target.y,
    };

    setTimeout(() => {
      this.lifetimeFinished = true;
    }, ProjectProjectile.LIFETIME);
  }

  public setTarget(target: Vector2D) {
    this.target = target;
  }

  public isLifetimeFinished(): boolean {
    return this.lifetimeFinished;
  }

  public update() {
    // result is in Radians
    const angle = Math.atan2(this.traversalPath.y, this.traversalPath.x);

    this.position.x += Math.cos(angle) * this.speed * -1;
    this.position.y += Math.sin(angle) * this.speed * -1;
  }
}

export default ProjectProjectile;
