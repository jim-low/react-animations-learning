import { useEffect, useRef } from "react";
import { Vector2D } from "./types";
import BarChart from "./classes/BarChart";

export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D;
export const mouse: Vector2D = { x: 0, y: 0 };

const CanvasBarChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barChart = useRef<BarChart>();

  useEffect(() => {
    canvas = canvasRef.current!
    ctx = canvas.getContext('2d')!;

    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight - 100;

    barChart.current = new BarChart({
      yAxis: {
        title: 'What I Have Gained from Ant Group',
        label: 'Percentage',
        unit: '%',
        showUnit: false,
        steps: 10,
        maxValue: 100,
        bordered: true,
      },
      bars: [
        { color: '#3498DB  ', value: 10, label: 'Money', visible: false, },
        { color: '#F39C12  ', value: 30, label: 'Technical Skills', },
        { color: '#2ECC71  ', value: 80, label: 'Learning Mandarin', },
        { color: '#34495E', value: 100, label: 'Hearing my Chinese Name', },
        { color: '#9B59B6  ', value: 20, label: 'Collecting Ant Dolls', },
        { color: '#1ABC9C  ', value: 90, label: 'Fruits', },
        { color: '#E74C3C  ', value: 420, label: 'Stress', },
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

export default CanvasBarChart;
