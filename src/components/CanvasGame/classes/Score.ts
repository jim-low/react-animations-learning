import { ctx as GameContext } from "..";
import { Vector2D } from "../types/common";
import GameObject from "./GameObject";

type ScoreProps = {
  position: Vector2D;
  text?: string;
};

class Score extends GameObject {
  private text: string;
  private score: number;

  constructor(props: ScoreProps) {
    const { position, text = '' } = props;

    super({
      position,
      drawImageCentered: false,
    });

    this.text = text;
    this.score = 0;
  }

  setScore(score: number) {
    this.score = score;
  }

  update() {}

  render() {
    const text = `${this.text}: ${this.score}`;
    GameContext.font = '20px sans-serif'
    GameContext.fillStyle = 'black';
    GameContext.fillText(text, this.position.x, this.position.y);
  }
}

export default Score;
