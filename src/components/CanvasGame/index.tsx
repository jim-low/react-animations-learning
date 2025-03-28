import { useEffect, useRef } from "react"
import Money from "./classes/Money";
import AntOverTime from "./classes/AntOverTime";
import ProjectProjectile from "./classes/ProjectProjectile";
import { getRandomNumber, getRandomPosition } from "./utils";
import { Boundary, Object2D, Vector2D } from "./types/common";
import Snek from "./classes/Snek";
import Score from "./classes/Score";
import FloatingText from "./classes/FloatingText";

export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D;

// global mouse position
export let mouse: Vector2D = { x: 0, y: 0, };

const CanvasGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const moneyCollected = useRef<number>(0);
  const hoursOvertime = useRef<number>(0);
  const projectsCollected = useRef<number>(0);

  // settings
  const MONEY_SCORE = 1;
  const OVERTIME_SCORE = 4;
  const PROJECTS_SCORE = 1;
  const SHOOT_PROJECTILE_INTERVAL = 2000;

  const END_GAME_SCORE = {
    WIN_MONEY: MONEY_SCORE * 20,
    LOSE_OVERTIME: OVERTIME_SCORE * 5,
    LOSE_OVERWORK: PROJECTS_SCORE * 5,
  };

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
  const floatingTexts = useRef<FloatingText[]>([]);

  const moneyScoreParams = {
    position: {
      x: 10,
      y: 30,
    },
    text: 'Salary Collected',
  };
  const moneyScore = useRef<Score>(new Score(moneyScoreParams));

  const overtimeScoreParams = {
    position: {
      x: 10,
      y: 60,
    },
    text: 'Hours Overtime',
  };
  const overtimeScore = useRef<Score>(new Score(overtimeScoreParams));

  const accidentProjectsScoreParams = {
    position: {
      x: 10,
      y: 90,
    },
    text: 'Projects Collected',
  };
  const accidentProjectsScore = useRef<Score>(new Score(accidentProjectsScoreParams));

  const hasCollided = (collisionObject: Object2D, collisionTarget: Object2D): boolean => {
    const isLeftCollided = collisionObject.x + collisionObject.width > collisionTarget.x;
    const isRightCollided = collisionObject.x < collisionTarget.x + collisionTarget.width;
    const isTopCollided = collisionObject.y + collisionObject.height > collisionTarget.y;
    const isBottomCollided = collisionObject.y < collisionTarget.y + collisionTarget.height;

    return isTopCollided && isRightCollided && isBottomCollided && isLeftCollided;
  }

  const resetPositions = () => {
    overtimeButNoPay();
    chaChing();
  };

  const collectProject = (project: ProjectProjectile) => {
    projectsCollected.current += PROJECTS_SCORE;
    accidentProjectsScore.current.setScore(projectsCollected.current);

    floatingTexts.current.push(new FloatingText({
      position: project.getPosition()!,
      type: 'PROJECT',
    }));
  };

 const collectMoney = () => {
    moneyCollected.current += MONEY_SCORE;
    moneyScore.current.setScore(moneyCollected.current);

    floatingTexts.current.push(new FloatingText({
      position: money.current?.getPosition()!,
      type: 'MONEY',
    }));
  };

  const kenaOT = () => {
    hoursOvertime.current += OVERTIME_SCORE;
    overtimeScore.current.setScore(hoursOvertime.current);

    floatingTexts.current.push(new FloatingText({
      position: antOvertime.current?.getPosition()!,
      type: 'OVERTIME',
    }));
  };

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
      target: snek.current ? snek.current.getPosition() : { x: 0, y: 0 }
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

  const removeProjectile = (index: number) => {
    projectiles.current = projectiles.current.filter((_, idx) => index !== idx);
  };

  const winGame = () => {
    ctx.fillStyle = '#90EE90';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '32px sans-serif';
    ctx.fillStyle = 'black';
    ctx.fillText('You have collected enough money!', canvas.width / 4, canvas.height / 2);
    ctx.fillText('See you again next month!', canvas.width / 4, canvas.height / 2 + 50);
  };

  const loseGame = (type: 'OVERTIME' | 'OVERWORK') => {
    ctx.fillStyle = '#FFCCCC';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '32px sans-serif';
    ctx.fillStyle = 'black';

    if (type === 'OVERTIME') {
      ctx.fillText('You have spent 80 hours this week!', canvas.width / 4, canvas.height / 2);
      ctx.fillText('Please be mindful of your health!', canvas.width / 4, canvas.height / 2 + 50);
    } else {
      ctx.fillText('You have taken on too much responsibility!', canvas.width / 4, canvas.height / 2);
      ctx.fillText('Please work within your pay grade!', canvas.width / 4, canvas.height / 2 + 50);
    }
  };

  useEffect(() => {
    canvas = canvasRef.current!;
    ctx = canvas.getContext('2d')!;

    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight - 100;

    // set variables when canvas and context is mounted
    pickupBoundary = {
      min: { x: pickupBoundaryMargin, y: pickupBoundaryMargin * 2 },
      max: { x: canvas.width - pickupBoundaryMargin, y: canvas.height - pickupBoundaryMargin },
    };

    mouse = {
      x: canvas.width / 2,
      y: canvas.height / 2,
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

      // score rendering
      moneyScore.current?.render();
      overtimeScore.current?.render();
      accidentProjectsScore.current.render();

      // game objects update and rendering
      money.current?.update();
      money.current?.render();

      antOvertime.current?.update();
      antOvertime.current?.render();

      snek.current?.update();
      snek.current?.render();

      if (hasCollided(money.current?.getMeasurement()!, snek.current?.getMeasurement()!)) {
        collectMoney();
        resetPositions();
      }

      if (hasCollided(antOvertime.current?.getMeasurement()!, snek.current?.getMeasurement()!)) {
        kenaOT();
        resetPositions();
      }

      projectiles.current.forEach((item, index) => {
        item.update();
        item.render();

        if (hasCollided(item.getMeasurement()!, snek.current?.getMeasurement()!)) {
          collectProject(item);
          resetPositions();

          // remove projectile from existence
          removeProjectile(index);
        }

        if (item.isLifetimeFinished()) {
          // remove projectile from existence
          removeProjectile(index);
        }
      });

      floatingTexts.current.forEach((text, index) => {
        text.update();
        text.render();

        if (text.shouldRemove()) {
          floatingTexts.current.filter((_, idx) => index !== idx);
        }
      });

      const enoughMoney = moneyCollected.current === END_GAME_SCORE.WIN_MONEY;
      const tooMuchOvertime = hoursOvertime.current === END_GAME_SCORE.LOSE_OVERTIME;
      const overWorked = projectsCollected.current === END_GAME_SCORE.LOSE_OVERWORK;
      const isGameEnded = enoughMoney || tooMuchOvertime || overWorked;
      if (!isGameEnded) {
        animationId = requestAnimationFrame(gameLoop);
      }

      if (enoughMoney) {
        winGame();
      } else if (tooMuchOvertime) {
        loseGame('OVERTIME');
      } else if (overWorked) {
        loseGame('OVERWORK');
      }
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
