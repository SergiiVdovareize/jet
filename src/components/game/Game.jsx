import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { generateGameState, generateNewRound } from '../../utils/shapeUtils';
import GameHeader from './GameHeader';
import GameBoard from './GameBoard';
import GameHistory from './GameHistory';

const Game = () => {
  const [gameState, setGameState] = useState({
    shapes: [],
    targetShape: null,
    score: 0,
    timeLeft: 30,
    gameActive: false,
    difficulty: 1
  });
  
  const [gameHistory, setGameHistory] = useState([]);
  const [timer, setTimer] = useState(null);
  
  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);
  
  // Start game
  const startGame = () => {
    const newGameState = generateGameState();
    setGameState(newGameState);
    setGameHistory([]);
    
    // Start timer
    const newTimer = setInterval(() => {
      setGameState(prev => {
        if (prev.timeLeft <= 1) {
          clearInterval(newTimer);
          return { ...prev, gameActive: false };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
    
    setTimer(newTimer);
  };
  
  // Handle shape click
  const handleShapeClick = (clickedShape) => {
    if (!gameState.gameActive) return;
    
    const isCorrect = clickedShape.type === gameState.targetShape.type && 
                     clickedShape.color === gameState.targetShape.color;
    
    if (isCorrect) {
      // Correct answer - generate new round with non-overlapping shapes
      const { shapes: newShapes, targetShape: newTargetShape } = generateNewRound();
      
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
      // Wrong answer
      setGameHistory(prev => [...prev, { 
        target: gameState.targetShape, 
        clicked: clickedShape, 
        correct: false,
        timestamp: Date.now()
      }]);
    }
  };
  
  return (
    <Box 
      p={0} 
      height="100vh" 
      display="flex" 
      flexDirection="column"
      maxHeight="100vh"
    >
      <GameHeader gameState={gameState} onStartGame={startGame} />
      
      {gameState.gameActive && (
        <Box flex="1" minHeight="0">
          <GameBoard 
            shapes={gameState.shapes}
            targetShape={gameState.targetShape}
            onShapeClick={handleShapeClick}
          />
        </Box>
      )}
      
      <GameHistory gameHistory={gameHistory} />
    </Box>
  );
};

export default Game;
