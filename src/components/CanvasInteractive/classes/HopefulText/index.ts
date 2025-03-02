import { Vector2D } from "../../../../types";

type HopefulTextProps = {
  pos: Vector2D;
  ctx: CanvasRenderingContext2D;
};

class HopefulText {
  public static hopefulTexts = [
    "加薪奖励 🙏",
    "减少加班 🤝",
    "大马B+，活力加加 💪",
  ];

  private ctx: CanvasRenderingContext2D;
  private text: string;

  private pos: Vector2D;
  private speed: number = 1;

  private opacity: number = 1;
  private opacityDecreaseRate: number = 0.01;

  constructor(props: HopefulTextProps) {
    const { pos, ctx } = props;

    this.text = HopefulText.hopefulTexts[Math.floor(Math.random() * HopefulText.hopefulTexts.length)];
    this.ctx = ctx;
    this.pos = { ...pos };
  }

  shouldDelete(): boolean {
    return this.opacity <= 0;
  }

  update() {
    this.pos = {
      ...this.pos,
      y: this.pos.y - this.speed,
    };
    this.opacity = this.opacity - this.opacityDecreaseRate;
  }

  render() {
    this.ctx.font = '32px sans-serif';
    this.ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;
    this.ctx.fillText(this.text, this.pos.x, this.pos.y);
  }
};

export default HopefulText;
