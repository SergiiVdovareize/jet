import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Link, Text } from '@chakra-ui/react';

const Navigation = () => {
  return (
    <Box borderBottom="1px" borderColor="gray.200" py={4} mb={6}>
      <Flex gap={8} align="center">
        <Link as={RouterLink} to="/" color="blue.500" fontWeight="medium" _hover={{ color: "blue.600" }}>
          Home
        </Link>
        <Link as={RouterLink} to="/about" color="blue.500" fontWeight="medium" _hover={{ color: "blue.600" }}>
          About
        </Link>
        <Link as={RouterLink} to="/test" color="blue.500" fontWeight="medium" _hover={{ color: "blue.600" }}>
          Test
        </Link>
      </Flex>
    </Box>
  );
};

export default Navigation;
