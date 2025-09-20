import React from 'react';
import { Box } from '@chakra-ui/react';
import Game from '../components/game/Game';

const Test = () => {
  return (
    <Box width="100%" height="calc(100vh - 160px)" p={0}>
      <Game />
    </Box>
  );
};

export default Test;
