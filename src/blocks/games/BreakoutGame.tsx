import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  makeStyles,
  tokens,
  Button,
  Text,
  Card,
  CardHeader,
  CardPreview,
  Divider,
  ToggleButton,
  ProgressBar,
} from "@fluentui/react-components";
import {
  Play24Regular,
  Pause24Regular,
  Stop24Regular,
  ArrowClockwise24Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    display: "flex",
    gap: tokens.spacingHorizontalXL,
    padding: tokens.spacingVerticalXL,
    maxWidth: "1000px",
    margin: "0 auto",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  gameArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalL,
  },
  canvasContainer: {
    border: `3px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
    boxShadow: tokens.shadow8,
    padding: tokens.spacingVerticalS,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  gameCanvas: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusSmall,
    display: "block",
  },
  controls: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    alignItems: "center",
  },
  gameStatus: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalS,
    minHeight: "60px",
    justifyContent: "center",
  },
  sidePanel: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    minWidth: "220px",
    maxWidth: "220px",
    marginTop: "76px",
  },
  scoreCard: {
    width: "100%",
  },
  cardContent: {
    padding: tokens.spacingVerticalM,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  scoreDisplay: {
    textAlign: "center",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingVerticalXS,
    textAlign: "center",
  },
  progressContainer: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  controlsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  instructionsText: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
});

interface Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
}

interface Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Brick {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
  color: string;
  points: number;
}

interface GameStats {
  score: number;
  level: number;
  lives: number;
  bricksRemaining: number;
  totalBricks: number;
}

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 100;
const BALL_RADIUS = 8;
const BRICK_ROWS = 5;
const BRICK_COLS = 10;
const BRICK_WIDTH = 56;
const BRICK_HEIGHT = 20;
const BRICK_PADDING = 2;

const BreakoutGame: React.FC = () => {
  const styles = useStyles();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const gameStateRef = useRef<{
    ball: Ball;
    paddle: Paddle;
    bricks: Brick[];
    keys: { [key: string]: boolean };
  }>();

  const [gameRunning, setGameRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    level: 1,
    lives: 3,
    bricksRemaining: 0,
    totalBricks: 0,
  });

  const initializeGame = useCallback(() => {
    const bricks: Brick[] = [];
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"];
    const points = [50, 40, 30, 20, 10];

    // Calculate centered starting position for bricks
    const totalBrickWidth =
      BRICK_COLS * BRICK_WIDTH + (BRICK_COLS - 1) * BRICK_PADDING;
    const startX = (CANVAS_WIDTH - totalBrickWidth) / 2;

    for (let row = 0; row < BRICK_ROWS; row++) {
      for (let col = 0; col < BRICK_COLS; col++) {
        bricks.push({
          x: startX + col * (BRICK_WIDTH + BRICK_PADDING),
          y: row * (BRICK_HEIGHT + BRICK_PADDING) + 50,
          width: BRICK_WIDTH,
          height: BRICK_HEIGHT,
          visible: true,
          color: colors[row],
          points: points[row],
        });
      }
    }

    gameStateRef.current = {
      ball: {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT - 100,
        dx: 3 + stats.level * 0.5,
        dy: -3 - stats.level * 0.5,
        radius: BALL_RADIUS,
      },
      paddle: {
        x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2,
        y: CANVAS_HEIGHT - 30,
        width: PADDLE_WIDTH,
        height: PADDLE_HEIGHT,
      },
      bricks,
      keys: {},
    };

    setStats((prev) => ({
      ...prev,
      bricksRemaining: bricks.length,
      totalBricks: bricks.length,
    }));
  }, [stats.level]);

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !gameStateRef.current) return;

    const { ball, paddle, bricks } = gameStateRef.current;

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#4F46E5";
    ctx.fill();
    ctx.closePath();

    // Draw paddle
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = "#059669";
    ctx.fill();
    ctx.closePath();

    // Draw bricks
    bricks.forEach((brick) => {
      if (brick.visible) {
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brick.width, brick.height);
        ctx.fillStyle = brick.color;
        ctx.fill();
        ctx.strokeStyle = tokens.colorNeutralForegroundOnBrand;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
      }
    });
  }, []);

  const updateGame = useCallback(() => {
    if (!gameStateRef.current) return;

    const { ball, paddle, bricks, keys } = gameStateRef.current;

    // Move paddle
    if (keys["ArrowLeft"] && paddle.x > 0) {
      paddle.x -= 7;
    }
    if (keys["ArrowRight"] && paddle.x < CANVAS_WIDTH - paddle.width) {
      paddle.x += 7;
    }

    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with walls
    if (ball.x + ball.radius > CANVAS_WIDTH || ball.x - ball.radius < 0) {
      ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0) {
      ball.dy = -ball.dy;
    }

    // Ball collision with paddle
    if (
      ball.y + ball.radius > paddle.y &&
      ball.x > paddle.x &&
      ball.x < paddle.x + paddle.width &&
      ball.dy > 0
    ) {
      // Calculate ball angle based on where it hits the paddle
      const hitPos = (ball.x - paddle.x) / paddle.width;
      const angle = ((hitPos - 0.5) * Math.PI) / 3; // Max 60 degree angle
      const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
      ball.dx = Math.sin(angle) * speed;
      ball.dy = -Math.cos(angle) * speed;
    }

    // Ball collision with bricks
    bricks.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x + ball.radius > brick.x &&
          ball.x - ball.radius < brick.x + brick.width &&
          ball.y + ball.radius > brick.y &&
          ball.y - ball.radius < brick.y + brick.height
        ) {
          ball.dy = -ball.dy;
          brick.visible = false;
          setStats((prev) => ({
            ...prev,
            score: prev.score + brick.points,
            bricksRemaining: prev.bricksRemaining - 1,
          }));
        }
      }
    });

    // Check for game over (ball falls below paddle)
    if (ball.y + ball.radius > CANVAS_HEIGHT) {
      setStats((prev) => {
        const newLives = prev.lives - 1;
        if (newLives <= 0) {
          setGameOver(true);
          setGameRunning(false);
        } else {
          // Reset ball position
          ball.x = CANVAS_WIDTH / 2;
          ball.y = CANVAS_HEIGHT - 100;
          ball.dx = 3 + prev.level * 0.5;
          ball.dy = -3 - prev.level * 0.5;
        }
        return { ...prev, lives: newLives };
      });
    }

    // Check for level complete
    const visibleBricks = bricks.filter((brick) => brick.visible);
    if (visibleBricks.length === 0) {
      setStats((prev) => ({ ...prev, level: prev.level + 1 }));
      initializeGame();
    }
  }, [initializeGame]);

  const gameLoop = useCallback(() => {
    if (gameRunning && !isPaused && !gameOver) {
      updateGame();
      drawGame();
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }
  }, [gameRunning, isPaused, gameOver, updateGame, drawGame]);

  const startGame = useCallback(() => {
    setGameRunning(true);
    setGameOver(false);
    setGameWon(false);
    setIsPaused(false);
    if (gameOver) {
      setStats({
        score: 0,
        level: 1,
        lives: 3,
        bricksRemaining: 0,
        totalBricks: 0,
      });
    }
    initializeGame();
  }, [gameOver, initializeGame]);

  const pauseGame = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const stopGame = useCallback(() => {
    setGameRunning(false);
    setIsPaused(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  const resetGame = useCallback(() => {
    stopGame();
    setGameOver(false);
    setGameWon(false);
    setStats({
      score: 0,
      level: 1,
      lives: 3,
      bricksRemaining: 0,
      totalBricks: 0,
    });
    initializeGame();
  }, [stopGame, initializeGame]);

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStateRef.current) {
        gameStateRef.current.keys[e.key] = true;
      }
      if (e.key === " ") {
        e.preventDefault();
        if (gameRunning) {
          pauseGame();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (gameStateRef.current) {
        gameStateRef.current.keys[e.key] = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameRunning, pauseGame]);

  // Game loop effect
  useEffect(() => {
    if (gameRunning && !isPaused && !gameOver) {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameLoop]);

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
    drawGame();
  }, [initializeGame, drawGame]);

  const getGameStatusMessage = () => {
    if (gameOver) {
      return `Game Over! Final Score: ${stats.score}`;
    }
    if (gameWon) {
      return `Congratulations! You won!`;
    }
    if (!gameRunning) {
      return 'Click "Start Game" to begin!';
    }
    if (isPaused) {
      return "Game Paused";
    }
    return `Level ${stats.level} - Lives: ${stats.lives}`;
  };

  const getBricksProgress = () => {
    if (stats.totalBricks === 0) return 0;
    return (
      ((stats.totalBricks - stats.bricksRemaining) / stats.totalBricks) * 100
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.gameArea}>
        <Text size={800} weight="bold">
          Breakout
        </Text>

        <div className={styles.gameStatus}>
          <Text size={500} weight="medium">
            {getGameStatusMessage()}
          </Text>
        </div>

        <div className={styles.canvasContainer}>
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className={styles.gameCanvas}
          />
        </div>

        <div className={styles.controls}>
          {!gameRunning ? (
            <Button
              appearance="primary"
              icon={<Play24Regular />}
              onClick={startGame}
            >
              {gameOver ? "New Game" : "Start Game"}
            </Button>
          ) : (
            <>
              <ToggleButton
                checked={isPaused}
                icon={isPaused ? <Play24Regular /> : <Pause24Regular />}
                onClick={pauseGame}
              >
                {isPaused ? "Resume" : "Pause"}
              </ToggleButton>
              <Button icon={<Stop24Regular />} onClick={stopGame}>
                Stop
              </Button>
            </>
          )}
          <Button icon={<ArrowClockwise24Regular />} onClick={resetGame}>
            Reset
          </Button>
        </div>
      </div>

      <div className={styles.sidePanel}>
        <Card className={styles.scoreCard}>
          <CardHeader header={<Text weight="semibold">Score</Text>} />
          <CardPreview>
            <div className={styles.cardContent}>
              <div className={styles.scoreDisplay}>
                <Text size={600} weight="bold">
                  {stats.score}
                </Text>
              </div>
              <Divider />
              <div className={styles.statsGrid}>
                <Text>Level: {stats.level}</Text>
                <Text>Lives: {stats.lives}</Text>
              </div>
            </div>
          </CardPreview>
        </Card>

        <Card className={styles.scoreCard}>
          <CardHeader header={<Text weight="semibold">Progress</Text>} />
          <CardPreview>
            <div className={styles.cardContent}>
              <div className={styles.progressContainer}>
                <Text size={300}>Bricks Destroyed</Text>
                <ProgressBar value={getBricksProgress()} max={100} />
                <Text size={200}>
                  {stats.totalBricks - stats.bricksRemaining} /{" "}
                  {stats.totalBricks}
                </Text>
              </div>
            </div>
          </CardPreview>
        </Card>

        <Card className={styles.scoreCard}>
          <CardHeader header={<Text weight="semibold">Controls</Text>} />
          <CardPreview>
            <div className={styles.cardContent}>
              <div className={styles.controlsGrid}>
                <Text className={styles.instructionsText}>
                  ← / →: Move paddle
                </Text>
                <Text className={styles.instructionsText}>
                  Space: Pause/Resume
                </Text>
                <Text className={styles.instructionsText}>
                  Hit all bricks to advance!
                </Text>
              </div>
            </div>
          </CardPreview>
        </Card>
      </div>
    </div>
  );
};

export default BreakoutGame;
