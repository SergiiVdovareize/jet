import React from 'react';
import { Container } from '@chakra-ui/react';
import Game from '../components/game/Game';

const Test = () => {
  return (
    <Container maxW="container.lg" p={0}>
      <Game />
    </Container>
  );
};

export default Test;
