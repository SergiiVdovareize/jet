import React from 'react';
import { Box } from '@chakra-ui/react';
import Shape from './Shape';

const GameBoard = ({ shapes, targetShape, onShapeClick }) => {
  return (
    <Box>
      <svg width="600" height="400" style={{ border: '2px solid #ccc', borderRadius: '8px' }}>
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
