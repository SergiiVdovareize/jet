import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

const GameHeader = ({ gameState, onStartGame }) => {
  const { gameActive, targetShape, score, timeLeft, difficulty } = gameState;
  
  return (
    <Box textAlign="center" mb={6}>
      {/* <Heading as="h1" size="xl" mb={4} color="gray.800">
        Shape Matching Game
      </Heading> */}
      
      {gameActive ? (
        <Box>
          <Text fontSize="lg" mb={2}>
            Find: <strong>{targetShape.color} {targetShape.type}</strong>
          </Text>
          <Text fontSize="md" color="blue.600">
            Score: {score} | Time: {timeLeft}s | Difficulty: {difficulty.toFixed(1)}
          </Text>
        </Box>
      ) : (
        <Box>
          {/* <Text fontSize="lg" mb={4}>
            {score > 0 ? `Game Over! Final Score: ${score}` : 'Click Start to begin!'}
          </Text> */}
          <Button colorScheme="blue" onClick={onStartGame} size="lg">
            {score > 0 ? 'Play Again' : 'Start Game'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default GameHeader;
