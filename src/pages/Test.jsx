import React from 'react';
import { Box } from '@chakra-ui/react';
import Game from '../components/games/shapes/Game';

const Test = () => {
  return (
    <Box width="100%" p={0} flex="1">
      <Game />
    </Box>
  );
};

export default Test;
