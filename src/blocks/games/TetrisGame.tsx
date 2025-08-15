import * as React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  makeStyles,
  tokens,
  Button,
  Text,
  MessageBar,
  Card,
  CardHeader,
  CardPreview,
  ToggleButton,
  Divider,
} from "@fluentui/react-components";
import {
  Play24Regular,
  Pause24Regular,
  ArrowLeft24Regular,
  ArrowRight24Regular,
  ArrowDown24Regular,
  ArrowCounterclockwise24Regular,
  Stop24Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    display: "flex",
    gap: tokens.spacingHorizontalXL,
    padding: tokens.spacingVerticalXL,
    maxWidth: "1200px",
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
  gameBoard: {
    display: "grid",
    gridTemplateColumns: "repeat(10, 32px)",
    gridTemplateRows: "repeat(20, 32px)",
    gap: "2px",
    border: `3px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground2,
    boxShadow: tokens.shadow8,
  },
  cell: {
    width: "32px",
    height: "32px",
    borderRadius: tokens.borderRadiusSmall,
    border: `1px solid ${tokens.colorNeutralStroke3}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  filledCell: {
    backgroundColor: tokens.colorBrandBackground,
    border: `1px solid ${tokens.colorBrandStroke1}`,
    boxShadow: tokens.shadow2,
  },
  activePiece: {
    backgroundColor: tokens.colorPaletteYellowBackground2,
    border: `1px solid ${tokens.colorPaletteYellowBorder2}`,
    boxShadow: tokens.shadow4,
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    alignItems: "center",
  },
  buttonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 48px)",
    gridTemplateRows: "repeat(2, 48px)",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
  },
  rotateButton: {
    gridColumn: "2",
    gridRow: "1",
  },
  leftButton: {
    gridColumn: "1",
    gridRow: "2",
  },
  downButton: {
    gridColumn: "2",
    gridRow: "2",
  },
  rightButton: {
    gridColumn: "3",
    gridRow: "2",
  },
  gameControls: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
  },
  sidePanel: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    minWidth: "220px",
    maxWidth: "220px",
    marginTop: "76px", // Align with game board (title + gap + message space)
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
  scoreStats: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  nextPieceContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100px",
    padding: tokens.spacingVerticalM,
  },
  nextPieceArea: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 24px)",
    gridTemplateRows: "repeat(4, 24px)",
    gap: "2px",
  },
  miniCell: {
    width: "24px",
    height: "24px",
    borderRadius: tokens.borderRadiusSmall,
    border: `1px solid ${tokens.colorNeutralStroke3}`,
    backgroundColor: "transparent",
  },
  miniFilledCell: {
    backgroundColor: tokens.colorBrandBackground,
    border: `1px solid ${tokens.colorBrandStroke1}`,
    boxShadow: tokens.shadow2,
  },
  controlsList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
});

// Tetris piece shapes
const PIECES = [
  {
    shape: [[1, 1, 1, 1]],
    color: "cyan",
  },
  {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "yellow",
  },
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "purple",
  },
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "green",
  },
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "red",
  },
  {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: "orange",
  },
  {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "blue",
  },
];

interface Position {
  x: number;
  y: number;
}

interface Piece {
  shape: number[][];
  position: Position;
  color: string;
}

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const TetrisGame: React.FC = () => {
  const styles = useStyles();
  const [board, setBoard] = useState<number[][]>(() =>
    Array(BOARD_HEIGHT)
      .fill(null)
      .map(() => Array(BOARD_WIDTH).fill(0))
  );
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [nextPiece, setNextPiece] = useState<Piece | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const createRandomPiece = useCallback((): Piece => {
    const pieceTemplate = PIECES[Math.floor(Math.random() * PIECES.length)];
    return {
      shape: pieceTemplate.shape,
      position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
      color: pieceTemplate.color,
    };
  }, []);

  const isValidMove = useCallback(
    (piece: Piece, newPosition: Position, newShape?: number[][]): boolean => {
      const shape = newShape || piece.shape;

      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x]) {
            const newX = newPosition.x + x;
            const newY = newPosition.y + y;

            if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
              return false;
            }

            if (newY >= 0 && board[newY][newX]) {
              return false;
            }
          }
        }
      }
      return true;
    },
    [board]
  );

  const rotatePiece = useCallback((piece: Piece): number[][] => {
    const rotated = piece.shape[0].map((_, index) =>
      piece.shape.map((row) => row[index]).reverse()
    );
    return rotated;
  }, []);

  const clearLines = useCallback(
    (newBoard: number[][]): { board: number[][]; linesCleared: number } => {
      let linesCleared = 0;
      const clearedBoard = newBoard.filter((row) => {
        const isFull = row.every((cell) => cell === 1);
        if (isFull) linesCleared++;
        return !isFull;
      });

      while (clearedBoard.length < BOARD_HEIGHT) {
        clearedBoard.unshift(Array(BOARD_WIDTH).fill(0));
      }

      return { board: clearedBoard, linesCleared };
    },
    []
  );

  const placePiece = useCallback(
    (piece: Piece): void => {
      setBoard((prevBoard) => {
        const newBoard = prevBoard.map((row) => [...row]);

        piece.shape.forEach((row, y) => {
          row.forEach((cell, x) => {
            if (cell) {
              const boardY = piece.position.y + y;
              const boardX = piece.position.x + x;
              if (
                boardY >= 0 &&
                boardY < BOARD_HEIGHT &&
                boardX >= 0 &&
                boardX < BOARD_WIDTH
              ) {
                newBoard[boardY][boardX] = 1;
              }
            }
          });
        });

        const { board: clearedBoard, linesCleared } = clearLines(newBoard);

        if (linesCleared > 0) {
          setLines((prev) => prev + linesCleared);
          setScore((prev) => prev + linesCleared * 100 * level);
          setLevel(Math.floor((lines + linesCleared) / 10) + 1);
        }

        return clearedBoard;
      });
    },
    [clearLines, level, lines]
  );

  const movePiece = useCallback(
    (direction: "left" | "right" | "down"): void => {
      if (!currentPiece || isPaused || gameOver) return;

      let newPosition = { ...currentPiece.position };

      switch (direction) {
        case "left":
          newPosition.x -= 1;
          break;
        case "right":
          newPosition.x += 1;
          break;
        case "down":
          newPosition.y += 1;
          break;
      }

      if (isValidMove(currentPiece, newPosition)) {
        setCurrentPiece((prev) =>
          prev ? { ...prev, position: newPosition } : null
        );
      } else if (direction === "down") {
        placePiece(currentPiece);
        setCurrentPiece(nextPiece);
        setNextPiece(createRandomPiece());
      }
    },
    [
      currentPiece,
      isPaused,
      gameOver,
      isValidMove,
      placePiece,
      nextPiece,
      createRandomPiece,
    ]
  );

  const rotatePieceHandler = useCallback((): void => {
    if (!currentPiece || isPaused || gameOver) return;

    const rotatedShape = rotatePiece(currentPiece);
    if (isValidMove(currentPiece, currentPiece.position, rotatedShape)) {
      setCurrentPiece((prev) =>
        prev ? { ...prev, shape: rotatedShape } : null
      );
    }
  }, [currentPiece, isPaused, gameOver, rotatePiece, isValidMove]);

  const startGame = useCallback((): void => {
    setBoard(
      Array(BOARD_HEIGHT)
        .fill(null)
        .map(() => Array(BOARD_WIDTH).fill(0))
    );
    setCurrentPiece(createRandomPiece());
    setNextPiece(createRandomPiece());
    setScore(0);
    setLevel(1);
    setLines(0);
    setGameRunning(true);
    setGameOver(false);
    setIsPaused(false);
  }, [createRandomPiece]);

  const stopGame = useCallback((): void => {
    setGameRunning(false);
    setGameOver(false);
    setIsPaused(false);
    setCurrentPiece(null);
    setNextPiece(null);
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
  }, []);

  const togglePause = useCallback((): void => {
    setIsPaused((prev) => !prev);
  }, []);

  // Game loop
  useEffect(() => {
    if (gameRunning && !isPaused && !gameOver) {
      gameLoopRef.current = setInterval(() => {
        movePiece("down");
      }, Math.max(100, 1000 - (level - 1) * 100));

      return () => {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
      };
    }
  }, [gameRunning, isPaused, gameOver, level, movePiece]);

  // Check for game over
  useEffect(() => {
    if (currentPiece && !isValidMove(currentPiece, currentPiece.position)) {
      setGameOver(true);
      setGameRunning(false);
    }
  }, [currentPiece, isValidMove]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!gameRunning || isPaused || gameOver) return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          movePiece("left");
          break;
        case "ArrowRight":
          event.preventDefault();
          movePiece("right");
          break;
        case "ArrowDown":
          event.preventDefault();
          movePiece("down");
          break;
        case "ArrowUp":
        case " ":
          event.preventDefault();
          rotatePieceHandler();
          break;
        case "p":
        case "P":
          event.preventDefault();
          togglePause();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [
    gameRunning,
    isPaused,
    gameOver,
    movePiece,
    rotatePieceHandler,
    togglePause,
  ]);

  const renderBoard = () => {
    const displayBoard = board.map((row) => [...row]);

    // Add current piece to display board
    if (currentPiece) {
      currentPiece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            const boardY = currentPiece.position.y + y;
            const boardX = currentPiece.position.x + x;
            if (
              boardY >= 0 &&
              boardY < BOARD_HEIGHT &&
              boardX >= 0 &&
              boardX < BOARD_WIDTH
            ) {
              displayBoard[boardY][boardX] = 2; // 2 represents active piece
            }
          }
        });
      });
    }

    return displayBoard.map((row, y) =>
      row.map((cell, x) => (
        <div
          key={`${y}-${x}`}
          className={`${styles.cell} ${
            cell === 1
              ? styles.filledCell
              : cell === 2
              ? styles.activePiece
              : ""
          }`}
        />
      ))
    );
  };

  const renderNextPiece = () => {
    const grid = Array(4)
      .fill(null)
      .map(() => Array(4).fill(0));

    if (nextPiece) {
      // Calculate centering offset
      const pieceWidth = nextPiece.shape[0].length;
      const pieceHeight = nextPiece.shape.length;
      const offsetX = Math.floor((4 - pieceWidth) / 2);
      const offsetY = Math.floor((4 - pieceHeight) / 2);

      nextPiece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            const gridX = x + offsetX;
            const gridY = y + offsetY;
            if (gridX >= 0 && gridX < 4 && gridY >= 0 && gridY < 4) {
              grid[gridY][gridX] = 1;
            }
          }
        });
      });
    }

    return grid.map((row, y) =>
      row.map((cell, x) => (
        <div
          key={`next-${y}-${x}`}
          className={`${styles.miniCell} ${cell ? styles.miniFilledCell : ""}`}
        />
      ))
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.gameArea}>
        <Text size={800} weight="bold">
          Tetris
        </Text>

        {gameOver && (
          <MessageBar intent="error">
            Game Over! Final Score: {score}
          </MessageBar>
        )}

        {isPaused && gameRunning && (
          <MessageBar intent="warning">Game Paused</MessageBar>
        )}

        <div className={styles.gameBoard}>{renderBoard()}</div>

        <div className={styles.controls}>
          <div className={styles.gameControls}>
            {!gameRunning ? (
              <Button
                appearance="primary"
                icon={<Play24Regular />}
                onClick={startGame}
              >
                Start Game
              </Button>
            ) : (
              <>
                <ToggleButton
                  checked={isPaused}
                  icon={isPaused ? <Play24Regular /> : <Pause24Regular />}
                  onClick={togglePause}
                >
                  {isPaused ? "Resume" : "Pause"}
                </ToggleButton>
                <Button icon={<Stop24Regular />} onClick={stopGame}>
                  Stop
                </Button>
              </>
            )}
          </div>

          <div className={styles.buttonGrid}>
            <Button
              className={styles.rotateButton}
              icon={<ArrowCounterclockwise24Regular />}
              onClick={rotatePieceHandler}
              disabled={!gameRunning || isPaused || gameOver}
              title="Rotate (↑ or Space)"
            />
            <Button
              className={styles.leftButton}
              icon={<ArrowLeft24Regular />}
              onClick={() => movePiece("left")}
              disabled={!gameRunning || isPaused || gameOver}
              title="Move Left (←)"
            />
            <Button
              className={styles.downButton}
              icon={<ArrowDown24Regular />}
              onClick={() => movePiece("down")}
              disabled={!gameRunning || isPaused || gameOver}
              title="Drop (↓)"
            />
            <Button
              className={styles.rightButton}
              icon={<ArrowRight24Regular />}
              onClick={() => movePiece("right")}
              disabled={!gameRunning || isPaused || gameOver}
              title="Move Right (→)"
            />
          </div>
        </div>
      </div>

      <div className={styles.sidePanel}>
        <Card className={styles.scoreCard}>
          <CardHeader header={<Text weight="semibold">Score</Text>} />
          <CardPreview>
            <div className={styles.cardContent}>
              <div className={styles.scoreDisplay}>
                <Text size={600} weight="bold">
                  {score}
                </Text>
              </div>
              <Divider />
              <div className={styles.scoreStats}>
                <Text>Level: {level}</Text>
                <Text>Lines: {lines}</Text>
              </div>
            </div>
          </CardPreview>
        </Card>

        <Card className={styles.scoreCard}>
          <CardHeader header={<Text weight="semibold">Next Piece</Text>} />
          <CardPreview>
            <div className={styles.nextPieceContainer}>
              <div className={styles.nextPieceArea}>{renderNextPiece()}</div>
            </div>
          </CardPreview>
        </Card>

        <Card className={styles.scoreCard}>
          <CardHeader header={<Text weight="semibold">Controls</Text>} />
          <CardPreview>
            <div className={styles.cardContent}>
              <div className={styles.controlsList}>
                <Text size={200}>↑ / Space: Rotate</Text>
                <Text size={200}>← / →: Move</Text>
                <Text size={200}>↓: Drop</Text>
                <Text size={200}>P: Pause</Text>
              </div>
            </div>
          </CardPreview>
        </Card>
      </div>
    </div>
  );
};

export default TetrisGame;
