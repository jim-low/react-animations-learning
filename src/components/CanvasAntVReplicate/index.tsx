import { useEffect, useRef } from "react";
import { Vector2D } from "./types";
import BarChart from "./classes/BarChart";

export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D;
export const mouse: Vector2D = { x: 0, y: 0 };

const CanvasAntVReplicate = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barChart = useRef<BarChart>();

  useEffect(() => {
    canvas = canvasRef.current!
    ctx = canvas.getContext('2d')!;

    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight - 100;

    barChart.current = new BarChart({
      yAxis: {
        label: 'Time Spent (years) in Ant Group',
        unit: 'Years',
        showUnit: false,
        steps: 2,
        maxValue: 10,
        minValue: 1,
        bordered: true,
      },
      bars: [
        {
          color: 'blue',
          value: 2,
          label: 'Money',
          visible: false,
        },
        {
          color: 'red',
          value: 6,
          label: 'Learning Mandarin',
        },
        {
          color: 'pink',
          value: 9,
          label: 'Stress',
        },
      ]
    });

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      barChart.current?.render();

      animationId = requestAnimationFrame(animate);
    }

    animate();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    const handleMouseUpdate = (e: MouseEvent) => {
      mouse.x = e.offsetX;
      mouse.y = e.offsetY;
    };

    canvas && canvas.addEventListener('mousemove', handleMouseUpdate);
    return () => canvas && canvas.removeEventListener('mousemove', handleMouseUpdate);
  }, []);

  return <canvas ref={canvasRef} className="border-black border-2 border-solid" />;
}

export default CanvasAntVReplicate;
