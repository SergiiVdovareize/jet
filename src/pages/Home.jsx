import React from 'react';
import { Box, Heading, Text, Container } from '@chakra-ui/react';

const Home = () => {
  return (
    <Container maxW="container.lg">
      <Box>
        <Heading as="h1" size="xl" mb={4} color="gray.800">
          Home Page
        </Heading>
        <Text fontSize="lg" color="gray.600" lineHeight="tall">
          Welcome to the home page! This is your main landing page with Chakra UI styling.
        </Text>
      </Box>
    </Container>
  );
};

export default Home;
