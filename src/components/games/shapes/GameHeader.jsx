import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { getLocalizedShapeName } from '../../../utils/shapeUtils';

const GameHeader = ({ gameState, onStartGame }) => {
  const { gameActive, targetShape, score, timeLeft, difficulty } = gameState;

  const activeHeaderStyles = gameActive ? {
    backgroundColor: '#d1e2f1',
    borderBottom: '2px solid #8592a7'
  } : {}

  return (
    <Box textAlign="center" mb={6} {...activeHeaderStyles} padding={'12px 0'} margin={0}>
      {(gameActive && !!targetShape) ? (
        <Box>
          <Text fontSize="lg" mb={2}>
            Find: <strong>{getLocalizedShapeName(targetShape, 'uk')}</strong>
          </Text>
          <Text fontSize="md" color="blue.600">
            Score: {score} | Time: {timeLeft}s | Difficulty: {difficulty.toFixed(1)}
          </Text>
        </Box>
      ) : (
        <Box>
          <Button colorScheme="blue" onClick={onStartGame} size="lg">
            {score > 0 ? 'Спробувати ще раз' : 'Почати гру'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default GameHeader;
