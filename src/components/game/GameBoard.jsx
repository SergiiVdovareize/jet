import React from 'react';
import { Box } from '@chakra-ui/react';
import Shape from './Shape';
import { config } from '../../utils/shapeUtils';

const GameBoard = ({ shapes, targetShape, onShapeClick }) => {
  return (
    <Box 
      p={0} 
      width="100%" 
      height="100%" 
      minHeight="400px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${config.boardWidth} ${config.boardHeight}`}
        style={{ 
          border: '2px solid #ccc', 
          borderRadius: '8px',
          maxWidth: '100%',
          maxHeight: '100%'
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        {shapes.map((shape) => (
          <Shape
            key={shape.id}
            shape={shape}
            onClick={onShapeClick}
            isTarget={shape.type === targetShape.type && shape.color === targetShape.color}
          />
        ))}
      </svg>
    </Box>
  );
};

export default GameBoard;
