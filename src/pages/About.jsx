import React from 'react';
import { Box, Heading, Text, Container } from '@chakra-ui/react';

const About = () => {
  return (
    <Container maxW="container.lg">
      <Box>
        <Heading as="h1" size="xl" mb={4} color="gray.800">
          About Page
        </Heading>
        <Text fontSize="lg" color="gray.600" lineHeight="tall">
          This is the about page. Learn more about our application and its features.
        </Text>
      </Box>
    </Container>
  );
};

export default About;
