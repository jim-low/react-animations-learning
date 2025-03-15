import { useEffect, useRef } from "react";

export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D;

const CanvasAntVReplicate = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    canvas = canvasRef.current!
    ctx = canvas.getContext('2d')!;

    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight - 100;

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="border-black border-2 border-solid" />;
}

export default CanvasAntVReplicate;
