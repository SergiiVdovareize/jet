import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const GameHistory = ({ gameHistory }) => {
  if (gameHistory.length === 0) return null;
  
  return (
    <Box mt={8}>
      <Heading as="h3" size="md" mb={4}>Результати:</Heading>
      <Box maxH="200px" overflowY="auto">
        <i>*будуть доступні в майбутніх версіях гри</i>
        {/* {gameHistory.slice(-10).reverse().map((action, index) => (
          <Box key={index} p={2} bg={action.correct ? 'green.50' : 'red.50'} mb={1} borderRadius="md">
            <Text fontSize="sm">
              {action.correct ? '✓' : '✗'} Target: {action.target.color} {action.target.type} | 
              Clicked: {action.clicked.color} {action.clicked.type}
            </Text>
          </Box>
        ))} */}
      </Box>
    </Box>
  );
};

export default GameHistory;
