import { useEffect, useRef } from "react"
import HopefulText from "./classes/HopefulText";

const CanvasAnimation = () => {
  const canvasRef = useRef(null);
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  const spawnTextsInterval = 3000;

  let floatingTexts: HopefulText[] = [];
  const spawnText = () => {
    if (!canvas && !ctx) {
      return;
    }

    const max = canvas.width - 350;
    const min = 20;
    const floatingText = new HopefulText({
      ctx,
      pos: {
        x: Math.random() * (max - min) + min,
        y: Math.random() * canvas.height / 2,
      },
    });

    floatingTexts.push(floatingText);
  }

  const floatingTextsController = () => {
    floatingTexts.forEach((textObject, index) => {
      textObject.update();
      textObject.render();

      // remove object when fully disappeared
      if (textObject.shouldDelete()) {
        floatingTexts = floatingTexts.filter((_, idx) => index !== idx);
      }
    })
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
      floatingTextsController();
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

export default CanvasAnimation
