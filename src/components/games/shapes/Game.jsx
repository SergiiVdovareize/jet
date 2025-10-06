import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import styles from './Shapes.module.css';
import { generateGameState, generateNewRound } from '../../../utils/shapeUtils';
import { playMiss as playMissSfx, playSuccess as playSuccessSfx, playStart as playStartSfx, close as closeSfx, playFinish as playFinishSfx } from '../../../utils/sound';
import GameHeader from './GameHeader';
import GameBoard from './GameBoard';
import GameHistory from './GameHistory';

const Game = () => {
  const [gameState, setGameState] = useState({
    shapes: [],
    targetShape: null,
    score: 0,
    timeLeft: 0,
    gameActive: false,
    difficulty: 1
  });
  
  const [gameHistory, setGameHistory] = useState([]);
  const [timer, setTimer] = useState(null);
  const [boardConfig, setBoardConfig] = useState({});
  const [missClicked, setMissClicked] = useState(false);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
      closeSfx();
    };
  }, [timer]);

  useEffect(() => {
    if (boardConfig.width && boardConfig.height) {
      startGame()
    }
  }, [boardConfig])

  useEffect(() => {
    if (gameState.gameActive) {
      setTimeout(playStartSfx, 50)
    } else {
      setTimeout(playFinishSfx, 50)
    }
  }, [gameState.gameActive])
  
  // Start game
  const activateGame = () => {
      const newGameState = {
        ...gameState,
        gameActive: true
      }
      
      setGameState(newGameState)
  }

  const startGame = () => {
    const newGameState = generateGameState(boardConfig);
    setGameState(newGameState);
    setGameHistory([]);
    
    // Start timer
    const newTimer = setInterval(() => {
      setGameState(prev => {
        if (prev.timeLeft <= 1) {
          clearInterval(newTimer);
          setBoardConfig({})
          return { ...prev, gameActive: false, shapes: [] };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
    
    setTimer(newTimer);
  };

  const handleBoardInitialization = (config) => {
    if (!!config.width && !!config.height && !gameState.shapes?.length) {
      setBoardConfig(config)
    }
  }
  
  // Handle shape click
  const handleShapeClick = (clickedShape) => {
    if (!gameState.gameActive) return;
    
    const isCorrect = clickedShape.type === gameState.targetShape.type && 
                     clickedShape.color === gameState.targetShape.color;
    
    if (isCorrect) {
      playSuccessSfx();
      // Correct answer - generate new round with non-overlapping shapes
      const { shapes: newShapes, targetShape: newTargetShape } = generateNewRound(boardConfig);
      
      setGameState(prev => ({
        ...prev,
        shapes: newShapes,
        targetShape: newTargetShape,
        score: prev.score + 1,
        difficulty: Math.min(prev.difficulty + 0.1, 3) // Increase difficulty gradually
      }));
      
      // Add to history
      setGameHistory(prev => [...prev, { 
        target: gameState.targetShape, 
        clicked: clickedShape, 
        correct: true,
        timestamp: Date.now()
      }]);
    } else {
      playMissSfx();
      setMissClicked(true)
      setTimeout(() => {
        setMissClicked(false)
      }, 600)
      // Wrong answer
      setGameHistory(prev => [...prev, { 
        target: gameState.targetShape, 
        clicked: clickedShape, 
        correct: false,
        timestamp: Date.now()
      }]);
    }
  };

  const activeGameWrapperStyles = gameState.gameActive ? {
    border: '2px solid #8592a7',
    borderRadius: '2px',
  } : {}

  return (
    <Box 
      p={0} 
      height="100%" 
      display="flex" 
      justifyContent='center'
      flexDirection="column"
      minHeight="0"
      {...activeGameWrapperStyles}
      className={styles.gameWrapper}
    >
      <GameHeader gameState={gameState} onStartGame={activateGame} />
      
      {gameState.gameActive && (
        <Box flex="auto" minHeight="0">
          <GameBoard 
            shapes={gameState.shapes}
            targetShape={gameState.targetShape}
            onShapeClick={handleShapeClick}
            onBoardInitialized={handleBoardInitialization}
            missClick={missClicked}
          />
        </Box>
      )}
      
      {!gameState.gameActive && (
        <GameHistory gameHistory={gameHistory} />
      )}
    </Box>
  );
};

export default Game;
