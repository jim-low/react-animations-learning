import { useEffect, useRef } from "react";
import { Vector2D } from "./types";
import Triangle from "./classes/Triangle";

export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D;
export const mouse: Vector2D = {
  x: 0,
  y: 0,
};

const MOUSE_RADIUS = 10;

const MOUSE_MOVING_SPAWN_TRIANGLES_INTERVAL = 50;
const MOUSE_STOP_SPAWN_TRIANGLES_INTERVAL = 500;
let lastSpeed = MOUSE_STOP_SPAWN_TRIANGLES_INTERVAL;

let leadingTriangle = new Triangle({
  followMouse: true,
  shrinkRate: 0,
  pos: { ...mouse },
});

const CanvasBasicAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const triangles = useRef<Triangle[]>([]);
  let spawnTrianglesId: number = 0;

  const spawnTriangle = () => {
    const triangle = new Triangle({
      pos: { ...leadingTriangle.getPosition() },
      followMouse: false,
    });
    triangles.current.push(triangle);
  };

  const startSpawnTrianglesHandler = () => {
    const trianglePosition = leadingTriangle.getPosition();
    const resultVector: Vector2D = {
      x: trianglePosition.x - mouse.x,
      y: trianglePosition.y - mouse.y,
    };
    const isOutsideEffectiveRange = Math.sqrt(Math.pow(resultVector.y, 2) + Math.pow(resultVector.x, 2)) > MOUSE_RADIUS;

    const spawnSpeed = isOutsideEffectiveRange ? MOUSE_MOVING_SPAWN_TRIANGLES_INTERVAL : MOUSE_STOP_SPAWN_TRIANGLES_INTERVAL;
    if (spawnSpeed === lastSpeed) {
      return;
    } else {
      clearInterval(spawnTrianglesId);
      lastSpeed = spawnSpeed;
      spawnTrianglesId = setInterval(spawnTriangle, spawnSpeed);
    }
  };

  useEffect(() => {
    canvas = canvasRef.current!
    ctx = canvas.getContext('2d')!;

    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight - 100;

    mouse.x = canvas.width / 2;
    mouse.y = canvas.height / 2;

    leadingTriangle.setPosition({ ...mouse })
    triangles.current.push(leadingTriangle);
    spawnTrianglesId = setInterval(spawnTriangle, MOUSE_STOP_SPAWN_TRIANGLES_INTERVAL);

    let animationId: number;
    const animate = () => {
      startSpawnTrianglesHandler();

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      Triangle.ANGLE += Triangle.ROTATE_SPEED;
      Triangle.HUE += Triangle.HUE_CHANGE_RATE;

      triangles.current.forEach((triangle, index) => {
        triangle.update();
        triangle.render();

        if (triangle.shouldRemove()) {
          triangles.current = triangles.current.filter((_, idx) => index !== idx);
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    const handleUpdateMousePosition = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      mouse.x = e.clientX - (rect?.x || 0);
      mouse.y = e.clientY - (rect?.y || 0);
    };

    document.addEventListener('mousemove', handleUpdateMousePosition);
    return () => document.removeEventListener('mousemove', handleUpdateMousePosition);
  }, []);

  useEffect(() => {
  }, []);

  return (
    <canvas ref={canvasRef} className="border-black border-2 border-solid" />
  )
}

export default CanvasBasicAnimation;
