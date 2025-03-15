import { ctx as GameContext } from "..";
import { Vector2D } from "../types/common";
import GameObject from "./GameObject";

type ScoreType = 'MONEY' | 'OVERTIME' | 'PROJECT';

type FloatingTextProps = {
  position: Vector2D;
  type: ScoreType;
  keepText?: boolean;
};

class FloatingText extends GameObject {
  public static SCORE_TEXTS = {
    MONEY: [
      "增加奖金!",
      "发薪三秒，花光",
      "薪资保密，因太低",
    ],

    OVERTIME: [
      "减少加班!",
      "KPI就是Keep Pushing It",
      "下班是幻觉",
    ],

    PROJECT: [
      "会议比工作还多",
      "WorldFirst 但是我是 Money First",
      "大马B+，活力加加!",
    ],
  };

  private keepText: boolean;

  private text: string;

  private static LEVITATE_SPEED: number = 1;
  private direction: number;

  private static FADE_RATE: number = 0.01;
  private opacity: number = 1;

  constructor(props: FloatingTextProps) {
    const { position, type, keepText = false } = props;

    super({ position });

    const scoreTexts = FloatingText.SCORE_TEXTS[type];
    const randomIndex = Math.floor(Math.random() * scoreTexts.length);
    const randomText = scoreTexts[randomIndex];
    this.text = randomText;

    this.direction = Math.random() > 0.5 ? 1 : -1;
    this.keepText = keepText;
  }

  shouldRemove(): boolean {
    return this.opacity <= 0;
  }

  update() {
    this.position.x -= FloatingText.LEVITATE_SPEED * this.direction;
    this.position.y -= FloatingText.LEVITATE_SPEED;

    if (!this.keepText) {
      this.opacity -= FloatingText.FADE_RATE;
    }
  }

  render() {
    GameContext.font = '32px sans-serif';
    GameContext.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;
    GameContext.fillText(this.text, this.position.x, this.position.y);
  }
}

export default FloatingText;
