import React from 'react';
import { Box, Heading, Text, Container } from '@chakra-ui/react';

const Home = () => {
  return (
    <Container maxW="container.lg">
      <Box>
        <Heading as="h1" size="xl" mb={4} color="gray.800">
          This is the Home Page
        </Heading>
        <Text fontSize="lg" color="gray.600" lineHeight="tall">
          Welcome to the home page!
        </Text>
      </Box>
    </Container>
  );
};

export default Home;
