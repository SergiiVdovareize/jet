import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Test from './pages/Test';
import './App.css';

function App() {
  return (
    <Router>
      <Box bg="gray.50">
        <Box maxW="1200px" mx="auto" p={4} h="100vh" flex="1" display="flex" flexDirection="column">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App
