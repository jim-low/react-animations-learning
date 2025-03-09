import { useEffect, useRef } from "react"
import Money from "./classes/Money";
import AntOverTime from "./classes/AntOverTime";
import ProjectProjectile from "./classes/ProjectProjectile";
import { getRandomNumber, getRandomPosition } from "./utils";
import { Boundary, Vector2D } from "./types/common";
import Snek from "./classes/Snek";

export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D;

// global mouse position
export const mouse: Vector2D = { x: 0, y: 0, };

const CanvasGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // settings
  const SHOOT_PROJECTILE_INTERVAL = 2000;
  const pickupBoundaryMargin = 50;
  const projectileBoundaryMargin = 150;
  let pickupBoundary: Boundary = {
    min: { x: 0, y: 0 },
    max: { x: 0, y: 0 }
  };

  // game objects
  const money = useRef<Money>();
  const antOvertime = useRef<AntOverTime>();
  const projectiles = useRef<ProjectProjectile[]>([]);
  const snek = useRef<Snek>();

  const shootProject = () => {
    const _project = new ProjectProjectile({
      position: getRandomPosition({
        min: {
          x: Math.random() > 0.5 ? -projectileBoundaryMargin : canvas.width + projectileBoundaryMargin,
          y: Math.random() > 0.5 ? -projectileBoundaryMargin : canvas.height + projectileBoundaryMargin,
        },
        max: {
          x: Math.random() > 0.5 ? -projectileBoundaryMargin * 2 : canvas.width + (projectileBoundaryMargin * 2),
          y: Math.random() > 0.5 ? -projectileBoundaryMargin * 2 : canvas.height + (projectileBoundaryMargin * 2),
        },
      }),
      speed: getRandomNumber(5, 15),
      target: money.current ? money.current.getPosition() : { x: 0, y: 0 }
    });
    projectiles.current.push(_project);
  }

  const overtimeButNoPay = () => {
    const _overtime = new AntOverTime({ position: getRandomPosition(pickupBoundary) });
    antOvertime.current = _overtime;
  }

  const chaChing = () => {
    const _money = new Money({ position: getRandomPosition(pickupBoundary) });
    money.current = _money;
  }

  const spawnSnek = () => {
    const _snek = new Snek();
    snek.current = _snek;
  }

  useEffect(() => {
    canvas = canvasRef.current!;
    ctx = canvas.getContext('2d')!;

    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight - 100;

    // set variables when canvas and context is mounted
    pickupBoundary = {
      min: { x: pickupBoundaryMargin, y: pickupBoundaryMargin },
      max: { x: canvas.width - pickupBoundaryMargin, y: canvas.height - pickupBoundaryMargin },
    };

    const intervalId = setInterval(shootProject, SHOOT_PROJECTILE_INTERVAL);

    let animationId: number;
    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!money.current) {
        chaChing();
      }

      if (!antOvertime.current) {
        overtimeButNoPay();
      }

      if (!snek.current) {
        spawnSnek();
      }

      money.current?.update();
      money.current?.render();

      antOvertime.current?.update();
      antOvertime.current?.render();

      snek.current?.update();
      snek.current?.render();

      projectiles.current.forEach((item, index) => {
        item.update();
        item.render();

        if (item.isLifetimeFinished()) {
          projectiles.current = projectiles.current.filter((_, idx) => index !== idx);
        }
      })

      animationId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(intervalId);
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

  return (
    <canvas ref={canvasRef} className="border-black border-2 border-solid" />
  );
}

export default CanvasGame;
