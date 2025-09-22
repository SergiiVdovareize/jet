import React, { useState, useEffect, useRef } from 'react';
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
    timeLeft: 337,
    gameActive: false,
    difficulty: 1
  });
  
  const [gameHistory, setGameHistory] = useState([]);
  const [timer, setTimer] = useState(null);
  const [boardConfig, setBoardConfig] = useState({});
  const [missClicked, setMissClicked] = useState(false);
  const audioCtxRef = useRef(null);

  const playMissSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(220, ctx.currentTime);
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.2, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      oscillator.start(now);
      oscillator.stop(now + 0.16);
    } catch (_) {
      // Ignore audio errors (e.g., unsupported environment)
    }
  };

  const playSuccessSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = 'sine';
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;
      // simple two-note up chirp
      oscillator.frequency.setValueAtTime(523.25, now); // C5
      oscillator.frequency.exponentialRampToValueAtTime(784.0, now + 0.12); // G5
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      oscillator.start(now);
      oscillator.stop(now + 0.19);
    } catch (_) {
      // ignore
    }
  };
  
  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);

  useEffect(() => {
    if (boardConfig.width && boardConfig.height) {
      startGame()
    }
  }, [boardConfig])
  
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
          return { ...prev, gameActive: false };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
    
    setTimer(newTimer);
  };

  const handleBoardInitialization = (config) => {
    if (!!config.width && !!config.height && !gameState.shapes?.length) {
      console.log('handleBoardInitialization', config)
      setBoardConfig(config)
    }
  }
  
  // Handle shape click
  const handleShapeClick = (clickedShape) => {
    if (!gameState.gameActive) return;
    
    const isCorrect = clickedShape.type === gameState.targetShape.type && 
                     clickedShape.color === gameState.targetShape.color;
    
    if (isCorrect) {
      playSuccessSound();
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
      playMissSound();
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
  
  return (
    <Box 
      p={0} 
      height="100%" 
      display="flex" 
      flexDirection="column"
      minHeight="0"
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
