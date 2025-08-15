import * as React from "react";
import { useState, useCallback } from "react";
import {
  makeStyles,
  tokens,
  Button,
  Text,
  Card,
  CardHeader,
  CardPreview,
  Divider,
  Badge,
} from "@fluentui/react-components";
import { Play24Regular, ArrowClockwise24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    display: "flex",
    gap: tokens.spacingHorizontalXL,
    padding: tokens.spacingVerticalXL,
    maxWidth: "800px",
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
    gridTemplateColumns: "repeat(3, 100px)",
    gridTemplateRows: "repeat(3, 100px)",
    gap: "4px",
    border: `3px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground2,
    boxShadow: tokens.shadow8,
  },
  cell: {
    width: "100px",
    height: "100px",
    borderRadius: tokens.borderRadiusMedium,
    border: `2px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    fontSize: "32px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover:not(:disabled)": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      border: `2px solid ${tokens.colorBrandStroke2}`,
      transform: "scale(1.02)",
    },
    "&:disabled": {
      cursor: "default",
    },
  },
  cellX: {
    color: tokens.colorPaletteBlueForeground2,
    backgroundColor: tokens.colorPaletteBlueBackground2,
    border: `2px solid ${tokens.colorNeutralStroke1}`,
  },
  cellO: {
    color: tokens.colorPaletteRedForeground2,
    backgroundColor: tokens.colorPaletteRedBackground2,
    border: `2px solid ${tokens.colorPaletteRedBorder1}`,
  },
  winningCell: {
    backgroundColor: tokens.colorPaletteGreenBackground2,
    border: `2px solid ${tokens.colorPaletteGreenBorder1}`,
    boxShadow: tokens.shadow16,
  },
  gameStatus: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalS,
    minHeight: "60px",
    justifyContent: "center",
  },
  playerIndicator: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  controls: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
  },
  sidePanel: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    minWidth: "200px",
    maxWidth: "200px",
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
  scoreGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingVerticalS,
    textAlign: "center",
  },
  playerScore: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalXS,
  },
  rulesText: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
});

type Player = "X" | "O";
type CellValue = Player | null;
type Board = CellValue[];

interface GameStats {
  xWins: number;
  oWins: number;
  draws: number;
}

const TicTacToeGame: React.FC = () => {
  const styles = useStyles();
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | "draw" | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [stats, setStats] = useState<GameStats>({
    xWins: 0,
    oWins: 0,
    draws: 0,
  });

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  const checkWinner = useCallback(
    (
      board: Board
    ): { winner: Player | "draw" | null; line: number[] | null } => {
      // Check for winning combinations
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return { winner: board[a] as Player, line: combination };
        }
      }

      // Check for draw
      if (board.every((cell) => cell !== null)) {
        return { winner: "draw", line: null };
      }

      return { winner: null, line: null };
    },
    [winningCombinations]
  );

  const handleCellClick = useCallback(
    (index: number) => {
      if (board[index] || winner || !gameStarted) return;

      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      const { winner: gameWinner, line } = checkWinner(newBoard);

      if (gameWinner) {
        setWinner(gameWinner);
        setWinningLine(line);

        // Update stats
        setStats((prev) => ({
          ...prev,
          xWins: gameWinner === "X" ? prev.xWins + 1 : prev.xWins,
          oWins: gameWinner === "O" ? prev.oWins + 1 : prev.oWins,
          draws: gameWinner === "draw" ? prev.draws + 1 : prev.draws,
        }));
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    },
    [board, currentPlayer, winner, gameStarted, checkWinner]
  );

  const startNewGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setWinningLine(null);
    setGameStarted(true);
  }, []);

  const resetStats = useCallback(() => {
    setStats({ xWins: 0, oWins: 0, draws: 0 });
  }, []);

  const getGameStatusMessage = () => {
    if (!gameStarted) {
      return 'Click "Start Game" to begin!';
    }

    if (winner) {
      if (winner === "draw") {
        return "It's a draw!";
      }
      return `Player ${winner} wins!`;
    }

    return `Player ${currentPlayer}'s turn`;
  };

  const getCurrentPlayerBadge = () => {
    if (!gameStarted || winner) return null;

    return (
      <div className={styles.playerIndicator}>
        <Badge
          appearance={currentPlayer === "X" ? "filled" : "outline"}
          color={currentPlayer === "X" ? "brand" : "danger"}
        >
          {currentPlayer}
        </Badge>
      </div>
    );
  };

  const getCellClassName = (index: number) => {
    let className = styles.cell;

    if (board[index] === "X") {
      className += ` ${styles.cellX}`;
    } else if (board[index] === "O") {
      className += ` ${styles.cellO}`;
    }

    if (winningLine && winningLine.includes(index)) {
      className += ` ${styles.winningCell}`;
    }

    return className;
  };

  return (
    <div className={styles.container}>
      <div className={styles.gameArea}>
        <Text size={800} weight="bold">
          Tic Tac Toe
        </Text>

        <div className={styles.gameStatus}>
          <Text size={500} weight="medium">
            {getGameStatusMessage()}
          </Text>
          {getCurrentPlayerBadge()}
        </div>

        <div className={styles.gameBoard}>
          {board.map((cell, index) => (
            <Button
              key={index}
              className={getCellClassName(index)}
              onClick={() => handleCellClick(index)}
              disabled={!!cell || !!winner || !gameStarted}
              appearance="subtle"
            >
              {cell || ""}
            </Button>
          ))}
        </div>

        <div className={styles.controls}>
          {!gameStarted || winner ? (
            <Button
              appearance="primary"
              icon={<Play24Regular />}
              onClick={startNewGame}
            >
              {!gameStarted ? "Start Game" : "New Game"}
            </Button>
          ) : (
            <Button icon={<ArrowClockwise24Regular />} onClick={startNewGame}>
              Restart
            </Button>
          )}
        </div>
      </div>

      <div className={styles.sidePanel}>
        <Card className={styles.scoreCard}>
          <CardHeader header={<Text weight="semibold">Score</Text>} />
          <CardPreview>
            <div className={styles.cardContent}>
              <div className={styles.scoreGrid}>
                <div className={styles.playerScore}>
                  <Badge appearance="filled" color="brand">
                    X
                  </Badge>
                  <Text size={500} weight="bold">
                    {stats.xWins}
                  </Text>
                  <Text size={200}>wins</Text>
                </div>
                <div className={styles.playerScore}>
                  <Badge appearance="filled" color="danger">
                    O
                  </Badge>
                  <Text size={500} weight="bold">
                    {stats.oWins}
                  </Text>
                  <Text size={200}>wins</Text>
                </div>
              </div>
              <Divider />
              <div style={{ textAlign: "center" }}>
                <Text>Draws: {stats.draws}</Text>
              </div>
            </div>
          </CardPreview>
        </Card>

        <Card className={styles.scoreCard}>
          <CardHeader header={<Text weight="semibold">Controls</Text>} />
          <CardPreview>
            <div className={styles.cardContent}>
              <Button
                icon={<ArrowClockwise24Regular />}
                onClick={resetStats}
                appearance="subtle"
                size="small"
              >
                Reset Stats
              </Button>
            </div>
          </CardPreview>
        </Card>

        <Card className={styles.scoreCard}>
          <CardHeader header={<Text weight="semibold">How to Play</Text>} />
          <CardPreview>
            <div className={styles.cardContent}>
              <Text className={styles.rulesText}>
                • Players take turns placing X and O
              </Text>
              <Text className={styles.rulesText}>• Get 3 in a row to win</Text>
              <Text className={styles.rulesText}>
                • Row, column, or diagonal
              </Text>
              <Text className={styles.rulesText}>
                • Click any empty cell to play
              </Text>
            </div>
          </CardPreview>
        </Card>
      </div>
    </div>
  );
};

export default TicTacToeGame;
