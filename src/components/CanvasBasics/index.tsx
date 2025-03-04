import { useEffect, useRef } from "react"
import HopefulText from "./classes/HopefulText";
import { Vector2D } from "../../types";

const CanvasBasics = () => {
  const canvasRef = useRef(null);
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  const spawnTextsInterval = 3000;

  const spawnText = () => {
    if (!ctx) {
      return;
    }

    const max: Vector2D = { x: canvas.width - 350, y: canvas.height / 2 };
    const min: Vector2D = { x: 20, y: 100 };

    const floatingText = new HopefulText({
      ctx,
      pos: {
        x: Math.random() * (max.x - min.x) + min.x,
        y: Math.random() * (max.y - min.y) + min.y,
      },
    });

    HopefulText.floatingTexts.push(floatingText);
  }

  const floatingTextLoop = () => {
    HopefulText.floatingTexts.forEach((textObject, index) => {
      textObject.update();
      textObject.render();

      if (textObject.shouldDelete()) {
        HopefulText.floatingTexts = HopefulText.floatingTexts.filter((_, idx) => index !== idx)
      }
    });
  }

  // "game" loop
  useEffect(() => {
    canvas = canvasRef?.current!;
    ctx = canvas?.getContext('2d')!;

    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight - 100;

    const spawnTextsIntervalId = setInterval(spawnText, spawnTextsInterval);

    let animateId: number = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      floatingTextLoop();
      animateId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animateId);
      clearInterval(spawnTextsIntervalId);
    }
  }, []);

  return (
    <canvas ref={canvasRef} className="border border-[black] border-solid"></canvas>
  )
}

export default CanvasBasics
